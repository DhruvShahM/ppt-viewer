const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

async function testZipImport() {
    console.log("Creating test zip...");
    const zip = new AdmZip();
    zip.addFile("Slide1.jsx", Buffer.from("export default () => <div>Slide 1</div>;"));
    zip.addFile("Slide2.jsx", Buffer.from("export default () => <div>Slide 2</div>;"));
    const zipBuffer = zip.toBuffer();

    // Save to file for formData (optional, but easier to use with some libs, but here we can just construct body)
    // Actually, constructing multipart/form-data manually with native fetch is annoying.
    // Let's use a temp file and a simple boundary.
    const zipPath = 'test-deck.zip';
    fs.writeFileSync(zipPath, zipBuffer);

    console.log("Uploading zip...");

    // We need to construct the multipart body manually or use a lib.
    // Since we don't want to install extra deps just for this test if possible...
    // Let's try to just use 'fetch' with a FormData polyfill? Node doesn't have FormData native until recently?
    // Node 18 has FormData. Let's assume Node 18+.

    try {
        const { FormData } = require('undici'); // Wait, might not have undici.
        // Let's check node version or just try generic FormData if available globally.
    } catch (e) { }

    // Fallback: Use a simple manual construction or just use curl?
    // Let's try to use the 'server/test-utils' if any? No.

    // Simplest: just use the `adm-zip` to create the file, then verify by manual inspection or...
    // Wait, I can use the existing `scripts/` folder?

    // Let's try to construct a simple multipart request manually.
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

    let body = `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="deckId"\r\n\r\n`;
    body += `test-zip-deck\r\n`;

    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="title"\r\n\r\n`;
    body += `Test Zip Deck\r\n`;

    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="files"; filename="test-deck.zip"\r\n`;
    body += `Content-Type: application/zip\r\n\r\n`;

    // This is tricky with string concatenation for binary data.
    // Better to use a Buffer.

    const preamble = Buffer.from(body, 'utf-8');
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');

    const payload = Buffer.concat([preamble, zipBuffer, footer]);

    const res = await fetch('http://localhost:3001/api/import-deck', {
        method: 'POST',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`
        },
        body: payload
    });

    if (res.ok) {
        console.log("Upload success!");
        const json = await res.json();
        console.log(json);

        // Verify file extraction
        const deckPath = path.join(__dirname, '..', 'src', 'decks', 'test-zip-deck');
        if (fs.existsSync(path.join(deckPath, 'Slide1.jsx'))) {
            console.log("VERIFIED: Slide1.jsx extracted.");
        } else {
            console.error("FAILED: Slide1.jsx not found.");
        }

    } else {
        console.error("Upload failed:", res.status, await res.text());
    }
}

testZipImport().catch(console.error);
