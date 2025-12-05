const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, 'src', 'data', 'deck-index.json');
console.log('Reading metadata from:', metadataPath);

try {
    const content = fs.readFileSync(metadataPath, 'utf8');
    const data = JSON.parse(content);

    const deck = data.find(d => d.id === 'dummy-6');
    console.log('Deck dummy-6 status:', deck ? deck.status : 'NOT FOUND');

} catch (error) {
    console.error('Error:', error);
}
