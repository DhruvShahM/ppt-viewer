import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DECK_NAME = process.argv[2];

if (!DECK_NAME) {
    console.error('Please provide a deck name: node scripts/extract_deck_content.js <deck-name>');
    process.exit(1);
}

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DECK_PATH = path.join(PROJECT_ROOT, 'src', 'decks', DECK_NAME);
const DECK_FILE = path.join(DECK_PATH, 'deck.js');

if (!fs.existsSync(DECK_FILE)) {
    console.error(`Deck file not found: ${DECK_FILE}`);
    process.exit(1);
}

// 1. Parse deck.js to get the list of slide files
const deckContent = fs.readFileSync(DECK_FILE, 'utf-8');
const slideImports = {};
const slideOrder = [];

// Extract imports: import X from './X';
const importRegex = /import\s+(\w+)\s+from\s+['"](.+)['"];/g;
let match;
while ((match = importRegex.exec(deckContent)) !== null) {
    const [_, componentName, importPath] = match;
    slideImports[componentName] = importPath;
}

// Extract export array to determine order: export default [ A, B, C ];
const exportRegex = /export\s+default\s+\[([\s\S]+?)\];/;
const exportMatch = exportRegex.exec(deckContent);

if (exportMatch) {
    const arrayContent = exportMatch[1];
    // Split by comma and cleanup
    arrayContent.split(',').forEach(item => {
        const name = item.trim();
        if (name && slideImports[name]) {
            slideOrder.push({
                name,
                importPath: slideImports[name]
            });
        }
    });
} else {
    console.error('Could not parse default export in deck.js');
    process.exit(1);
}

// 2. Extract content from each slide
const slidesData = [];

slideOrder.forEach((slide, index) => {
    // Resolve absolute path. Imports are relative to deck.js
    const absolutePath = path.resolve(DECK_PATH, slide.importPath);
    // Add extension if missing (assume .jsx or .js)
    let filePath = absolutePath;
    if (!fs.existsSync(filePath)) {
        if (fs.existsSync(absolutePath + '.jsx')) filePath = absolutePath + '.jsx';
        else if (fs.existsSync(absolutePath + '.js')) filePath = absolutePath + '.js';
    }

    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Simple regex-based text extraction (naive but effective for this context)
        // 1. Remove imports
        let cleanContent = content.replace(/import\s+.*;/g, '');
        // 2. Remove tags but keep text content
        // This is tricky with simple regex, so we'll do a rough pass:
        // Extract text between > and <
        const textParts = [];
        const tagRegex = />([^<]+)</g;
        while ((match = tagRegex.exec(cleanContent)) !== null) {
            const text = match[1].trim();
            if (text && !text.startsWith('{') && !text.startsWith('}')) {
                textParts.push(text);
            }
        }

        // Also try to find string literals in JSX attributes if valuable, 
        // but free text is usually between tags.

        // Fallback/Supplement: Grab large blocks of comments if any? No, sticking to visible text.

        // Refined extraction for common slide headers
        const titleMatch = content.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i);
        const title = titleMatch ? titleMatch[1] : `Slide ${index + 1}`;

        slidesData.push({
            slideNumber: index + 1,
            component: slide.name,
            title: title.trim(),
            rawText: textParts.join(' ').replace(/\s+/g, ' '),
            // Store raw code for context if needed by LLM? 
            // Maybe just partial content.
            // Let's store the raw file content too for the "flexible" requirement, 
            // so the LLM can parse it better if needed.
            // But limiting size is good. Let's just keep extracted text + raw content for now.
            fileContent: content
        });
    } else {
        console.warn(`Could not find file for slide: ${slide.name}`);
    }
});

const output = {
    deckName: DECK_NAME,
    totalSlides: slidesData.length,
    slides: slidesData
};

const outputPath = path.join(PROJECT_ROOT, 'deck-content.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Successfully extracted content for ${slidesData.length} slides.`);
console.log(`Output saved to: ${outputPath}`);
