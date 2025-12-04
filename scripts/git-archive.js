import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const deckId = process.argv[2];
const sourcePath = process.argv[3];

if (!deckId || !sourcePath) {
    console.error("Usage: node scripts/git-archive.js <deckId> <sourcePath>");
    process.exit(1);
}

const runGit = (command) => {
    try {
        return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
    } catch (error) {
        console.error(`Git command failed: ${command}`);
        console.error(error.stderr || error.message);
        throw error;
    }
};

const main = () => {
    console.log(`[Git Archive] Processing ${deckId}...`);

    // 1. Check for uncommitted changes
    const status = runGit('git status --porcelain');
    if (status) {
        console.error("Error: Working directory is not clean. Please commit or stash changes before archiving.");
        process.exit(1);
    }

    const currentBranch = runGit('git branch --show-current');
    const archiveBranch = 'archive';

    try {
        // 2. Ensure archive branch exists and is up to date
        const branches = runGit('git branch --list');
        if (!branches.includes(archiveBranch)) {
            console.log(`Creating branch '${archiveBranch}'...`);
            runGit(`git branch ${archiveBranch}`);
        }

        // 3. Merge current changes into archive branch to save the source
        console.log(`Syncing '${archiveBranch}' with '${currentBranch}'...`);
        runGit(`git checkout ${archiveBranch}`);
        runGit(`git merge ${currentBranch}`);

        // 4. Switch back to main
        runGit(`git checkout ${currentBranch}`);

        // 5. Remove source files from main
        console.log(`Removing source files from '${currentBranch}'...`);
        if (fs.existsSync(sourcePath)) {
            runGit(`git rm -r "${sourcePath}"`);
            runGit(`git commit -m "Archive deck: ${deckId}"`);
            console.log(`[Git Archive] Successfully archived ${deckId} to '${archiveBranch}' branch.`);
        } else {
            console.warn(`Source path ${sourcePath} does not exist, skipping deletion.`);
        }

    } catch (error) {
        console.error("[Git Archive] Failed:", error.message);
        // Attempt to restore state
        try {
            const branch = runGit('git branch --show-current');
            if (branch !== currentBranch) {
                console.log(`Restoring branch to ${currentBranch}...`);
                runGit(`git checkout ${currentBranch}`);
            }
        } catch (e) {
            console.error("Failed to restore branch state.");
        }
        process.exit(1);
    }
};

main();
