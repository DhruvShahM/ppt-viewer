const http = require('http');

const postData = JSON.stringify({
    deckId: 'test-deck',
    slideIndex: 0,
    instruction: 'Test instruction'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/feedback',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('POST Response:', data);
        const feedback = JSON.parse(data);
        const id = feedback.id;

        // Now update to planned
        const updateData = JSON.stringify({
            status: 'planned',
            implementationPlan: 'Step 1: Do this\nStep 2: Do that'
        });

        const updateOptions = {
            hostname: 'localhost',
            port: 3001,
            path: `/api/feedback/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(updateData)
            }
        };

        const updateReq = http.request(updateOptions, (res) => {
            let updateResData = '';
            res.on('data', (chunk) => { updateResData += chunk; });
            res.on('end', () => {
                console.log('PUT (Planned) Response:', updateResData);

                // Now update to approved
                const approveData = JSON.stringify({
                    status: 'approved'
                });

                const approveOptions = {
                    hostname: 'localhost',
                    port: 3001,
                    path: `/api/feedback/${id}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(approveData)
                    }
                };

                const approveReq = http.request(approveOptions, (res) => {
                    let approveResData = '';
                    res.on('data', (chunk) => { approveResData += chunk; });
                    res.on('end', () => {
                        console.log('PUT (Approved) Response:', approveResData);
                    });
                });
                approveReq.write(approveData);
                approveReq.end();
            });
        });
        updateReq.write(updateData);
        updateReq.end();
    });
});

req.write(postData);
req.end();
