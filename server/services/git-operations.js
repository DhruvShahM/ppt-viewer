const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const config = require('../config/archive-config');

/**
 * Git Operations Service
 * Handles all Git operations for archive and restore workflows
 */

class GitOperations {
    constructor() {
        this.mainRepo = config.mainRepo;
        this.archiveRepo = config.archiveRepo;
    }

    /**
     * Execute a git command safely
     * @param {string} command - Git command to execute
     * @param {string} cwd - Working directory
     * @returns {string} Command output
     */
    execGit(command, cwd = this.mainRepo) {
        try {
            const startTime = Date.now();

            const result = execSync(command, {
                cwd,
                encoding: 'utf8',
                stdio: 'pipe',
            }).trim();

            const duration = Date.now() - startTime;
            if (duration > config.performanceThresholds.gitOperationMs) {
                console.warn(`Git operation took ${duration}ms (threshold: ${config.performanceThresholds.gitOperationMs}ms): ${command}`);
            }

            return result;
        } catch (error) {
            throw new Error(`Git command failed: ${command}\n${error.stderr || error.message}`);
        }
    }

    /**
     * Check if git working directory is clean
     * @param {string} cwd - Working directory
     * @returns {boolean} True if clean
     */
    isWorkingDirectoryClean(cwd = this.mainRepo) {
        const status = this.execGit('git status --porcelain', cwd);
        return status === '';
    }

    /**
     * Initialize archive repository if it doesn't exist
     */
    initializeArchiveRepo() {
        if (!fs.existsSync(this.archiveRepo)) {
            console.log(`Creating archive repository at: ${this.archiveRepo}`);
            fs.mkdirSync(this.archiveRepo, { recursive: true });

            // Initialize git
            this.execGit('git init', this.archiveRepo);

            // Configure user
            this.execGit(`git config user.name "${config.gitConfig.userName}"`, this.archiveRepo);
            this.execGit(`git config user.email "${config.gitConfig.userEmail}"`, this.archiveRepo);

            // Create directory structure
            fs.mkdirSync(path.join(this.archiveRepo, 'decks'), { recursive: true });
            fs.mkdirSync(path.join(this.archiveRepo, 'slides'), { recursive: true });

            // Create .gitattributes for LFS
            this.setupGitLFS(this.archiveRepo);

            // Initial commit
            this.execGit('git add .', this.archiveRepo);
            this.execGit('git commit -m "Initialize archive repository"', this.archiveRepo);

            console.log('Archive repository initialized successfully');
        }
    }

    /**
     * Setup Git LFS configuration
     * @param {string} repoPath - Repository path
     */
    setupGitLFS(repoPath) {
        const gitattributes = path.join(repoPath, '.gitattributes');
        const patterns = config.lfsPatterns.map(pattern =>
            `${pattern} filter=lfs diff=lfs merge=lfs -text`
        ).join('\n');

        fs.writeFileSync(gitattributes, patterns + '\n');
        console.log(`Created .gitattributes with LFS patterns in ${repoPath}`);
    }

    /**
     * Copy files from main repo to archive repo
     * @param {string} deckId - Deck ID
     * @param {string} sourcePath - Source path in main repo
     * @param {string} destPath - Destination path in archive repo
     */
    copyToArchive(deckId, sourcePath, destPath) {
        if (!fs.existsSync(sourcePath)) {
            throw new Error(`Source path not found: ${sourcePath}`);
        }

        // Ensure destination directory exists
        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        // Copy directory recursively
        this.copyDirectoryRecursive(sourcePath, destPath);
    }

