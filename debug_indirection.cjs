
const path = require('path');
const fs = require('fs');

const deckDir = path.resolve('src/decks/load-balancer');
const deckJsPath = path.join(deckDir, 'deck.js');

try {
    let deckContent = fs.readFileSync(deckJsPath, 'utf8');
    let exportMatch = deckContent.match(/export\s+default\s*\[([\s\S]*?)\]/);
    let currentDeckDir = deckDir;

    console.log('Initial exportMatch:', !!exportMatch);

    if (!exportMatch) {
        const varMatch = deckContent.match(/export\s+default\s+([A-Za-z0-9_]+)/);
        console.log('VarMatch:', varMatch ? varMatch[1] : 'none');
        if (varMatch) {
            const varName = varMatch[1];
            const importRegex = /import\s+([\s\S]+?)\s+from\s+['"](.+)['"]/g;
            let match;
            while ((match = importRegex.exec(deckContent)) !== null) {
                console.log('Checking import:', match[1]);
                if (new RegExp(`\\b${varName}\\b`).test(match[1])) {
                    const indirectPath = path.resolve(deckDir, match[2]);
                    const fullIndirectPath = fs.existsSync(indirectPath + '.jsx') ? indirectPath + '.jsx' : (fs.existsSync(indirectPath + '.js') ? indirectPath + '.js' : indirectPath);
                    console.log('Resolved Indirect Path:', fullIndirectPath);
                    if (fs.existsSync(fullIndirectPath)) {
                        deckContent = fs.readFileSync(fullIndirectPath, 'utf8');
                        currentDeckDir = path.dirname(fullIndirectPath);

                        const altRegex = new RegExp(`(?:export\\s+)?(?:const|let|var)\\s+\\b${varName}\\b\\s*=\\s*\\[([\\s\\S]*?)\\]`);
                        console.log('Trying altRegex:', altRegex.source);
                        exportMatch = deckContent.match(altRegex) || deckContent.match(/export\s+default\s*\[([\s\S]*?)\]/);
                        console.log('Alt exportMatch found:', !!exportMatch);
                    }
                    break;
                }
            }
        }
    }

    if (exportMatch) {
        const exportBody = exportMatch[1];
        const cleanBody = exportBody.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        const componentNames = cleanBody
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log('Components found:', componentNames.length);
        console.log('First component:', componentNames[0]);
    } else {
        console.log('FAILED TO FIND ARRAY');
    }
} catch (e) {
    console.error(e);
}
