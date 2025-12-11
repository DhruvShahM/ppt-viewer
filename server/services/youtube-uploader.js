const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');
const socialConfig = require('../config/social');

// Adapted from video_uploading_v7.py
const CATEGORY_MAP = {
    "Film & Animation": "1", "Autos & Vehicles": "2", "Music": "10", "Pets & Animals": "15",
    "Sports": "17", "Travel & Events": "19", "Gaming": "20", "People & Blogs": "22", "Comedy": "23",
    "Entertainment": "24", "News & Politics": "25", "Howto & Style": "26", "Education": "27",
    "Science & Technology": "28", "Nonprofits & Activism": "29"
};

class YouTubeUploader {
    constructor() {
        this.config = socialConfig.google;
    }

    getAuthClient(tokenData) {
        const oauth2Client = new google.auth.OAuth2(
            this.config.clientId,
            this.config.clientSecret,
            this.config.callbackUrl
        );

        oauth2Client.setCredentials({
            access_token: tokenData.accessToken,
            refresh_token: tokenData.refreshToken,
            scope: this.config.scope.join(' '),
            token_type: 'Bearer',
            expiry_date: tokenData.expiryDate
        });

        return oauth2Client;
    }

    async uploadVideo(tokenData, filePath, metadata) {
        // Resolve absolute path if relative
        if (!path.isAbsolute(filePath)) {
            // Assume it's relative to the server root or screenshots dir?
            // The scheduler often passes paths like '/api/renders/...' or '/api/screenshots/...'
            // We need to resolve these to filesystem paths.
            // Assumption: incoming path might be a URL path or fs path.

            // Try to fix common URL paths from the app
            if (filePath.startsWith('/api/screenshots/')) {
                filePath = path.join(__dirname, '..', 'screenshots', filePath.replace('/api/screenshots/', ''));
            } else if (filePath.startsWith('/api/renders/')) {
                filePath = path.join(__dirname, '..', 'renders', filePath.replace('/api/renders/', ''));
            } else {
                filePath = path.join(__dirname, '..', '..', filePath); // Try project root
            }
        }

        if (!fs.existsSync(filePath)) {
            console.error(`[YouTube] File not found: ${filePath}`);
            throw new Error(`Video file not found: ${filePath}`);
        }

        const auth = this.getAuthClient(tokenData);
        const youtube = google.youtube({ version: 'v3', auth });

        try {
            const fileSize = fs.statSync(filePath).size;

            const requestBody = {
                snippet: {
                    title: metadata.title || 'Social Export Video',
                    description: metadata.description || `Uploaded via Social Export Studio on ${new Date().toLocaleString()}`,
                    tags: metadata.tags || ['SocialExport'],
                    categoryId: CATEGORY_MAP[metadata.categoryName] || "22", // Default to People & Blogs
                    defaultLanguage: 'en',
                    defaultAudioLanguage: 'en'
                },
                status: {
                    privacyStatus: metadata.privacyStatus || 'private',
                    selfDeclaredMadeForKids: false,
                    embeddable: true,
                    publicStatsViewable: true
                }
            };

            // Handle scheduled publishing
            // YouTube API requires privacyStatus to be 'private' if publishAt is set
            if (metadata.scheduledTime) {
                const publishDate = new Date(metadata.scheduledTime);
                const now = new Date();

                // If scheduled time is significantly in the future (e.g. > 5 mins), use publishAt
                // Otherwise publish immediately
                if (publishDate.getTime() - now.getTime() > 5 * 60 * 1000) {
                    requestBody.status.publishAt = publishDate.toISOString();
                    requestBody.status.privacyStatus = 'private';
                }
            }

            console.log(`[YouTube] Uploading ${filePath} (${fileSize} bytes)`);

            const res = await youtube.videos.insert({
                part: 'snippet,status', // recordingDetails removed to simplify
                notifySubscribers: true,
                requestBody: requestBody,
                media: {
                    body: fs.createReadStream(filePath),
                },
            });

            console.log(`[YouTube] Upload complete. Video ID: ${res.data.id}`);
            return res.data;

        } catch (error) {
            console.error('[YouTube] Upload failed:', error);
            if (error.response) {
                console.error('[YouTube] API Error Data:', error.response.data);
            }
            throw error;
        }
    }
}

module.exports = new YouTubeUploader();
