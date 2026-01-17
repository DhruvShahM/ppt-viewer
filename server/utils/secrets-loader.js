const fs = require('fs');
const path = require('path');

/**
 * Scans the 'secrets' directory in the project root for JSON files.
 * Automatically attempts to identify and load credentials into process.env.
 */
const loadSecrets = () => {
    // Navigate from /server/utils/ down to project root, then secrets
    const secretsDir = path.join(__dirname, '..', '..', 'secrets');

    if (!fs.existsSync(secretsDir)) {
        // Silent return if no directory, it's optional
        return;
    }

    try {
        const files = fs.readdirSync(secretsDir);
        let loadedCount = 0;

        for (const file of files) {
            if (!file.endsWith('.json')) continue;

            const filePath = path.join(secretsDir, file);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(content);

                // Strategy 1: Google Cloud Credentials (downloaded from console)
                // Structure: { web: { client_id, client_secret, ... } } or { installed: { ... } }
                const googleCreds = json.web || json.installed;
                if (googleCreds && googleCreds.client_id && googleCreds.client_secret) {
                    let updated = false;

                    if (!process.env.GOOGLE_CLIENT_ID) {
                        process.env.GOOGLE_CLIENT_ID = googleCreds.client_id;
                        updated = true;
                    }
                    if (!process.env.GOOGLE_CLIENT_SECRET) {
                        process.env.GOOGLE_CLIENT_SECRET = googleCreds.client_secret;
                        updated = true;
                    }

                    if (updated) {
                        console.log(`[Secrets] 🔑 Loaded Google Credentials from ${file}`);
                        loadedCount++;
                    }
                }

                // Strategy 2: Generic Key-Value Pairs
                // If the file contains keys that match our expected env vars
                const expectedKeys = ['LINKEDIN_CLIENT_ID', 'FACEBOOK_APP_ID', 'TWITTER_CLIENT_ID'];
                expectedKeys.forEach(key => {
                    if (json[key] && !process.env[key]) {
                        process.env[key] = json[key];
                        console.log(`[Secrets] 🔑 Loaded ${key} from ${file}`);
                        loadedCount++;
                    }
                });

            } catch (err) {
                console.warn(`[Secrets] ⚠️ Failed to parse ${file}: ${err.message}`);
            }
        }
    } catch (err) {
        console.error('[Secrets] Error reading secrets directory:', err);
    }
};

module.exports = loadSecrets;
