
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'src/data/deck-index.json');
const DECKS_DIR = path.join(ROOT_DIR, 'src/decks');

const CATEGORY_ID = 'stress-test';
const CATEGORY_TITLE = 'Stress Test';

async function generateDummyDecks() {
  console.log('Generating 20 dummy decks...');

  let deckIndex = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));

  for (let i = 1; i <= 20; i++) {
    const deckId = `dummy-${i}`;
    const deckDir = path.join(DECKS_DIR, deckId);

    // 1. Create Directory
    if (!fs.existsSync(deckDir)) {
      fs.mkdirSync(deckDir, { recursive: true });
    }

    // 2. Create Slide1.jsx
    const slideContent = `import React from 'react';

const Slide1 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-6xl font-bold mb-8">Dummy Deck ${i}</h1>
      <p className="text-2xl text-gray-400">This is a demo slide for testing.</p>
    </div>
  );
};

export default Slide1;
`;
    fs.writeFileSync(path.join(deckDir, 'Slide1.jsx'), slideContent);

    // 3. Create deck.js
    const deckJsContent = `import Slide1 from './Slide1';

export default [
  Slide1
];
`;
    fs.writeFileSync(path.join(deckDir, 'deck.js'), deckJsContent);

    // 4. Update Index
    // Check if deck already exists in index to avoid duplicates
    const existingDeckIndex = deckIndex.findIndex(d => d.id === deckId);
    const newDeckEntry = {
      id: deckId,
      title: `Dummy Deck ${i}`,
      repoId: CATEGORY_ID,
      repoTitle: CATEGORY_TITLE,
      description: `Auto-generated dummy deck ${i} for testing.`,
      icon: "Zap",
      color: "gray",
      status: "active",
      path: `src/decks/${deckId}`
    };

    if (existingDeckIndex !== -1) {
      deckIndex[existingDeckIndex] = newDeckEntry;
    } else {
      deckIndex.push(newDeckEntry);
    }

    console.log(`Created ${deckId}`);
  }

  fs.writeFileSync(INDEX_FILE, JSON.stringify(deckIndex, null, 2));
  console.log('Deck generation complete. Index updated.');
}

generateDummyDecks();