    /**
     * Copy directory recursively
     * @param {string} src - Source directory
     * @param {string} dest - Destination directory
     */
    copyDirectoryRecursive(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                this.copyDirectoryRecursive(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    /**
     * Archive a deck - copy to archive repo and remove from main
     * @param {string} deckId - Deck ID
     * @param {string} deckPath - Deck path in main repo
     * @param {string} slidesPath - Slides path in main repo (optional)
     * @returns {Object} Result with commit IDs
     */
    archiveDeck(deckId, deckPath, slidesPath = null) {
        const result = {
            mainCommit: null,
            archiveCommit: null,
        };

        try {
            // Ensure archive repo exists
            this.initializeArchiveRepo();

            // Copy deck to archive repo
            const archiveDeckPath = path.join(this.archiveRepo, 'decks', deckId);
            this.copyToArchive(deckId, deckPath, archiveDeckPath);

            // Copy slides if exists
            if (slidesPath && fs.existsSync(slidesPath)) {
                const archiveSlidesPath = path.join(this.archiveRepo, 'slides', deckId);
                this.copyToArchive(deckId, slidesPath, archiveSlidesPath);
            }

            // Commit to archive repo
            this.execGit('git add .', this.archiveRepo);
            // Use --allow-empty to permit commits even with no changes
            this.execGit(`git commit --allow-empty -m "Archive deck: ${deckId}"`, this.archiveRepo);
            result.archiveCommit = this.execGit('git rev-parse HEAD', this.archiveRepo);

            console.log(`Deck ${deckId} copied to archive repo (commit: ${result.archiveCommit})`);

            // Remove from main repo
            const relativeDeckPath = path.relative(this.mainRepo, deckPath);
            this.execGit(`git rm -r "${relativeDeckPath}"`, this.mainRepo);

            if (slidesPath && fs.existsSync(slidesPath)) {
                const relativeSlidesPath = path.relative(this.mainRepo, slidesPath);
                this.execGit(`git rm -r "${relativeSlidesPath}"`, this.mainRepo);
            }

            // Use --allow-empty to permit commits even with no changes
            this.execGit(`git commit --allow-empty -m "Archive deck: ${deckId}"`, this.mainRepo);
            result.mainCommit = this.execGit('git rev-parse HEAD', this.mainRepo);

            console.log(`Deck ${deckId} removed from main repo (commit: ${result.mainCommit})`);

            return result;
        } catch (error) {
            throw new Error(`Archive operation failed: ${error.message}`);
        }
    }

    /**
     * Restore a deck - copy from archive repo back to main
     * @param {string} deckId - Deck ID
     * @param {string} targetDeckPath - Target deck path in main repo
     * @param {string} targetSlidesPath - Target slides path in main repo (optional)
     * @returns {Object} Result with commit ID
     */
    restoreDeck(deckId, targetDeckPath, targetSlidesPath = null) {
        const result = {
            mainCommit: null,
        };

        try {
            // Check archive repo exists
            if (!fs.existsSync(this.archiveRepo)) {
                throw new Error('Archive repository not found');
            }

            // Copy deck from archive
            const archiveDeckPath = path.join(this.archiveRepo, 'decks', deckId);
            if (!fs.existsSync(archiveDeckPath)) {
                throw new Error(`Deck not found in archive: ${deckId}`);
            }

            this.copyDirectoryRecursive(archiveDeckPath, targetDeckPath);

            // Copy slides if exists
            const archiveSlidesPath = path.join(this.archiveRepo, 'slides', deckId);
            if (fs.existsSync(archiveSlidesPath) && targetSlidesPath) {
                this.copyDirectoryRecursive(archiveSlidesPath, targetSlidesPath);
            }

            // Commit to main repo
            this.execGit('git add .', this.mainRepo);
            this.execGit(`git commit -m "Restore deck: ${deckId}"`, this.mainRepo);
            result.mainCommit = this.execGit('git rev-parse HEAD', this.mainRepo);

            console.log(`Deck ${deckId} restored to main repo (commit: ${result.mainCommit})`);

            return result;
        } catch (error) {
            throw new Error(`Restore operation failed: ${error.message}`);
        }
    }

    /**
     * Rollback to a specific commit
     * @param {string} commitHash - Commit hash to rollback to
     * @param {string} cwd - Working directory
     */
    rollback(commitHash, cwd = this.mainRepo) {
        try {
            this.execGit(`git reset --hard ${commitHash}`, cwd);
            console.log(`Rolled back to commit: ${commitHash}`);
        } catch (error) {
            throw new Error(`Rollback failed: ${error.message}`);
        }
    }

    /**
     * Get current commit hash
     * @param {string} cwd - Working directory
     * @returns {string} Current commit hash
     */
    getCurrentCommit(cwd = this.mainRepo) {
        return this.execGit('git rev-parse HEAD', cwd);
    }

    /**
     * Create a tag for backup purposes
     * @param {string} tagName - Tag name
     * @param {string} message - Tag message
     * @param {string} cwd - Working directory
     */
    createTag(tagName, message, cwd = this.mainRepo) {
        this.execGit(`git tag -a "${tagName}" -m "${message}"`, cwd);
        console.log(`Created tag: ${tagName}`);
    }
}

module.exports = new GitOperations();
