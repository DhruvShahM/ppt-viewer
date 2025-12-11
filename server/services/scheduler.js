const fs = require('fs');
const path = require('path');

const QUEUE_FILE = path.join(__dirname, '..', '..', 'social_queue.json');

// Ensure queue file exists
if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2));
}

class SocialScheduler {
    constructor() {
        this.interval = null;
        this.isProcessing = false;
    }

    // Load queue from disk
    getQueue() {
        try {
            if (!fs.existsSync(QUEUE_FILE)) return [];
            const data = fs.readFileSync(QUEUE_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error reading social queue:", error);
            return [];
        }
    }

    // Save queue to disk
    saveQueue(queue) {
        try {
            fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
        } catch (error) {
            console.error("Error saving social queue:", error);
        }
    }

    // Add a new post
    schedulePost(postData) {
        const queue = this.getQueue();

        const newPost = {
            id: `post_${Date.now()}_${Math.round(Math.random() * 1000)}`,
            createdAt: new Date().toISOString(),
            status: 'pending',
            ...postData // captions, platforms, slideId, scheduledTime (ISO string)
        };

        // Validate scheduledTime
        if (!newPost.scheduledTime) {
            newPost.scheduledTime = new Date().toISOString(); // Default to now
        }

        queue.push(newPost);
        this.saveQueue(queue);

        console.log(`[Scheduler] New post scheduled for ${newPost.scheduledTime} on [${newPost.platforms.join(', ')}]`);

        // Trigger generic check in case it's immediate
        this.checkQueue();

        return newPost;
    }

    // Cancel/Delete
    deletePost(id) {
        let queue = this.getQueue();
        const initialLength = queue.length;
        queue = queue.filter(p => p.id !== id);

        if (queue.length !== initialLength) {
            this.saveQueue(queue);
            return true;
        }
        return false;
    }

    // The Core "Publisher" Logic
    async publish(post) {
        console.log(`[Scheduler] 🚀 STARTING PUBLISH for ${post.id}`);

        const results = [];
        const platforms = post.platforms || ['generic'];

        // Load tokens only once if needed, but we need fresh ones
        const tokenManager = require('./token-manager');
        const allTokens = tokenManager.loadTokens();

        // Helper to find token for a platform
        // This logic mimics social-data-service somewhat but needs to be robust
        const getTokensForPlatform = (platform) => {
            // 1. If post has specific accountId designated? (Not yet in format, but good for future)
            // 2. Filter all tokens for this platform that are ENABLED
            return Object.values(allTokens).filter(t => t.platform === platform && t.isEnabled !== false);
        };

        for (const platform of platforms) {
            try {
                console.log(`[Scheduler] 📡 Publishing to ${platform.toUpperCase()}...`);

                if (platform === 'youtube') {
                    const youtubeUploader = require('./youtube-uploader');
                    const tokens = getTokensForPlatform('youtube');

                    if (tokens.length === 0) {
                        throw new Error("No enabled YouTube accounts found");
                    }

                    // RESOLVE ABSOLUTE PATH
                    // If post.mediaPath starts with /api/screenshots/, it's in the screenshots dir
                    // If it starts with /api/renders/, it's in the renders dir
                    let absoluteMediaPath = post.mediaPath;
                    const path = require('path');

                    if (post.mediaPath && post.mediaPath.startsWith('/api/screenshots/')) {
                        const filename = post.mediaPath.replace('/api/screenshots/', '');
                        absoluteMediaPath = path.join(__dirname, '..', 'screenshots', filename);
                    } else if (post.mediaPath && post.mediaPath.startsWith('/api/renders/')) {
                        const filename = post.mediaPath.replace('/api/renders/', '');
                        absoluteMediaPath = path.join(__dirname, '..', 'renders', filename);
                    }

                    for (const token of tokens) {
                        console.log(`[Scheduler] 🎬 Uploading to YouTube Account: ${token.name}`);

                        // Check file existence before upload
                        const fs = require('fs');
                        if (!fs.existsSync(absoluteMediaPath)) {
                            throw new Error(`Video file not found at: ${absoluteMediaPath} (Original: ${post.mediaPath})`);
                        }

                        await youtubeUploader.uploadVideo(token, absoluteMediaPath, {
                            title: post.caption || 'New Video',
                            description: post.content || post.caption || '',
                            scheduledTime: post.scheduledTime
                        });
                        console.log(`[Scheduler] ✅ Published to YouTube (${token.name})`);
                    }

                    results.push({ platform, status: 'success' });

                } else {
                    // MOCK DELAY for other platforms
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    console.log(`[Scheduler] (Simulated) Published to ${platform.toUpperCase()} successfully.`);
                    results.push({ platform, status: 'success' });
                }

            } catch (err) {
                console.error(`[Scheduler] ❌ Failed to publish to ${platform}:`, err);
                results.push({ platform, status: 'failed', error: err.message });
            }
        }

        return results;
    }

    // Check for due posts
    async checkQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            const queue = this.getQueue();
            const now = new Date();
            let hasChanges = false;

            for (let i = 0; i < queue.length; i++) {
                const post = queue[i];

                if (post.status === 'pending') {
                    const scheduledTime = new Date(post.scheduledTime);

                    // IF scheduled time is in the past (Catch-Up Strategy)
                    if (scheduledTime <= now) {
                        console.log(`[Scheduler] Found due post: ${post.id} (Scheduled: ${post.scheduledTime})`);

                        // Update status to processing
                        post.status = 'processing';
                        // Save immediately so we don't double process if crash
                        this.saveQueue(queue);

                        // Perform publish
                        const results = await this.publish(post);

                        // Update final status
                        const allSuccess = results.every(r => r.status === 'success');
                        post.status = allSuccess ? 'published' : 'failed';
                        post.publishedAt = new Date().toISOString();
                        post.results = results;

                        hasChanges = true;
                    }
                }
            }

            if (hasChanges) {
                this.saveQueue(queue);
            }

        } catch (error) {
            console.error("[Scheduler] Error processing queue:", error);
        } finally {
            this.isProcessing = false;
        }
    }

    // Start various timers
    init() {
        console.log("[Scheduler] 🟢 Service Initialized");

        // 1. Immediate "Catch-Up" Check on Start
        console.log("[Scheduler] 🏃 Running Catch-Up Routine...");
        this.checkQueue();

        // 2. Regular Interval (Every 30 seconds)
        this.interval = setInterval(() => {
            this.checkQueue();
        }, 30000);
    }
}

module.exports = new SocialScheduler();
