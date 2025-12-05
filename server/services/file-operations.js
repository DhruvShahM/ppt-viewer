const fs = require('fs');
const path = require('path');
const util = require('util');

/**
 * File Operations Service
 * Handles file system operations for archive and restore workflows
 * Replaces GitOperations for non-git based archiving
 */

class FileOperations {
    /**
     * Move a directory from source to destination
     * @param {string} src - Source path
     * @param {string} dest - Destination path
     */
    async moveDirectory(src, dest) {
        try {
            console.log(`[FileOperations] Moving ${src} to ${dest}`);
            if (!fs.existsSync(src)) {
                throw new Error(`Source directory does not exist: ${src}`);
            }

            // Ensure parent directory of destination exists
            const destParent = path.dirname(dest);
            if (!fs.existsSync(destParent)) {
                fs.mkdirSync(destParent, { recursive: true });
            }

            // If destination exists, we might need to merge or overwrite
            // For simplicity in archive/restore, we usually expect clean moves
            // But let's handle the case where we might need to move content

            // Using fs.renameSync for atomic move on same filesystem
            // Note: This fails if crossing partitions/drives, but for this app it's likely same drive
            try {
                fs.renameSync(src, dest);
                console.log(`[FileOperations] Rename successful`);
            } catch (err) {
                console.log(`[FileOperations] Rename failed: ${err.code}. Trying copy/delete...`);
                // Fallback to copy and delete if rename fails (e.g. cross-device or EPERM on Windows)
                if (err.code === 'EXDEV' || err.code === 'EPERM') {
                    await this.copyDirectory(src, dest);
                    // Add a small delay before delete to allow handles to close
                    await new Promise(resolve => setTimeout(resolve, 100));
                    try {
                        fs.rmSync(src, { recursive: true, force: true });
                    } catch (rmErr) {
                        // If delete fails, we might have a problem, but at least we copied.
                        // But for archive, we really want it gone from source.
                        // Let's try one more time with a longer delay
                        console.warn(`[FileOperations] Delete failed: ${rmErr.code}. Retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        fs.rmSync(src, { recursive: true, force: true });
                    }
                    console.log(`[FileOperations] Copy/Delete successful`);
                } else {
                    throw err;
                }
            }

            console.log(`Moved directory: ${src} -> ${dest}`);
            return true;
        } catch (error) {
            console.error(`[FileOperations] Move failed: ${error.message}`);
            throw new Error(`Failed to move directory: ${error.message}`);
        }
    }

    /**
     * Copy a directory recursively
     * @param {string} src - Source path
     * @param {string} dest - Destination path
     */
    async copyDirectory(src, dest) {
        try {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true });
            }

            const entries = fs.readdirSync(src, { withFileTypes: true });

            for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);

                if (entry.isDirectory()) {
                    await this.copyDirectory(srcPath, destPath);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
            }
        } catch (error) {
            throw new Error(`Failed to copy directory: ${error.message}`);
        }
    }

    /**
     * Remove a directory
     * @param {string} dirPath - Path to remove
     */
    async removeDirectory(dirPath) {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`Removed directory: ${dirPath}`);
        }
    }

    /**
     * Ensure a directory exists
     * @param {string} dirPath - Path to ensure
     */
    ensureDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
}

module.exports = new FileOperations();
