
const deckContent = `
import GuideTitle from './GuideTitle';
import { Foo, Bar } from './Utils';
import Baz from './Baz';

export default [
    GuideTitle,
    Foo,
    Bar,
    Baz
];
`;

const slideIndex = 1; // Foo

const exportMatch = deckContent.match(/export\s+default\s*\[([\s\S]*?)\]/);
if (exportMatch) {
    const exportBody = exportMatch[1];
    const cleanBody = exportBody.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const componentNames = cleanBody
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    console.log('Components:', componentNames);

    if (slideIndex < componentNames.length) {
        const componentName = componentNames[slideIndex]; // "Foo"
        console.log('Target:', componentName);

        // Improved search
        const importRegex = /import\s+([\s\S]+?)\s+from\s+['"](.+)['"]/g;
        let match;
        while ((match = importRegex.exec(deckContent)) !== null) {
            const imports = match[1];
            const importPath = match[2];

            // Check if componentName is in imports
            // Tokenize imports by comma, braces
            const tokens = imports.split(/[\s,{,}]+/).filter(Boolean);
            if (tokens.includes(componentName)) {
                console.log(`Found ${componentName} in ${importPath}`);
                break;
            }
        }
    }
}
