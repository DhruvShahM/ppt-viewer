const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const metadataManager = require('../utils/metadata');
const checksumUtil = require('../utils/checksum');
const config = require('../config/archive-config');

/**
 * Validation Service
 * Pre-operation validation for archive and restore operations
 */

class ValidationService {
    /**
     * Validate conditions for archiving a deck
     * @param {string} deckId - Deck ID to validate
     * @returns {Promise<Object>} Validation result with details
     */
    async validateArchive(deckId) {
        const errors = [];
        const warnings = [];
        const info = {};

        try {
            // 1. Check deck exists in metadata
            const deck = metadataManager.getDeckById(deckId);
            if (!deck) {
                errors.push(`Deck ${deckId} not found in metadata`);
                return { valid: false, errors, warnings, info };
            }

            info.deck = deck;

            // 2. Check deck is active
            if (deck.status !== 'active') {
                errors.push(`Deck ${deckId} is already ${deck.status}`);
            }

            // 3. Check deck path exists
            if (!deck.path) {
                errors.push(`Deck ${deckId} has no path defined`);
            } else {
                const deckPath = path.join(config.mainRepo, deck.path);
                if (!fs.existsSync(deckPath)) {
                    errors.push(`Deck path not found: ${deckPath}`);
                } else {
                    info.deckPath = deckPath;
                }
            }

            // 4. Check if deck files exist
            if (info.deckPath) {
                const deckFiles = fs.readdirSync(info.deckPath);
                if (deckFiles.length === 0) {
                    warnings.push('Deck directory is empty');
                }
                info.fileCount = deckFiles.length;
            }

            // 6. Check if slides exist
            const slidesPath = path.join(config.mainRepo, config.archiveFolders.slides, deckId);
            if (fs.existsSync(slidesPath)) {
                const slideFiles = fs.readdirSync(slidesPath);
                info.slidesPath = slidesPath;
                info.slideCount = slideFiles.length;
            } else {
                warnings.push('No slides directory found for this deck');
            }

            // 7. Calculate checksum for integrity verification
            try {
                if (info.deckPath) {
                    const decksBase = path.join(config.mainRepo, config.archiveFolders.decks);
                    const slidesBase = path.join(config.mainRepo, config.archiveFolders.slides);

                    const checksums = await checksumUtil.calculateFullDeckChecksum(
                        deckId,
                        decksBase,
                        slidesBase
                    );
                    info.checksums = checksums;
                }
            } catch (error) {
                warnings.push(`Could not calculate checksum: ${error.message}`);
            }

            // 8. Check for large assets
            if (info.deckPath) {
                const hasLargeAssets = this.checkForLargeAssets(info.deckPath);
                info.hasLargeAssets = hasLargeAssets;

                if (hasLargeAssets) {
                    warnings.push('Deck contains large assets. Ensure Git LFS is properly configured.');
                }
            }

            return {
                valid: errors.length === 0,
                errors,
                warnings,
                info,
            };
        } catch (error) {
            errors.push(`Validation error: ${error.message}`);
            return {
                valid: false,
                errors,
                warnings,
                info,
            };
        }
    }

    /**
     * Validate conditions for restoring a deck
     * @param {string} deckId - Deck ID to validate
     * @returns {Promise<Object>} Validation result with details
     */
    async validateRestore(deckId) {
        const errors = [];
        const warnings = [];
        const info = {};

        try {
            // 1. Check deck exists in metadata
            const deck = metadataManager.getDeckById(deckId);
            if (!deck) {
                errors.push(`Deck ${deckId} not found in metadata`);
                return { valid: false, errors, warnings, info };
            }

            info.deck = deck;

            // 2. Check deck is archived
            if (deck.status !== 'archived') {
                errors.push(`Deck ${deckId} is not archived (status: ${deck.status})`);
            }

            // 3. Check archive repository exists
            if (!fs.existsSync(config.archiveRepo)) {
                errors.push(`Archive repository not found: ${config.archiveRepo}`);
            } else {
                // Check if deck exists in archive repo
                const archiveDeckPath = path.join(config.archiveRepo, 'decks', deckId);
                if (!fs.existsSync(archiveDeckPath)) {
                    errors.push(`Deck not found in archive repository: ${archiveDeckPath}`);
                } else {
                    info.archiveDeckPath = archiveDeckPath;
                }
            }

            // 4. Check for conflicting folders in main repo
            const mainDeckPath = path.join(config.mainRepo, config.archiveFolders.decks, deckId);
            if (fs.existsSync(mainDeckPath)) {
                errors.push(`Conflicting deck folder already exists in main repo: ${mainDeckPath}`);
            }

            const mainSlidesPath = path.join(config.mainRepo, config.archiveFolders.slides, deckId);
            if (fs.existsSync(mainSlidesPath)) {
                errors.push(`Conflicting slides folder already exists in main repo: ${mainSlidesPath}`);
            }


            // 5. Check for uncommitted changes (converted to warning since we now stash)
            try {
                const status = execSync('git status --porcelain', {
                    cwd: config.mainRepo,
                    encoding: 'utf8',
                }).trim();

                if (status) {
                    warnings.push('Working directory has uncommitted changes. They will be automatically stashed during restore.');
                }
            } catch (error) {
                warnings.push(`Could not check git status: ${error.message}`);
            }


            // 6. Verify checksum if available
            if (deck.checksum && info.archiveDeckPath) {
                try {
                    const archiveDecksBase = path.join(config.archiveRepo, 'decks');
                    const archiveSlidesBase = path.join(config.archiveRepo, 'slides');

                    const checksums = await checksumUtil.calculateFullDeckChecksum(
                        deckId,
                        archiveDecksBase,
                        archiveSlidesBase
                    );

                    if (checksums.combined !== deck.checksum) {
                        warnings.push('Checksum mismatch. Archive may have been modified.');
                    }

                    info.checksums = checksums;
                } catch (error) {
                    warnings.push(`Could not verify checksum: ${error.message}`);
                }
            }

            return {
                valid: errors.length === 0,
                errors,
                warnings,
                info,
            };
        } catch (error) {
            errors.push(`Validation error: ${error.message}`);
            return {
                valid: false,
                errors,
                warnings,
                info,
            };
        }
    }

    /**
     * Check if directory contains large assets
     * @param {string} dirPath - Directory to check
     * @returns {boolean} True if large assets found
     */
    checkForLargeAssets(dirPath) {
        const largeExtensions = ['.mp4', '.webm', '.avi', '.mov', '.pdf', '.zip'];
        const sizeLimitMB = 1; // Consider files > 1MB as "large"

        const checkDirectory = (dir) => {
            const entries = fs.readdirSync(dir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    if (checkDirectory(fullPath)) {
                        return true;
                    }
                } else {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (largeExtensions.includes(ext)) {
                        return true;
                    }

                    const stats = fs.statSync(fullPath);
                    if (stats.size > sizeLimitMB * 1024 * 1024) {
                        return true;
                    }
                }
            }

            return false;
        };

        return checkDirectory(dirPath);
    }
}

module.exports = new ValidationService();
