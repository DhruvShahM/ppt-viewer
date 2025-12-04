
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'src/data/deck-index.json');
const ARCHIVES_DIR = path.join(ROOT_DIR, 'archives'); // Simulating the archive storage

// Ensure archives directory exists
if (!fs.existsSync(ARCHIVES_DIR)) {
    fs.mkdirSync(ARCHIVES_DIR);
}

async function archiveDeck(deckId) {
    console.log(`Archiving deck: ${deckId}`);

    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    const deckIndex = JSON.parse(indexContent);
    const deck = deckIndex.find(d => d.id === deckId);

    if (!deck) {
        console.error(`Deck ${deckId} not found in index.`);
        return;
    }

    if (deck.status === 'archived') {
        console.log(`Deck ${deckId} is already archived.`);
        return;
    }

    const deckPath = path.join(ROOT_DIR, deck.path, 'deck.js');
    if (!fs.existsSync(deckPath)) {
        console.error(`Deck source not found at ${deckPath}`);
        return;
    }

    console.log(`Building deck ${deckId}...`);

    try {
        await build({
            root: ROOT_DIR,
            base: './',
            configFile: false,
            plugins: [react()],
            resolve: {
                alias: {
                    '@': path.resolve(ROOT_DIR, './src'),
                    '@deck': deckPath
                }
            },
            build: {
                outDir: path.join(ARCHIVES_DIR, deckId),
                emptyOutDir: true,
                rollupOptions: {
                    input: path.join(ROOT_DIR, 'archive.html')
                }
            },
            logLevel: 'info'
        });

        console.log(`Build complete for ${deckId}`);

        // Update index
        deck.status = 'archived';
        deck.archivePath = `archives/${deckId}/archive.html`; // Relative path for serving
        deck.originalPath = deck.path; // Save original path for restoration
        delete deck.path; // Remove source path

        fs.writeFileSync(INDEX_FILE, JSON.stringify(deckIndex, null, 2));
        console.log(`Index updated.`);

        // Delete source files using git-archive script
        console.log(`Running git archive for ${deckId}...`);
        await new Promise((resolve, reject) => {
            // We need to pass the relative path to the source directory
            const relativeSourcePath = deck.path || `src/decks/${deckId}`;

            // Use exec from child_process (imported implicitly via build? no, need to import it)
            // Actually, we are in an async function, let's just use exec
            import('child_process').then(({ exec }) => {
                exec(`node scripts/git-archive.js ${deckId} "${relativeSourcePath}"`, { cwd: ROOT_DIR }, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Git archive failed for ${deckId}:`, stderr);
                        // Don't reject, just log error so we don't crash the whole process? 
                        // Or maybe we should fail? Let's log and continue for now.
                        console.error(error);
                    } else {
                        console.log(stdout);
                    }
                    resolve();
                });
            });
        });

    } catch (error) {
        console.error(`Failed to archive deck ${deckId}:`, error);
    }
}

// Auto-archive logic
async function autoArchive() {
    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    const deckIndex = JSON.parse(indexContent);

    const activeDecks = deckIndex.filter(d => d.status === 'active');
    const MAX_DECKS = 50;

    if (activeDecks.length <= MAX_DECKS) {
        console.log(`Active decks (${activeDecks.length}) is within limit (${MAX_DECKS}). No action needed.`);
        return;
    }

    const decksToArchiveCount = activeDecks.length - MAX_DECKS;
    console.log(`Found ${activeDecks.length} active decks. Archiving oldest ${decksToArchiveCount} decks...`);

    // Assuming the index order reflects creation order (oldest first)
    // If not, we would need a timestamp field. For now, we take from the top.
    const decksToArchive = activeDecks.slice(0, decksToArchiveCount);

    for (const deck of decksToArchive) {
        await archiveDeck(deck.id);
    }
}

// CLI handling
const deckId = process.argv[2];
if (deckId === '--auto') {
    autoArchive();
} else if (deckId) {
    archiveDeck(deckId);
} else {
    console.log("Usage: node scripts/archive-decks.js <deckId> | --auto");
}
