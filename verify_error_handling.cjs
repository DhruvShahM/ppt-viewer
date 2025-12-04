const http = require('http');

const makeRequest = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        statusCode: res.statusCode,
                        body: JSON.parse(body || '{}')
                    });
                } catch (e) {
                    console.log('Raw body:', body);
                    resolve({
                        statusCode: res.statusCode,
                        body: body
                    });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(data);
        }
        req.end();
    });
};

const verify = async () => {
    console.log('--- Verifying Error Handling ---');

    // Test 1: 404 Not Found
    try {
        console.log('\nTest 1: 404 Not Found');
        const res404 = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: '/api/nonexistent',
            method: 'GET'
        });
        console.log('Status:', res404.statusCode);
        if (typeof res404.body === 'object') {
            console.log('Body:', JSON.stringify(res404.body, null, 2));
        }
    } catch (err) {
        console.error('Test 1 failed:', err);
    }

    // Test 2: 400 Bad Request
    try {
        console.log('\nTest 2: 400 Bad Request (Missing fields)');
        const res400 = await makeRequest({
            hostname: 'localhost',
            port: 3001,
            path: '/api/feedback',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, JSON.stringify({}));
        console.log('Status:', res400.statusCode);
        if (typeof res400.body === 'object') {
            console.log('Body:', JSON.stringify(res400.body, null, 2));
        }
    } catch (err) {
        console.error('Test 2 failed:', err);
    }
};

verify();
