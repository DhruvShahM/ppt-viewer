require('dotenv').config();

module.exports = {
    get linkedin() {
        return {
            clientId: process.env.LINKEDIN_CLIENT_ID || 'YOUR_LINKEDIN_CLIENT_ID',
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'YOUR_LINKEDIN_CLIENT_SECRET',
            callbackUrl: 'http://localhost:3001/api/auth/linkedin/callback',
            scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social']
        };
    },
    get google() { // YouTube
        return {
            clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
            callbackUrl: 'http://localhost:3001/api/auth/google/callback',
            scope: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube.force-ssl']
        };
    },
    get twitter() {
        return {
            clientId: process.env.TWITTER_CLIENT_ID || 'YOUR_TWITTER_CLIENT_ID',
            clientSecret: process.env.TWITTER_CLIENT_SECRET || 'YOUR_TWITTER_CLIENT_SECRET',
            callbackUrl: 'http://localhost:3001/api/auth/twitter/callback',
            scope: ['tweet.read', 'tweet.write', 'users.read']
        };
    },
    get facebook() { // Covers Instagram Business as well
        return {
            clientId: process.env.FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID',
            clientSecret: process.env.FACEBOOK_APP_SECRET || 'YOUR_FACEBOOK_APP_SECRET',
            callbackUrl: 'http://localhost:3001/api/auth/facebook/callback',
            scope: ['public_profile', 'email', 'pages_show_list', 'pages_read_engagement', 'pages_manage_posts', 'instagram_basic', 'instagram_content_publish']
        };
    },
    get reddit() {
        return {
            clientId: process.env.REDDIT_CLIENT_ID || 'YOUR_REDDIT_CLIENT_ID',
            clientSecret: process.env.REDDIT_CLIENT_SECRET || 'YOUR_REDDIT_CLIENT_SECRET',
            callbackUrl: 'http://localhost:3001/api/auth/reddit/callback',
            scope: ['identity', 'submit', 'read', 'mysubreddits']
        };
    }
    // Instagram/Facebook requires Meta for Developers setup (more complex, graph API)
};
