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

        // Simulate API calls for each platform
        for (const platform of platforms) {
            try {
                console.log(`[Scheduler] 📡 Publishing to ${platform.toUpperCase()}...`);

                // MOCK DELAY: Simulate network request (1-2 seconds)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // IN FUTURE: Add real API calls here
                // if (platform === 'linkedin') await linkedinApi.post(...)

                if (post.mediaPath) {
                    console.log(`[Scheduler] 📎 Uploading media: ${post.mediaPath} (${post.mediaType})`);
                }

                console.log(`[Scheduler] ✅ Published to ${platform.toUpperCase()} successfully.`);
                results.push({ platform, status: 'success' });
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
