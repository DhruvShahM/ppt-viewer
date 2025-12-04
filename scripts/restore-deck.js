import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'src/data/deck-index.json');

const deckId = process.argv[2];

if (!deckId) {
    console.error("Usage: node scripts/restore-deck.js <deckId>");
    process.exit(1);
}

const runGit = (command) => {
    try {
        return execSync(command, { encoding: 'utf8', stdio: 'pipe', cwd: ROOT_DIR }).trim();
    } catch (error) {
        console.error(`Git command failed: ${command}`);
        console.error(error.stderr || error.message);
        throw error;
    }
};

const main = () => {
    console.log(`[Restore Deck] Processing ${deckId}...`);

    // 1. Check index
    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    const deckIndex = JSON.parse(indexContent);
    const deck = deckIndex.find(d => d.id === deckId);

    if (!deck) {
        console.error(`Deck ${deckId} not found in index.`);
        process.exit(1);
    }

    if (deck.status !== 'archived') {
        console.log(`Deck ${deckId} is not archived (status: ${deck.status}).`);
        process.exit(0);
    }

    // 2. Determine restore path
    const restorePath = deck.originalPath || `src/decks/${deckId}`;
    console.log(`Restoring to: ${restorePath}`);

    try {
        // 3. Check for uncommitted changes
        const status = runGit('git status --porcelain');
        if (status) {
            console.error("Error: Working directory is not clean. Please commit or stash changes before restoring.");
            process.exit(1);
        }

        // 4. Checkout files from archive branch
        console.log(`Checking out source from 'archive' branch...`);
        runGit(`git checkout archive -- "${restorePath}"`);

        // 5. Update index
        deck.status = 'active';
        deck.path = restorePath;
        delete deck.archivePath;
        // Keep originalPath or delete it? Let's keep it or delete it. 
        // If we delete it, we rely on 'path' next time.
        // delete deck.originalPath; 

        fs.writeFileSync(INDEX_FILE, JSON.stringify(deckIndex, null, 2));
        console.log(`Index updated.`);

        // 6. Commit restoration
        runGit(`git add "${INDEX_FILE}" "${restorePath}"`);
        runGit(`git commit -m "Restore deck: ${deckId}"`);
        console.log(`[Restore Deck] Successfully restored ${deckId}.`);

    } catch (error) {
        console.error("[Restore Deck] Failed:", error.message);
        process.exit(1);
    }
};

main();
