const http = require('http');
const fs = require('fs');

const postData = JSON.stringify({});

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
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    const chunks = [];
    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log(`Downloaded ${buffer.length} bytes`);
        if (res.statusCode === 200) {
            fs.writeFileSync('verification.docx', buffer);
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
