
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const ARCHIVES_DIR = path.join(ROOT_DIR, 'archives');

async function debugBuild(deckId) {
    console.log(`Debug building deck: ${deckId}`);
    const deckPath = path.join(ROOT_DIR, 'src/decks', deckId, 'deck.js');

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
        console.log('Build success!');
    } catch (error) {
        console.error('Build failed:', error);
    }
}

debugBuild('test-archive-deck');
