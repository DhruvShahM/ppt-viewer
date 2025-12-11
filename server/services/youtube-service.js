const { google } = require('googleapis');
const socialConfig = require('../config/social');

const youtubeService = {
    getClient: (tokenData) => {
        const { clientId, clientSecret, callbackUrl } = socialConfig.google;
        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, callbackUrl);

        oauth2Client.setCredentials({
            access_token: tokenData.accessToken,
            refresh_token: tokenData.refreshToken,
            expiry_date: tokenData.expiryDate,
            // If using latest google-auth-library, keys might differ slightly (refresh_token vs refreshToken), 
            // but the library is usually lenient or we should map standard names.
            // Based on auth-service.js: it saves refreshToken.
        });

        return google.youtube({ version: 'v3', auth: oauth2Client });
    },

    getVideos: async (tokenData, maxResults = 20) => {
        try {
            const youtube = youtubeService.getClient(tokenData);

            // 1. Get Channel's Uploads Playlist ID
            const channelsRes = await youtube.channels.list({
                part: 'contentDetails',
                mine: true
            });

            if (!channelsRes.data.items || channelsRes.data.items.length === 0) {
                throw new Error('No channel found for this user');
            }

            const uploadPlaylistId = channelsRes.data.items[0].contentDetails.relatedPlaylists.uploads;

            // 2. Get Videos from Playlist
            const playlistRes = await youtube.playlistItems.list({
                part: 'snippet,contentDetails',
                playlistId: uploadPlaylistId,
                maxResults: maxResults
            });

            const videoIds = playlistRes.data.items.map(item => item.contentDetails.videoId);

            if (videoIds.length === 0) return [];

            // 3. Get Video Stats
            const videosRes = await youtube.videos.list({
                part: 'statistics,snippet,contentDetails',
                id: videoIds.join(',')
            });

            const parseDuration = (duration) => {
                // Simple parser for PT#H#M#S
                const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
                if (!match) return duration;
                const hours = (match[1] || '').replace('H', '');
                const mins = (match[2] || '').replace('M', '');
                const secs = (match[3] || '').replace('S', '');

                const parts = [];
                if (hours) parts.push(`${hours}h`);
                if (mins) parts.push(`${mins}m`);
                if (secs || parts.length === 0) parts.push(`${secs || 0}s`);
                return parts.join(' ');
            };

            return videosRes.data.items.map(item => ({
                id: item.id,
                title: item.snippet.title,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url : item.snippet.thumbnails.default.url,
                views: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                comments: item.statistics.commentCount,
                duration: parseDuration(item.contentDetails.duration),
                rawDuration: item.contentDetails.duration
            }));
        } catch (error) {
            console.error('YouTube Fetch Videos Error:', error.message);
            if (error.message && error.message.includes('invalid_client')) {
                console.error('HINT: The Client ID/Secret in .env might be incorrect or different from the one used to authorize the token. Try disconnecting and reconnecting the account.');
            }
            throw error;
        }
    },

    getComments: async (tokenData, videoId, maxResults = 50) => {
        try {
            const youtube = youtubeService.getClient(tokenData);

            const commentsRes = await youtube.commentThreads.list({
                part: 'snippet,replies',
                videoId: videoId,
                maxResults: maxResults,
                textFormat: 'plainText',
                order: 'relevance'
            });

            return commentsRes.data.items.map(item => {
                const topOpen = item.snippet.topLevelComment.snippet;
                return {
                    id: item.id,
                    authorRaw: topOpen.authorDisplayName,
                    text: topOpen.textDisplay,
                    likes: topOpen.likeCount,
                    publishedAt: topOpen.publishedAt,
                    replyCount: item.snippet.totalReplyCount
                };
            });
        } catch (error) {
            console.error('YouTube Fetch Comments Error:', error);
            throw error;
        }
    },

    addComment: async (tokenData, videoId, text) => {
        try {
            const youtube = youtubeService.getClient(tokenData);
            const res = await youtube.commentThreads.insert({
                part: 'snippet',
                requestBody: {
                    snippet: {
                        videoId: videoId,
                        topLevelComment: {
                            snippet: {
                                textOriginal: text
                            }
                        }
                    }
                }
            });
            return res.data;
        } catch (error) {
            console.error('YouTube Add Comment Error:', error);
            throw error;
        }
    },

    replyToComment: async (tokenData, parentId, text) => {
        try {
            const youtube = youtubeService.getClient(tokenData);
            const res = await youtube.comments.insert({
                part: 'snippet',
                requestBody: {
                    snippet: {
                        parentId: parentId,
                        textOriginal: text
                    }
                }
            });
            return res.data;
        } catch (error) {
            console.error('YouTube Reply Error:', error);
            throw error;
        }
    }
};

module.exports = youtubeService;
