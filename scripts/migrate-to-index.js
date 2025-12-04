
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPOS_FILE = path.join(__dirname, '../src/data/repositories.js');
const INDEX_FILE = path.join(__dirname, '../src/data/deck-index.json');

async function migrate() {
    console.log('Migrating decks to index...');

    // Use pathToFileURL to correctly handle Windows paths for dynamic import
    const reposUrl = pathToFileURL(REPOS_FILE).href;
    const { REPOSITORIES } = await import(reposUrl);

    const deckIndex = [];

    for (const repo of REPOSITORIES) {
        for (const deck of repo.decks) {
            deckIndex.push({
                id: deck.id,
                title: deck.title,
                repoId: repo.id,
                repoTitle: repo.title,
                description: deck.description,
                icon: deck.icon,
                color: deck.color,
                status: 'active',
                path: `src/decks/${deck.id}`
            });
        }
    }

    fs.writeFileSync(INDEX_FILE, JSON.stringify(deckIndex, null, 2));
    console.log(`Migration complete. Indexed ${deckIndex.length} decks.`);
}

migrate().catch(console.error);
