const path = require('path');
const config = require('../config/archive-config');
const validationService = require('./validation-service');
const gitOperations = require('./git-operations');
const metadataManager = require('../utils/metadata');
const backupManager = require('../utils/backup');
const auditLogger = require('./audit-logger');

/**
 * Archive Service
 * Main orchestration for archiving decks
 */

class ArchiveService {
    /**
     * Archive a deck
     * @param {string} deckId - Deck ID to archive
     * @returns {Promise<Object>} Result object
     */
    async archive(deckId) {
        const startTime = Date.now();
        let backupPath = null;
        let preArchiveCommit = null;
        let hasStashedChanges = false;

        try {
            console.log(`\n=== Starting archive process for deck: ${deckId} ===\n`);

            // Step 0: Stash uncommitted changes if any
            console.log('Step 0: Checking for uncommitted changes...');
            if (gitOperations.hasUncommittedChanges()) {
                console.log('Uncommitted changes detected. Stashing...');
                hasStashedChanges = gitOperations.stashChanges(`Archive ${deckId} - auto-stash`);
                console.log('Changes stashed successfully');
            } else {
                console.log('No uncommitted changes to stash');
            }

            // Step 1: Validation
            console.log('\nStep 1: Validating archive conditions...');
            const validation = await validationService.validateArchive(deckId);

            if (!validation.valid) {
                const errorMsg = `Validation failed:\n${validation.errors.join('\n')}`;
                auditLogger.logFailure('archive', deckId, errorMsg);

                // Restore stashed changes before returning
                if (hasStashedChanges) {
                    console.log('Restoring stashed changes due to validation failure...');
                    gitOperations.popStash();
                }

                return {
                    success: false,
                    error: errorMsg,
                    errors: validation.errors,
                    warnings: validation.warnings,
                };
            }

            if (validation.warnings.length > 0) {
                console.log('Warnings:', validation.warnings.join('\n'));
            }

            const { deck, deckPath, slidesPath, checksums } = validation.info;

            // Step 2: Save current state for rollback
            console.log('\nStep 2: Saving current state for rollback...');
            preArchiveCommit = gitOperations.getCurrentCommit();
            console.log(`Current commit: ${preArchiveCommit}`);

            // Step 3: Create backup
            console.log('\nStep 3: Creating backup...');
            backupPath = await backupManager.createAndEncryptBackup(deckId, {
                deck: deckPath,
                slides: slidesPath,
            });
            console.log(`Backup created: ${backupPath}`);

            // Step 4: Execute Git operations
            console.log('\nStep 4: Executing Git archive operations...');
            const gitResult = gitOperations.archiveDeck(deckId, deckPath, slidesPath);
            console.log(`Archive commit: ${gitResult.archiveCommit}`);
            console.log(`Main repo commit: ${gitResult.mainCommit}`);

            // Step 5: Update metadata
            console.log('\nStep 5: Updating metadata...');
            const updatedDeck = metadataManager.updateDeckStatus(deckId, 'archived', {
                archivedAt: new Date().toISOString(),
                checksum: checksums?.combined,
                hasLargeAssets: validation.info.hasLargeAssets,
                version: (deck.version || 0) + 1,
                backupPath: path.relative(config.mainRepo, backupPath),
            });
            console.log('Metadata updated successfully');

            // Step 6: Audit logging
            console.log('\nStep 6: Recording audit log...');
            auditLogger.logArchive(deckId, {
                backupPath,
                archiveCommit: gitResult.archiveCommit,
                mainCommit: gitResult.mainCommit,
                checksum: checksums?.combined,
                fileCount: validation.info.fileCount,
                slideCount: validation.info.slideCount,
                duration: Date.now() - startTime,
            });

            // Step 7: Restore stashed changes
            if (hasStashedChanges) {
                console.log('\nStep 7: Restoring stashed changes...');
                gitOperations.popStash();
                console.log('Stashed changes restored successfully');
            }

            console.log(`\n=== Archive completed successfully in ${Date.now() - startTime}ms ===\n`);

            return {
                success: true,
                deckId,
                backupPath,
                commits: {
                    archive: gitResult.archiveCommit,
                    main: gitResult.mainCommit,
                },
                metadata: updatedDeck,
                duration: Date.now() - startTime,
            };

        } catch (error) {
            console.error(`\n=== Archive failed: ${error.message} ===\n`);

            // Restore stashed changes before rollback
            if (hasStashedChanges) {
                console.log('Restoring stashed changes due to error...');
                try {
                    gitOperations.popStash();
                    console.log('Stashed changes restored');
                } catch (popError) {
                    console.error('Failed to restore stashed changes:', popError.message);
                }
            }

            // Attempt rollback
            if (preArchiveCommit) {
                console.log('Attempting rollback...');
                try {
                    gitOperations.rollback(preArchiveCommit);
                    console.log('Rollback successful');
                } catch (rollbackError) {
                    console.error('Rollback failed:', rollbackError.message);
                }
            }

            // Log failure
            auditLogger.logFailure('archive', deckId, error.message);

            return {
                success: false,
                error: error.message,
                backupPath: backupPath || null,
                duration: Date.now() - startTime,
            };
        }
    }

    /**
     * Archive multiple decks
     * @param {Array<string>} deckIds - Array of deck IDs
     * @returns {Promise<Object>} Results object
     */
    async archiveMultiple(deckIds) {
        const results = {
            success: [],
            failed: [],
        };

        for (const deckId of deckIds) {
            const result = await this.archive(deckId);

            if (result.success) {
                results.success.push(deckId);
            } else {
                results.failed.push({
                    deckId,
                    error: result.error,
                });
            }
        }

        return {
            total: deckIds.length,
            succeeded: results.success.length,
            failed: results.failed.length,
            results,
        };
    }
}

module.exports = new ArchiveService();
