const http = require('http');
const fs = require('fs');

const runTest = (name, postBody, expectedSizeMin) => {
    return new Promise((resolve) => {
        const postData = JSON.stringify(postBody);
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/feedback/download-docx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            },
        };

        const req = http.request(options, (res) => {
            console.log(`[${name}] STATUS: ${res.statusCode}`);
            if (res.statusCode !== 200) {
                // Log error body
                res.on('data', d => console.log(d.toString()));
            }

            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                console.log(`[${name}] Downloaded ${buffer.length} bytes`);
                if (res.statusCode === 200) {
                    fs.writeFileSync(`verify-${name}.docx`, buffer);
                    if (buffer.length > expectedSizeMin) {
                        console.log(`[${name}] SUCCESS: Valid size`);
                    } else {
                        console.log(`[${name}] FAILURE: File too small`);
                    }
                }
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`[${name}] REQUEST ERROR: ${e.message}`);
            resolve();
        });

        req.write(postData);
        req.end();
    });
};

const run = async () => {
    // Test 1: Slide Only (hindi-concurrency, slide 4) - Should have 1 item
    console.log('--- TEST 1: SLIDE ONLY ---');
    await runTest('slide', { deckId: 'hindi-concurrency', slideIndex: 4 }, 100);

    // Test 2: Deck Only (hindi-concurrency) - Should have all items (at least 2 based on feedback.json)
    console.log('\n--- TEST 2: DECK ALL ---');
    await runTest('deck', { deckId: 'hindi-concurrency' }, 100);
};

run();
