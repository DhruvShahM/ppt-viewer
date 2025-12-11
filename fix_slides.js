const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\dhruv\\Downloads\\personal_space\\go-concurrency-ppt\\src\\decks\\Design pattern how works';

fs.readdir(dir, (err, files) => {
    if (err) return console.error(err);

    files.forEach(file => {
        if (!file.endsWith('.jsx')) return;
        const filePath = path.join(dir, file);

        const content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(/initial=\{ (.*?) \}/g, 'initial={{ $1 }}');
        newContent = newContent.replace(/animate=\{ (.*?) \}/g, 'animate={{ $1 }}');
        newContent = newContent.replace(/transition=\{ (.*?) \}/g, 'transition={{ $1 }}');
        // Handle cases without spaces if any, though the file view showed spaces
        newContent = newContent.replace(/initial=\{(?!\s*\{)([^}]+)\}/g, 'initial={{ $1 }}');

        // Clean up double braces if I accidentally double-wrapped (regex above is simplistic)
        // Better regex: Look for `prop={ key: val }` and replace with `prop={{ key: val }}`
        // ensuring it doesn't already have double braces.

        // Let's use a more robust replacement strategy
        const fixProp = (text, propName) => {
            // Matches prop={ content } where content doesn't start with {
            const regex = new RegExp(`${propName}=\\{(?!\\{)([^}]+)\\}`, 'g');
            return text.replace(regex, `${propName}={{$1}}`);
        };

        let fixed = content;
        fixed = fixProp(fixed, 'initial');
        fixed = fixProp(fixed, 'animate');
        fixed = fixProp(fixed, 'transition');
        fixed = fixProp(fixed, 'whileHover');
        fixed = fixProp(fixed, 'whileTap');

        if (fixed !== content) {
            fs.writeFileSync(filePath, fixed);
            console.log(`Fixed ${file}`);
        }
    });
});
