import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src/decks/Design pattern how works');

console.log(`Scanning directory: ${dir}`);

try {
    const files = fs.readdirSync(dir);
    console.log(`Found ${files.length} files`);

    files.forEach(file => {
        if (!file.endsWith('.jsx')) return;
        const filePath = path.join(dir, file);
        console.log(`Processing ${file}...`);

        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace initial={ opacity: ... } with initial={{ opacity: ... }}
        // We look for patterns where key follows { and isn't followed by another {

        const propsToFix = ['initial', 'animate', 'transition', 'whileHover', 'whileTap'];

        propsToFix.forEach(prop => {
            const regex = new RegExp(`${prop}=\\{ ([^\\{].*?) \\}`, 'g');
            // Matches: prop={ key: val } (note spaces)
            content = content.replace(regex, `${prop}={{ $1 }}`);

            // Also try without spaces just in case
            const regex2 = new RegExp(`${prop}=\\{([^\\{\\s].*?)\\}`, 'g');
            content = content.replace(regex2, `${prop}={{ $1 }}`);
        });


        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Fixed ${file}`);
        } else {
            console.log(`UNCHANGED ${file}`);
        }
    });

} catch (e) {
    console.error("Error:", e);
}
