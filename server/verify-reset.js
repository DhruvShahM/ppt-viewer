const socialDataService = require('./services/social-data-service');
const tokenManager = require('./services/token-manager');

// Mock token manager
const mockTokens = {
    'facebook_123': { platform: 'facebook', id: '123' },
    'instagram_456': { platform: 'instagram', id: '456' },
    'youtube_789': { platform: 'youtube', id: '789' }
};

tokenManager.loadTokens = () => mockTokens;
let savedTokens = {};
tokenManager.saveTokens = (tokens) => { savedTokens = tokens; };

async function runTest() {
    console.log("Initial Tokens:", Object.keys(mockTokens));

    console.log("--- Testing Reset Facebook ---");
    await socialDataService.disconnectAccount('facebook');

    console.log("Tokens after reset:", Object.keys(savedTokens));

    if (!savedTokens['facebook_123'] && !savedTokens['instagram_456'] && savedTokens['youtube_789']) {
        console.log("✅ SUCCESS: Facebook and Instagram tokens removed, YouTube preserved.");
    } else {
        console.error("❌ MOCKED TEST FAILED");
        console.log("Saved Tokens:", savedTokens);
    }
}

runTest();
