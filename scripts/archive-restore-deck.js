
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'src/data/deck-index.json');
const ARCHIVE_DIR = path.join(ROOT_DIR, 'archives');
const DECKS_DIR = path.join(ROOT_DIR, 'src/decks');

// Ensure archive directory exists
if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

async function processDeck(deckId, action) {
    console.log(`[${action.toUpperCase()}] Processing ${deckId}...`);

    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    let deckIndex = JSON.parse(indexContent);
    const deck = deckIndex.find(d => d.id === deckId);

    if (!deck) {
        console.error(`[${action.toUpperCase()}] Deck ${deckId} not found in index.`);
        return;
    }

    if (action === 'archive') {
        if (deck.status === 'archived') {
            console.log(`Deck ${deckId} is already archived.`);
            return;
        }

        const sourcePath = deck.path ? path.join(ROOT_DIR, deck.path) : path.join(DECKS_DIR, deckId);
        const targetPath = path.join(ARCHIVE_DIR, deckId);

        if (!fs.existsSync(sourcePath)) {
            console.error(`Source path ${sourcePath} does not exist.`);
            return;
        }

        console.log(`Moving ${sourcePath} -> ${targetPath}`);
        fs.renameSync(sourcePath, targetPath);

        deck.status = 'archived';
        deck.archivedAt = new Date().toISOString();
        // Keep the original path relative if we restore it later, but for now it's in archives.
        // Actually, we don't strictly need to update 'path' in the object if we trust our logic,
        // but updating it might be safer for finding it later if we want to support non-standard paths.
        // However, restoring relies on knowing where it SHOULD go.
        // Let's store the 'originalPath' or just imply it from ID if it matches standard structure.
        // Given current structure, 'path' field is used. Let's redirect it to archive for safety, or just leave it?
        // If we leave it as 'src/decks/...' but it's physically in 'archives/...', the app might crash if it tries to load it as active.
        // But the 'status: archived' check in frontend should prevent loading.
        // Let's NOT update the path in JSON, so we know where to restore it TO.
        // Wait, if we don't update path, and we restart server, will it complain?
        // decks.js loads from ../decks/**/deck.js using glob. Moving it out of src/decks removes it from glob.
        // So it won't be loaded. Excellent.

    } else if (action === 'restore') {
        if (deck.status !== 'archived') {
            console.log(`Deck ${deckId} is not archived.`);
            return;
        }

        const sourcePath = path.join(ARCHIVE_DIR, deckId);
        // Use the stored path in deck object, or default to src/decks/{id}
        const targetPath = deck.path ? path.join(ROOT_DIR, deck.path) : path.join(DECKS_DIR, deckId);

        if (!fs.existsSync(sourcePath)) {
            console.error(`Archive path ${sourcePath} does not exist.`);
            return;
        }

        // Ensure target parent dir exists
        const targetParent = path.dirname(targetPath);
        if (!fs.existsSync(targetParent)) {
            fs.mkdirSync(targetParent, { recursive: true });
        }

        console.log(`Moving ${sourcePath} -> ${targetPath}`);
        fs.renameSync(sourcePath, targetPath);

        deck.status = 'active';
        deck.restoredAt = new Date().toISOString();
    } else {
        console.error(`Unknown action: ${action}`);
        return;
    }

    // Update Index
    fs.writeFileSync(INDEX_FILE, JSON.stringify(deckIndex, null, 2));
    console.log(`[${action.toUpperCase()}] Updated index for ${deckId}.`);

    // Git Commit
    await new Promise((resolve) => {
        const commitMsg = `${action === 'archive' ? 'Archive' : 'Restore'} deck: ${deckId}`;
        // We need to stage the file moves.
        // git add -A should capture moves.
        exec(`git add -A && git commit -m "${commitMsg}"`, { cwd: ROOT_DIR }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Git commit failed:`, stderr);
            } else {
                console.log(stdout);
            }
            resolve();
        });
    });

    console.log(`[${action.toUpperCase()}] Successfully processed ${deckId}.`);
}

// CLI handling
const action = process.argv[2];
const deckIds = process.argv[3] ? process.argv[3].split(',') : [];

if (action && deckIds.length > 0) {
    (async () => {
        for (const id of deckIds) {
            await processDeck(id, action);
        }
    })();
} else {
    console.log("Usage: node scripts/archive-restore-deck.js <archive|restore> <deckId1,deckId2,...>");
}
