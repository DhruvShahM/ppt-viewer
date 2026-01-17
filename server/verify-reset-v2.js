const socialDataService = require('./services/social-data-service');
const tokenManager = require('./services/token-manager');

// Mock token manager again
const mockTokens = {
    'facebook_123': { platform: 'facebook', id: '123' },
    'instagram_456': { platform: 'instagram', id: '456' },
    'youtube_789': { platform: 'youtube', id: '789' }
};

tokenManager.loadTokens = () => mockTokens;
let savedTokens = {};
tokenManager.saveTokens = (tokens) => { savedTokens = tokens; };

console.log("--- START TEST V2 ---");
async function runTest() {
    await socialDataService.disconnectAccount('facebook');
}

runTest();
