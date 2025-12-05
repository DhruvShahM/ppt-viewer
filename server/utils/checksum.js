const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * Checksum Utilities
 * SHA256 checksum generation and validation for integrity checks
 */

class ChecksumUtil {
    /**
     * Calculate SHA256 checksum for a file
     * @param {string} filePath - Path to file
     * @returns {Promise<string>} Checksum hash
     */
    async calculateFileChecksum(filePath) {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(filePath);

            stream.on('data', (data) => hash.update(data));
            stream.on('end', () => resolve(hash.digest('hex')));
            stream.on('error', reject);
        });
    }

    /**
     * Calculate checksum for a directory (recursive)
     * @param {string} dirPath - Path to directory
     * @returns {Promise<string>} Checksum hash for entire directory
     */
    async calculateDirectoryChecksum(dirPath) {
        const files = this.getAllFilesRecursive(dirPath);
        const hash = crypto.createHash('sha256');

        // Sort files for consistent ordering
        files.sort();

        for (const file of files) {
            const relativePath = path.relative(dirPath, file);
            const fileHash = await this.calculateFileChecksum(file);

            // Include both path and content hash for complete integrity
            hash.update(relativePath);
            hash.update(fileHash);
        }

        return hash.digest('hex');
    }

    /**
     * Get all files in directory recursively
     * @param {string} dirPath - Directory path
     * @returns {Array<string>} Array of file paths
     */
    getAllFilesRecursive(dirPath) {
        const files = [];

        const traverse = (currentPath) => {
            if (!fs.existsSync(currentPath)) {
                return;
            }

            const stat = fs.statSync(currentPath);

            if (stat.isDirectory()) {
                const entries = fs.readdirSync(currentPath);
                entries.forEach(entry => {
                    traverse(path.join(currentPath, entry));
                });
            } else {
                files.push(currentPath);
            }
        };

        traverse(dirPath);
        return files;
    }

    /**
     * Verify checksum matches expected value
     * @param {string} itemPath - File or directory path
     * @param {string} expectedChecksum - Expected checksum hash
     * @returns {Promise<boolean>} True if checksum matches
     */
    async verifyChecksum(itemPath, expectedChecksum) {
        const stat = fs.statSync(itemPath);
        let actualChecksum;

        if (stat.isDirectory()) {
            actualChecksum = await this.calculateDirectoryChecksum(itemPath);
        } else {
            actualChecksum = await this.calculateFileChecksum(itemPath);
        }

        return actualChecksum === expectedChecksum;
    }

    /**
     * Calculate checksum for deck
     * @param {string} deckId - Deck ID
     * @param {string} baseDir - Base directory (decks or slides)
     * @returns {Promise<string>} Checksum hash
     */
    async calculateDeckChecksum(deckId, baseDir) {
        const deckPath = path.join(baseDir, deckId);

        if (!fs.existsSync(deckPath)) {
            throw new Error(`Deck path not found: ${deckPath}`);
        }

        return this.calculateDirectoryChecksum(deckPath);
    }

    /**
     * Calculate combined checksum for deck and slides
     * @param {string} deckId - Deck ID
     * @param {string} decksBaseDir - Base directory for decks
     * @param {string} slidesBaseDir - Base directory for slides
     * @returns {Promise<Object>} Object with deck, slides, and combined checksums
     */
    async calculateFullDeckChecksum(deckId, decksBaseDir, slidesBaseDir) {
        const deckChecksum = await this.calculateDeckChecksum(deckId, decksBaseDir);

        // Slides may not exist for all decks
        let slidesChecksum = null;
        const slidesPath = path.join(slidesBaseDir, deckId);
        if (fs.existsSync(slidesPath)) {
            slidesChecksum = await this.calculateDeckChecksum(deckId, slidesBaseDir);
        }

        // Combine checksums
        const hash = crypto.createHash('sha256');
        hash.update(deckChecksum);
        if (slidesChecksum) {
            hash.update(slidesChecksum);
        }
        const combinedChecksum = hash.digest('hex');

        return {
            deck: deckChecksum,
            slides: slidesChecksum,
            combined: combinedChecksum,
        };
    }
}

module.exports = new ChecksumUtil();
