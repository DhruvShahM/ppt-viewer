const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');
const config = require('../config/archive-config');

/**
 * Backup Management Utilities
 * Handles creating, encrypting, and managing deck backups
 */

class BackupManager {
    constructor() {
        this.backupDir = config.backupDir;
        this.encryptionEnabled = config.enableEncryption;
        this.encryptionKey = config.encryptionKey;

        // Ensure backup directory exists
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    /**
     * Create a ZIP backup of a deck
     * @param {string} deckId - Deck ID to backup
     * @param {Object} paths - Paths to backup {deck: string, slides: string}
     * @returns {Promise<string>} Path to created backup file
     */
    async createBackup(deckId, paths) {
        return new Promise((resolve, reject) => {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFileName = `${timestamp}-${deckId}.zip`;
            const backupPath = path.join(this.backupDir, backupFileName);

            const output = fs.createWriteStream(backupPath);
            const archive = archiver('zip', {
                zlib: { level: 9 } // Maximum compression
            });

            output.on('close', () => {
                console.log(`Backup created: ${backupPath} (${archive.pointer()} bytes)`);
                resolve(backupPath);
            });

            archive.on('error', (err) => {
                reject(new Error(`Backup failed: ${err.message}`));
            });

            archive.pipe(output);

            // Add deck directory
            if (fs.existsSync(paths.deck)) {
                archive.directory(paths.deck, `decks/${deckId}`);
            }

            // Add slides directory if exists
            if (paths.slides && fs.existsSync(paths.slides)) {
                archive.directory(paths.slides, `slides/${deckId}`);
            }

            archive.finalize();
        });
    }

    /**
     * Encrypt a backup file using AES-256
     * @param {string} backupPath - Path to backup file
     * @returns {Promise<string>} Path to encrypted file
     */
    async encryptBackup(backupPath) {
        if (!this.encryptionEnabled) {
            return backupPath;
        }

        return new Promise((resolve, reject) => {
            try {
                const encryptedPath = `${backupPath}.enc`;

                // Generate IV
                const iv = crypto.randomBytes(16);

                // Create cipher
                const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
                const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

                // Create streams
                const input = fs.createReadStream(backupPath);
                const output = fs.createWriteStream(encryptedPath);

                // Write IV first
                output.write(iv);

                // Pipe through cipher
                input.pipe(cipher).pipe(output);

                output.on('finish', () => {
                    // Remove unencrypted file
                    fs.unlinkSync(backupPath);
                    console.log(`Backup encrypted: ${encryptedPath}`);
                    resolve(encryptedPath);
                });

                output.on('error', reject);
            } catch (error) {
                reject(new Error(`Encryption failed: ${error.message}`));
            }
        });
    }

    /**
     * Create and optionally encrypt a backup
     * @param {string} deckId - Deck ID
     * @param {Object} paths - Paths to backup
     * @returns {Promise<string>} Path to final backup file
     */
    async createAndEncryptBackup(deckId, paths) {
        const backupPath = await this.createBackup(deckId, paths);

        if (this.encryptionEnabled) {
            return await this.encryptBackup(backupPath);
        }

        return backupPath;
    }

    /**
     * Clean up old backups based on retention policy
     * @param {number} maxAgeDays - Maximum age in days (default from config)
     */
    cleanupOldBackups(maxAgeDays = config.backupRetentionDays) {
        if (!fs.existsSync(this.backupDir)) {
            return;
        }

        const now = Date.now();
        const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;

        const files = fs.readdirSync(this.backupDir);
        let deletedCount = 0;

        files.forEach(file => {
            const filePath = path.join(this.backupDir, file);
            const stats = fs.statSync(filePath);
            const age = now - stats.mtimeMs;

            if (age > maxAgeMs) {
                fs.unlinkSync(filePath);
                deletedCount++;
                console.log(`Deleted old backup: ${file}`);
            }
        });

        if (deletedCount > 0) {
            console.log(`Cleaned up ${deletedCount} old backup(s)`);
        }
    }

    /**
     * Decrypt a backup file
     * @param {string} encryptedPath - Path to encrypted backup
     * @param {string} outputPath - Path for decrypted output
     * @returns {Promise<string>} Path to decrypted file
     */
    async decryptBackup(encryptedPath, outputPath) {
        return new Promise((resolve, reject) => {
            try {
                const input = fs.createReadStream(encryptedPath);
                const output = fs.createWriteStream(outputPath);

                // Read IV from beginning of file
                const iv = Buffer.alloc(16);
                let ivRead = false;

                input.on('readable', () => {
                    if (!ivRead) {
                        const chunk = input.read(16);
                        if (chunk) {
                            chunk.copy(iv);
                            ivRead = true;

                            // Create decipher
                            const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
                            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

                            // Pipe remaining data through decipher
                            input.pipe(decipher).pipe(output);
                        }
                    }
                });

                output.on('finish', () => {
                    console.log(`Backup decrypted: ${outputPath}`);
                    resolve(outputPath);
                });

                output.on('error', reject);
            } catch (error) {
                reject(new Error(`Decryption failed: ${error.message}`));
            }
        });
    }

    /**
     * List all backups for a specific deck
     * @param {string} deckId - Deck ID
     * @returns {Array} Array of backup file info
     */
    listBackups(deckId) {
        if (!fs.existsSync(this.backupDir)) {
            return [];
        }

        const files = fs.readdirSync(this.backupDir);
        const deckBackups = files
            .filter(file => file.includes(deckId))
            .map(file => {
                const filePath = path.join(this.backupDir, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    path: filePath,
                    size: stats.size,
                    created: stats.mtime,
                    encrypted: file.endsWith('.enc'),
                };
            })
            .sort((a, b) => b.created - a.created); // Newest first

        return deckBackups;
    }
}

module.exports = new BackupManager();
