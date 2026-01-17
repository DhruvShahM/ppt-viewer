const path = require('path');
const tokenManager = require('./services/token-manager');

console.log("Loading tokens from:", path.resolve(__dirname, '..', 'social_tokens.json'));

try {
    const tokens = tokenManager.loadTokens();
    console.log("Keys:", Object.keys(tokens));
    console.log("Values structure:", Object.values(tokens).map(t => ({ platform: t.platform, id: t.id })));

    // Test logic
    const platform = 'facebook';
    const toDelete = [];
    Object.keys(tokens).forEach(key => {
        // Replicating logic from social-data-service.js
        if (key.startsWith(platform) || tokens[key].platform === platform) {
            toDelete.push(key);
        }
    });
    console.log("Tokens to delete for 'facebook':", toDelete);

} catch (e) {
    console.error(e);
}
