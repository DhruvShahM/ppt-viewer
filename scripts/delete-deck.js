
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'src/data/deck-index.json');

async function deleteDeck(deckId) {
    console.log(`[Delete Deck] Processing ${deckId}...`);

    // 1. Check for clean working directory (optional but good practice, though we might want to allow force delete)
    // For now, we'll skip strict clean check to allow easier usage, but we will commit changes.

    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    let deckIndex = JSON.parse(indexContent);
    const deck = deckIndex.find(d => d.id === deckId);

    if (!deck) {
        console.error(`[Delete Deck] Deck ${deckId} not found in index.`);
        return;
    }

    const isArchived = deck.status === 'archived';
    const itemsToDelete = [];

    // 2. Determine what to delete
    if (isArchived) {
        // Delete archive artifacts
        const archivePath = path.join(ROOT_DIR, 'archives', deckId);
        if (fs.existsSync(archivePath)) {
            console.log(`[Delete Deck] Deleting archive artifacts at ${archivePath}`);
            fs.rmSync(archivePath, { recursive: true, force: true });
            itemsToDelete.push(`archives/${deckId}`);
        }
    } else {
        // Delete source code
        const sourcePath = deck.path ? path.join(ROOT_DIR, deck.path) : path.join(ROOT_DIR, 'src/decks', deckId);
        console.log(`[Delete Deck] Resolved source path: "${sourcePath}"`);
        console.log(`[Delete Deck] Exists? ${fs.existsSync(sourcePath)}`);

        if (fs.existsSync(sourcePath)) {
            console.log(`[Delete Deck] Deleting source code at ${sourcePath}`);
            const deleteWithRetry = async (retries = 3) => {
                for (let i = 0; i < retries; i++) {
                    try {
                        fs.rmSync(sourcePath, { recursive: true, force: true });

                        // Verification
                        if (!fs.existsSync(sourcePath)) return;

                        // If still exists, wait and retry
                        console.log(`[Delete Deck] Directory still exists, retrying (${i + 1}/${retries})...`);
                        await new Promise(r => setTimeout(r, 1000));
                    } catch (err) {
                        console.error(`[Delete Deck] Delete attempt ${i + 1} failed:`, err.message);
                        if (i === retries - 1) throw err;
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }
                if (fs.existsSync(sourcePath)) {
                    throw new Error(`Failed to delete directory ${sourcePath} after multiple attempts.`);
                }
            };

            await deleteWithRetry();
            console.log(`[Delete Deck] Successfully deleted directory.`);
            itemsToDelete.push(deck.path || `src/decks/${deckId}`);
        } else {
            console.warn(`[Delete Deck] WARNING: Directory does not exist, skipping file deletion.`);
        }
    }

    // 3. Update Index
    deckIndex = deckIndex.filter(d => d.id !== deckId);
    fs.writeFileSync(INDEX_FILE, JSON.stringify(deckIndex, null, 2));
    console.log(`[Delete Deck] Removed ${deckId} from index.`);

    // 4. Commit Changes
    console.log(`[Delete Deck] Committing changes...`);
    await new Promise((resolve, reject) => {
        import('child_process').then(({ exec }) => {
            // We use 'git add .' to catch the deletions and index update
            // Alternatively we could be specific: git add -u <paths>
            const commitMsg = `Delete ${isArchived ? 'archived' : 'active'} deck: ${deckId}`;
            exec(`git add "${INDEX_FILE}" ${itemsToDelete.map(p => `"${p}"`).join(' ')} && git commit -m "${commitMsg}"`, { cwd: ROOT_DIR }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[Delete Deck] Git commit failed:`, stderr);
                    // We don't fail the script here because the files are already deleted locally
                } else {
                    console.log(stdout);
                }
                resolve();
            });
        });
    });

    console.log(`[Delete Deck] Successfully deleted ${deckId}.`);
}

// CLI handling
const deckId = process.argv[2];
if (deckId) {
    deleteDeck(deckId);
} else {
    console.log("Usage: node scripts/delete-deck.js <deckId>");
}
