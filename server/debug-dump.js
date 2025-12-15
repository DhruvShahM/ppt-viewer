const path = require('path');
// Manually read file to avoid dependency issues with token-manager if any
const fs = require('fs');

const TOKENS_FILE = path.resolve(__dirname, '..', 'social_tokens.json');
console.log("Reading:", TOKENS_FILE);

try {
    if (fs.existsSync(TOKENS_FILE)) {
        const data = fs.readFileSync(TOKENS_FILE, 'utf8');
        const tokens = JSON.parse(data);
        console.log("ALL KEYS:", Object.keys(tokens));
        console.log("ALL PLATFORMS:", Object.values(tokens).map(t => t.platform));
    } else {
        console.log("File not found");
    }
} catch (e) {
    console.error(e);
}
