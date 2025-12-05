const path = require('path');
const config = require('../config/archive-config');
const validationService = require('./validation-service');
const gitOperations = require('./git-operations');
const metadataManager = require('../utils/metadata');
const auditLogger = require('./audit-logger');
const checksumUtil = require('../utils/checksum');

/**
 * Restore Service
 * Main orchestration for restoring archived decks
 */

class RestoreService {
    /**
     * Restore a deck from archive
     * @param {string} deckId - Deck ID to restore
     * @returns {Promise<Object>} Result object
     */
    async restore(deckId) {
        const startTime = Date.now();
        let preRestoreCommit = null;

        try {
            console.log(`\n=== Starting restore process for deck: ${deckId} ===\n`);

            // Step 1: Validation
            console.log('Step 1: Validating restore conditions...');
            const validation = await validationService.validateRestore(deckId);

            if (!validation.valid) {
                const errorMsg = `Validation failed:\n${validation.errors.join('\n')}`;
                auditLogger.logFailure('restore', deckId, errorMsg);
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

            const { deck } = validation.info;

            // Step 2: Save current state for rollback
            console.log('\nStep 2: Saving current state for rollback...');
            preRestoreCommit = gitOperations.getCurrentCommit();
            console.log(`Current commit: ${preRestoreCommit}`);

            // Step 3: Determine target paths
            console.log('\nStep 3: Determining target paths...');
            const targetDeckPath = path.join(config.mainRepo, config.archiveFolders.decks, deckId);
            const targetSlidesPath = path.join(config.mainRepo, config.archiveFolders.slides, deckId);

            // Step 4: Execute Git restore operations
            console.log('\nStep 4: Executing Git restore operations...');
            const gitResult = gitOperations.restoreDeck(deckId, targetDeckPath, targetSlidesPath);
            console.log(`Main repo commit: ${gitResult.mainCommit}`);

            // Step 5: Verify checksum
            console.log('\nStep 5: Verifying checksum...');
            if (deck.checksum) {
                const decksBase = path.join(config.mainRepo, config.archiveFolders.decks);
                const slidesBase = path.join(config.mainRepo, config.archiveFolders.slides);

                const checksums = await checksumUtil.calculateFullDeckChecksum(
                    deckId,
                    decksBase,
                    slidesBase
                );

                if (checksums.combined !== deck.checksum) {
                    console.warn('WARNING: Checksum mismatch detected!');
                    console.warn(`Expected: ${deck.checksum}`);
                    console.warn(`Actual: ${checksums.combined}`);
                } else {
                    console.log('Checksum verified successfully');
                }
            }

            // Step 6: Update metadata
            console.log('\nStep 6: Updating metadata...');
            const updatedDeck = metadataManager.updateDeckStatus(deckId, 'active', {
                restoredAt: new Date().toISOString(),
                path: `${config.archiveFolders.decks}/${deckId}`,
                version: (deck.version || 0) + 1,
            });

            // Remove archive-specific fields
            delete updatedDeck.backupPath;
            metadataManager.writeMetadata(
                metadataManager.readMetadata().map(d =>
                    d.id === deckId ? updatedDeck : d
                )
            );

            console.log('Metadata updated successfully');

            // Step 7: Audit logging
            console.log('\nStep 7: Recording audit log...');
            auditLogger.logRestore(deckId, {
                mainCommit: gitResult.mainCommit,
                targetPath: targetDeckPath,
                duration: Date.now() - startTime,
            });

            console.log(`\n=== Restore completed successfully in ${Date.now() - startTime}ms ===\n`);

            return {
                success: true,
                deckId,
                commit: gitResult.mainCommit,
                metadata: updatedDeck,
                duration: Date.now() - startTime,
            };

        } catch (error) {
            console.error(`\n=== Restore failed: ${error.message} ===\n`);

            // Attempt rollback
            if (preRestoreCommit) {
                console.log('Attempting rollback...');
                try {
                    gitOperations.rollback(preRestoreCommit);
                    console.log('Rollback successful');
                } catch (rollbackError) {
                    console.error('Rollback failed:', rollbackError.message);
                }
            }

            // Log failure
            auditLogger.logFailure('restore', deckId, error.message);

            return {
                success: false,
                error: error.message,
                duration: Date.now() - startTime,
            };
        }
    }

    /**
     * Restore multiple decks
     * @param {Array<string>} deckIds - Array of deck IDs
     * @returns {Promise<Object>} Results object
     */
    async restoreMultiple(deckIds) {
        const results = {
            success: [],
            failed: [],
        };

        for (const deckId of deckIds) {
            const result = await this.restore(deckId);

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

module.exports = new RestoreService();
