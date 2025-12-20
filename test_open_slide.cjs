
const http = require('http');

const data = JSON.stringify({
    deckId: 'concurrency-guide',
    slideIndex: 0
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/open-file',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log(`StatusCode: ${res.statusCode}`);
        console.log('Response:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error:', error.message);
});

req.write(data);
req.end();
