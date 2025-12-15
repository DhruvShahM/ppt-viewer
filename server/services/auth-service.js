const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { google } = require('googleapis');
const socialConfig = require('../config/social');

const tokenManager = require('./token-manager');

// Helper to save tokens
const saveToken = (platform, tokenData) => {
    return tokenManager.savePlatformToken(platform, tokenData);
};

const authService = {
    // --- SIMULATED ---
    handleSimulatedCallback: (platform) => {
        const id = Math.round(Math.random() * 100000).toString();
        const userData = {
            id: id,
            name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} User ${id.substring(0, 3)}`,
            email: `user${id}@${platform}.com`,
            picture: null,
            platform: platform,
            accessToken: 'mock_token_' + id,
            expiryDate: Date.now() + 3600000
        };
        saveToken(platform, userData);
        return userData;
    },

    validateConfig: (config, platformName) => {
        if (!config.clientId || config.clientId.includes('YOUR_') || !config.clientSecret || config.clientSecret.includes('YOUR_')) {
            throw new Error(`Invalid configuration for ${platformName}. Please go to Settings > Configure API Credentials and enter your Client ID and Secret.`);
        }
    },

    // --- LINKEDIN ---
    getLinkedinAuthUrl: () => {
        authService.validateConfig(socialConfig.linkedin, 'LinkedIn');
        const { clientId, callbackUrl, scope } = socialConfig.linkedin;
        const state = Math.random().toString(36).substring(7);
        return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=${state}&scope=${scope.join('%20')}`;
    },

    handleLinkedinCallback: async (code) => {
        const { clientId, clientSecret, callbackUrl } = socialConfig.linkedin;

        // 1. Exchange code for access token
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: callbackUrl,
                client_id: clientId,
                client_secret: clientSecret
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        // 2. Get User Profile (to know WHO connected)
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const userData = {
            id: profileResponse.data.id,
            name: `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`,
            platform: 'linkedin',
            accessToken,
            scope: socialConfig.linkedin.scope
        };

        saveToken('linkedin', userData);
        return userData;
    },

    // --- GOOGLE / YOUTUBE ---
    getGoogleAuthUrl: () => {
        authService.validateConfig(socialConfig.google, 'Google/YouTube');
        const { clientId, clientSecret, callbackUrl, scope } = socialConfig.google;
        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, callbackUrl);

        return oauth2Client.generateAuthUrl({
            access_type: 'offline', // Critical for refreshing tokens
            prompt: 'consent select_account', // Force account picker and consent screen to allow multiple accounts
            scope: scope
        });
    },

    handleGoogleCallback: async (code) => {
        const { clientId, clientSecret, callbackUrl } = socialConfig.google;
        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, callbackUrl);

        // 1. Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // 2. Get User Profile
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();

        const userData = {
            id: userInfo.data.id,
            name: userInfo.data.name,
            email: userInfo.data.email,
            picture: userInfo.data.picture,
            platform: 'youtube', // Mapping google to youtube for app consistency
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token, // Important!
            expiryDate: tokens.expiry_date
        };

        saveToken('youtube', userData);
        return userData;
    },

    // --- TWITTER (OAuth 2.0 with PKCE usually, but simplified here for Code Flow if Confidential Client) ---
    // Note: Twitter implementation often requires session storage for code_verifier if using PKCE.
    // We will assume "Confidential Client" flow for simplicity if keys are provided.
    // --- FACEBOOK / INSTAGRAM ---
    getFacebookAuthUrl: () => {
        authService.validateConfig(socialConfig.facebook, 'Facebook');
        const { clientId, callbackUrl, scope } = socialConfig.facebook;
        const state = Math.random().toString(36).substring(7);
        return `https://www.facebook.com/v21.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=${state}&scope=${scope.join(',')}&response_type=code`;
    },

    handleFacebookCallback: async (code) => {
        const { clientId, clientSecret, callbackUrl } = socialConfig.facebook;

        // 1. Exchange code for access token
        // Facebook requires a GET request usually
        const tokenResponse = await axios.get('https://graph.facebook.com/v21.0/oauth/access_token', {
            params: {
                client_id: clientId,
                redirect_uri: callbackUrl,
                client_secret: clientSecret,
                code: code
            }
        });

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) throw new Error('Failed to retrieve access token from Facebook');

        // 2. Get User Profile
        const profileResponse = await axios.get('https://graph.facebook.com/me', {
            params: {
                fields: 'id,name,email,picture',
                access_token: accessToken
            }
        });

        const userData = {
            id: profileResponse.data.id,
            name: profileResponse.data.name,
            email: profileResponse.data.email, // might be undefined if not granted
            picture: profileResponse.data.picture?.data?.url,
            platform: 'facebook', // or instagram if determined later
            accessToken: accessToken,
            expiryDate: Date.now() + (tokenResponse.data.expires_in * 1000)
        };

        saveToken('facebook', userData);
        return userData;
    },

    // --- INSTAGRAM (Business Login) ---
    getInstagramAuthUrl: () => {
        authService.validateConfig(socialConfig.instagram, 'Instagram');
        const { clientId, callbackUrl, scope } = socialConfig.instagram;
        const state = Math.random().toString(36).substring(7);
        // Instagram for Business Login URL
        // Using the standard OAuth URL without legacy params
        return `https://www.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=${scope.join(',')}&state=${state}`;
    },

    handleInstagramCallback: async (code) => {
        const { clientId, clientSecret, callbackUrl } = socialConfig.instagram;

        // 1. Exchange code for short-lived access token
        const formData = new URLSearchParams();
        formData.append('client_id', clientId);
        formData.append('client_secret', clientSecret);
        formData.append('grant_type', 'authorization_code');
        formData.append('redirect_uri', callbackUrl);
        formData.append('code', code);

        const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', formData);

        let accessToken = tokenResponse.data.access_token;
        const userId = tokenResponse.data.user_id; // Int returned here

        // 2. (Optional) Exchange for Long-Lived Token if needed
        // For now, use the token we got.

        // 3. Get User Profile via Graph API
        // Note: For Instagram Business Login, we use graph.instagram.com
        const profileResponse = await axios.get(`https://graph.instagram.com/me`, {
            params: {
                fields: 'id,username,account_type',
                access_token: accessToken
            }
        });

        const userData = {
            id: profileResponse.data.id,
            name: profileResponse.data.username, // Instagram doesn't always give 'name'
            username: profileResponse.data.username,
            picture: null, // Basic API might not give URL directly without more calls
            platform: 'instagram',
            accessToken: accessToken,
            expiryDate: Date.now() + (3600 * 1000) // Approx 1 hour usually
        };

        saveToken('instagram', userData);
        return userData;
    },

    // --- REDDIT ---
    getRedditAuthUrl: () => {
        authService.validateConfig(socialConfig.reddit, 'Reddit');
        const { clientId, callbackUrl, scope } = socialConfig.reddit;
        const state = Math.random().toString(36).substring(7);
        // Reddit requires Basic Auth for the token request, but standard URL for auth
        return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(callbackUrl)}&duration=permanent&scope=${scope.join('%20')}`;
    },

    handleRedditCallback: async (code) => {
        const { clientId, clientSecret, callbackUrl } = socialConfig.reddit;

        // 1. Exchange code for access token
        // Reddit requires Basic Auth
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', callbackUrl);

        const tokenResponse = await axios.post('https://www.reddit.com/api/v1/access_token', params, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;
        const refreshToken = tokenResponse.data.refresh_token;

        // 2. Get User Identity
        const meResponse = await axios.get('https://oauth.reddit.com/api/v1/me', {
            headers: {
                'Authorization': `bearer ${accessToken}`
            }
        });

        const userData = {
            id: meResponse.data.id,
            name: meResponse.data.name, // Username
            // icon_img usually available
            picture: meResponse.data.icon_img ? meResponse.data.icon_img.split('?')[0] : null,
            platform: 'reddit',
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiryDate: Date.now() + (tokenResponse.data.expires_in * 1000)
        };

        saveToken('reddit', userData);
        return userData;
    }
};

module.exports = authService;
