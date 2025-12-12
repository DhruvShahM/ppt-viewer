const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const AppError = require('./utils/AppError');
const catchAsync = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');

const metadataManager = require('./utils/metadata');
const scheduler = require('./services/scheduler');
const videoRenderer = require('./services/video-renderer');
const authService = require('./services/auth-service');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 3001;

// Trigger restart 2



// Load secrets from local files (if any)
require('./utils/secrets-loader')();

app.use(cors());
app.use(express.json());

const FEEDBACK_FILE = path.join(__dirname, '..', 'feedback.json');
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const DECKS_DIR = path.join(__dirname, '..', 'src', 'decks');

// Ensure feedback file exists
if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2));
}

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const RENDERS_DIR = path.join(__dirname, 'renders');
if (!fs.existsSync(RENDERS_DIR)) {
    fs.mkdirSync(RENDERS_DIR, { recursive: true });
}



// Cleanup screenshots for completed feedback
const cleanupScreenshots = () => {
    try {
        if (!fs.existsSync(FEEDBACK_FILE)) return;

        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
        const feedback = JSON.parse(fileContent);

        feedback.forEach(item => {
            if (item.status === 'completed') {
                const deleteFile = (filename) => {
                    const screenshotPath = path.join(SCREENSHOTS_DIR, filename);
                    if (fs.existsSync(screenshotPath)) {
                        try {
                            fs.unlinkSync(screenshotPath);
                            console.log(`Deleted screenshot for completed feedback ${item.id}: ${filename}`);
                        } catch (err) {
                            console.error(`Failed to delete screenshot ${filename}:`, err);
                        }
                    }
                };

                if (item.screenshots && Array.isArray(item.screenshots)) {
                    item.screenshots.forEach(deleteFile);
                }

                if (item.videos && Array.isArray(item.videos)) {
                    item.videos.forEach(deleteFile);
                } else if (item.screenshot) {
                    deleteFile(item.screenshot);
                }
            }
        });
    } catch (error) {
        // Ignore errors during cleanup
    }
};

// Cleanup old feedback entries (keep last 30)
const cleanupFeedback = () => {
    try {
        if (!fs.existsSync(FEEDBACK_FILE)) return;

        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
        let feedback = JSON.parse(fileContent);

        // Separate pending and completed
        const pending = feedback.filter(f => f.status === 'pending');
        const completed = feedback.filter(f => f.status !== 'pending');

        // Keep last 50 completed items
        const MAX_HISTORY = 50;

        if (completed.length > MAX_HISTORY) {
            const count = completed.length - MAX_HISTORY;
            const keptCompleted = completed.slice(-MAX_HISTORY);

            // Recombine and sort by ID (which is timestamp) to maintain order
            feedback = [...pending, ...keptCompleted].sort((a, b) => a.id - b.id);

            fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
            console.log(`Removed ${count} old completed feedback entries`);
        }
    } catch (error) {
        console.error('Error cleaning up feedback:', error);
    }
};

// Watch for changes in feedback file to trigger cleanup
fs.watchFile(FEEDBACK_FILE, { interval: 2000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        cleanupScreenshots();
    }
});

// Cleanup old renders (older than 8 days)
const cleanupRenders = () => {
    try {
        if (!fs.existsSync(RENDERS_DIR)) return;

        const files = fs.readdirSync(RENDERS_DIR);
        const MAX_AGE_MS = 8 * 24 * 60 * 60 * 1000; // 8 days
        const now = Date.now();

        files.forEach(file => {
            const filePath = path.join(RENDERS_DIR, file);
            const stats = fs.statSync(filePath);

            // strict 8-day retention from creation time (birthtime)
            const creationTime = stats.birthtimeMs || stats.mtimeMs;

            if (now - creationTime > MAX_AGE_MS) {
                try {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted expired render (older than 8 days): ${file}`);
                } catch (err) {
                    console.error(`Failed to delete expired render ${file}:`, err);
                }
            }
        });
    } catch (error) {
        console.error('Error cleaning up renders:', error);
    }
};

// Run cleanup on startup
cleanupScreenshots();
cleanupFeedback();
cleanupRenders();

// Schedule daily cleanup check
setInterval(cleanupRenders, 24 * 60 * 60 * 1000);

// Initialize Scheduler (Catch-Up Strategy)
scheduler.init();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SCREENSHOTS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed'));
        }
    }
});

app.post('/api/feedback', upload.fields([{ name: 'screenshots', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), catchAsync(async (req, res, next) => {
    const { deckId, slideIndex, instruction } = req.body;

    if (!deckId || slideIndex === undefined || !instruction) {
        return next(new AppError('Missing required fields', 400));
    }

    const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    const feedback = JSON.parse(fileContent);

    const newFeedback = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        deckId,
        slideIndex: parseInt(slideIndex),
        instruction,
        status: 'pending'
    };

    // Add screenshot paths if files were uploaded
    if (req.files && req.files['screenshots']) {
        newFeedback.screenshots = req.files['screenshots'].map(f => f.filename);
    }

    // Add video paths if videos were uploaded
    if (req.files && req.files['videos']) {
        newFeedback.videos = req.files['videos'].map(f => f.filename);
    }

    feedback.push(newFeedback);

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

    const sCount = req.files && req.files['screenshots'] ? req.files['screenshots'].length : 0;
    const vCount = req.files && req.files['videos'] ? req.files['videos'].length : 0;
    console.log(`Feedback received for ${deckId} slide ${slideIndex}: ${instruction} (${sCount} screenshots, ${vCount} videos)`);
    res.status(201).json(newFeedback);
}));

// --- Social Scheduling APIs ---

app.get('/api/social/accounts', (req, res) => {
    // Return list of connected accounts so generic UI can use it
    const socialDataService = require('./services/social-data-service');
    socialDataService.getConnectedAccounts().then(accounts => {
        res.json(accounts);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/api/auth/token/:platform', catchAsync(async (req, res, next) => {
    const { platform } = req.params;
    const socialDataService = require('./services/social-data-service');
    const token = await socialDataService.getAccessToken(platform);

    if (token) {
        res.json({ token, success: true });
    } else {
        // 401 indicates "Unauthorized" / "No Token" -> Frontend triggers fallback
        res.status(401).json({ success: false, error: 'No valid token available' });
    }
}));


// --- Real Authentication Routes ---

app.get('/api/auth/:platform', (req, res) => {
    const { platform } = req.params;
    const { simulated } = req.query;

    if (simulated === 'true') {
        const mockCode = 'mock_auth_code_' + Date.now();
        return res.redirect(`/api/auth/${platform}/callback?code=${mockCode}&simulated=true`);
    }

    let url;

    try {
        if (platform === 'linkedin') url = authService.getLinkedinAuthUrl();
        else if (platform === 'youtube' || platform === 'google') url = authService.getGoogleAuthUrl();
        else if (platform === 'facebook' || platform === 'instagram') url = authService.getFacebookAuthUrl(); // Instagram Business via Facebook
        else if (platform === 'reddit') url = authService.getRedditAuthUrl();
        // else if (platform === 'twitter') url = authService.getTwitterAuthUrl();
        else return res.status(400).send('Platform not supported for real auth');

        res.redirect(url);
    } catch (e) {
        console.error("Auth URL generation failed:", e);
        res.status(500).send("Failed to generate auth URL. Check server logs/keys.");
    }
});

app.get('/api/auth/:platform/callback', async (req, res) => {
    const { platform } = req.params;
    const { code, simulated } = req.query;

    try {
        let userData;
        if (simulated === 'true') {
            userData = authService.handleSimulatedCallback(platform);
        } else {
            if (platform === 'linkedin') userData = await authService.handleLinkedinCallback(code);
            else if (platform === 'youtube' || platform === 'google') userData = await authService.handleGoogleCallback(code);
            else if (platform === 'facebook' || platform === 'instagram') userData = await authService.handleFacebookCallback(code);
            else if (platform === 'reddit') userData = await authService.handleRedditCallback(code);
        }

        // Return a script that sends the data back to the main window and closes the popup
        res.send(`
            <html>
                <body>
                    <h1>Connected!</h1>
                    <p>You have successfully connected ${platform}. Closing...</p>
                    <script>
                        window.opener.postMessage({ type: 'SOCIAL_AUTH_SUCCESS', platform: '${platform}', user: ${JSON.stringify(userData)} }, '*');
                        window.close();
                    </script>
                </body>
            </html>
        `);
    } catch (e) {
        console.error("Auth Callback failed:", e);
        res.status(500).send(`Authentication failed: ${e.message}`);
    }
});

app.post('/api/upload-media', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
        success: true,
        url: `/api/screenshots/${req.file.filename}`,
        filename: req.file.filename
    });
});


app.get('/api/social/queue', (req, res) => {
    const queue = scheduler.getQueue();
    // Sort: Pending first (by date), then others (by date desc)
    queue.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;

        if (a.status === 'pending') {
            return new Date(a.scheduledTime) - new Date(b.scheduledTime); // Earliest first
        } else {
            return new Date(b.scheduledTime) - new Date(a.scheduledTime); // Newest first
        }
    });
    res.json(queue);
});

app.post('/api/social/schedule', catchAsync(async (req, res, next) => {
    // req.body should have: slideId, deckId, caption, platforms, scheduledTime
    const result = scheduler.schedulePost(req.body);
    res.status(201).json(result);
}));

app.delete('/api/social/queue/:id', (req, res) => {
    const success = scheduler.deletePost(req.params.id);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.post('/api/social/run-catchup', (req, res) => {
    scheduler.checkQueue();
    res.json({ success: true, message: 'Catch-up triggered' });
});

app.post('/api/render-video', catchAsync(async (req, res, next) => {
    const { deckId, slideIndex, duration, width, height } = req.body;

    if (!deckId || slideIndex === undefined || !duration) {
        return next(new AppError('Missing required fields', 400));
    }

    const filename = `render-${deckId}-${slideIndex}-${Date.now()}.mp4`;
    const outputPath = path.join(RENDERS_DIR, filename);

    try {
        await videoRenderer.renderSlide({
            deckId,
            slideIndex,
            duration: duration || 10,
            width: width || 1920,
            height: height || 1080,
            outputPath
        });

        res.json({
            success: true,
            url: `/api/renders/${filename}`
        });
    } catch (error) {
        console.error("Video render failed", error);
        return next(new AppError('Video render failed: ' + error.message, 500));
    }
}));

app.get('/api/renders/:filename', (req, res, next) => {
    const filename = req.params.filename;
    const filepath = path.join(RENDERS_DIR, filename);

    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        next(new AppError('Render not found', 404));
    }
});

// ------------------------------

app.get('/api/feedback', catchAsync(async (req, res, next) => {
    const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    const feedback = JSON.parse(fileContent);
    res.json(feedback);
}));

// Serve screenshot images
app.get('/api/screenshots/:filename', (req, res, next) => {
    const filename = req.params.filename;
    const filepath = path.join(SCREENSHOTS_DIR, filename);

    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        next(new AppError('Screenshot not found', 404));
    }
});

app.delete('/api/feedback/:id', catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    let feedback = JSON.parse(fileContent);

    const itemIndex = feedback.findIndex(f => f.id === id);
    if (itemIndex === -1) {
        return next(new AppError('Feedback not found', 404));
    }

    const item = feedback[itemIndex];

    // Delete screenshots
    const deleteFile = (filename) => {
        const screenshotPath = path.join(SCREENSHOTS_DIR, filename);
        if (fs.existsSync(screenshotPath)) {
            try {
                fs.unlinkSync(screenshotPath);
                console.log(`Deleted screenshot for feedback ${id}: ${filename}`);
            } catch (err) {
                console.error(`Failed to delete screenshot ${filename}:`, err);
            }
        }
    };

    if (item.screenshots && Array.isArray(item.screenshots)) {
        item.screenshots.forEach(deleteFile);
    }

    if (item.videos && Array.isArray(item.videos)) {
        item.videos.forEach(deleteFile);
    } else if (item.screenshot) {
        deleteFile(item.screenshot);
    }

    // Remove from array
    feedback.splice(itemIndex, 1);

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
    console.log(`Deleted feedback ${id}`);
    res.json({ success: true });
}));

app.delete('/api/feedback/:deckId/:slideIndex', catchAsync(async (req, res, next) => {
    const { deckId, slideIndex } = req.params;
    const index = parseInt(slideIndex);

    const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    let feedback = JSON.parse(fileContent);

    // Find items to delete
    const itemsToDelete = feedback.filter(f =>
        f.deckId === deckId &&
        f.slideIndex === index &&
        f.status === 'pending'
    );

    if (itemsToDelete.length === 0) {
        return res.json({ success: true, count: 0 });
    }

    // Helper to delete screenshots
    const deleteFile = (filename) => {
        const screenshotPath = path.join(SCREENSHOTS_DIR, filename);
        if (fs.existsSync(screenshotPath)) {
            try {
                fs.unlinkSync(screenshotPath);
                console.log(`Deleted screenshot: ${filename}`);
            } catch (err) {
                console.error(`Failed to delete screenshot ${filename}:`, err);
            }
        }
    };

    // Delete screenshots for all items
    itemsToDelete.forEach(item => {
        if (item.screenshots && Array.isArray(item.screenshots)) {
            item.screenshots.forEach(deleteFile);
        }

        if (item.videos && Array.isArray(item.videos)) {
            item.videos.forEach(deleteFile);
        } else if (item.screenshot) {
            deleteFile(item.screenshot);
        }
    });

    // Filter out deleted items
    feedback = feedback.filter(f =>
        !(f.deckId === deckId && f.slideIndex === index && f.status === 'pending')
    );

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
    console.log(`Deleted ${itemsToDelete.length} pending feedback entries for ${deckId} slide ${index}`);
    res.json({ success: true, count: itemsToDelete.length });
}));

const { exec } = require('child_process');



app.post('/api/delete', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds', 400));
    }

    console.log(`Deleting decks: ${deckIds.join(', ')}`);

    const runDelete = async () => {
        try {
            for (const id of deckIds) {
                await new Promise((resolve, reject) => {
                    exec(`node scripts/delete-deck.js ${id}`, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error deleting ${id}:`, error);
                        } else {
                            console.log(`Deleted ${id}:`, stdout);
                        }
                        resolve();
                    });
                });
            }
            res.json({ success: true });
        } catch (error) {
            console.error('Delete process failed:', error);
            return next(new AppError('Delete process failed', 500));
        }
    };

    runDelete();
}));

app.post('/api/archive', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds', 400));
    }

    console.log(`Archiving decks: ${deckIds.join(', ')}`);

    const runArchive = async () => {
        try {
            await new Promise((resolve, reject) => {
                exec(`node scripts/archive-restore-deck.js archive ${deckIds.join(',')}`, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error archiving:`, error);
                        console.error(stderr);
                    } else {
                        console.log(`Archive output:`, stdout);
                    }
                    resolve();
                });
            });
            res.json({ success: true });
        } catch (error) {
            console.error('Archive process failed:', error);
            return next(new AppError('Archive process failed', 500));
        }
    };

    runArchive();
}));

app.post('/api/restore', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds', 400));
    }

    console.log(`Restoring decks: ${deckIds.join(', ')}`);

    const runRestore = async () => {
        try {
            await new Promise((resolve, reject) => {
                exec(`node scripts/archive-restore-deck.js restore ${deckIds.join(',')}`, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error restoring:`, error);
                        console.error(stderr);
                    } else {
                        console.log(`Restore output:`, stdout);
                    }
                    resolve();
                });
            });
            res.json({ success: true });
        } catch (error) {
            console.error('Restore process failed:', error);
            return next(new AppError('Restore process failed', 500));
        }
    };

    runRestore();
}));





// --- Config Management ---
app.get('/api/config/keys', (req, res) => {
    // Return the keys that are relevant
    const keys = {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '••••••••' : '',
        LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || '',
        LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET ? '••••••••' : '',
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET ? '••••••••' : '',
        REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID || '',
        REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET ? '••••••••' : '',
    };
    res.json(keys);
});

app.post('/api/config/keys', catchAsync(async (req, res, next) => {
    const newKeys = req.body; // { GOOGLE_CLIENT_ID: '...', ... }

    // 1. Update process.env for immediate effect
    Object.keys(newKeys).forEach(key => {
        if (newKeys[key]) {
            process.env[key] = newKeys[key];
        }
    });

    // 2. Persist to .env file
    const envPath = path.join(__dirname, '..', '.env');
    let envContent = '';

    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    Object.keys(newKeys).forEach(key => {
        const value = newKeys[key];
        // If not empty, update
        if (value) {
            const regex = new RegExp(`^${key}=.*$`, 'm');
            if (regex.test(envContent)) {
                envContent = envContent.replace(regex, `${key}=${value}`);
            } else {
                envContent += `\n${key}=${value}`;
            }
        }
    });

    fs.writeFileSync(envPath, envContent.trim() + '\n');

    console.log('Updated .env file and process.env');
    res.json({ success: true });
}));


// Configure multer for code uploads
const codeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = path.join(__dirname, 'temp_uploads');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const codeUpload = multer({
    storage: codeStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
    fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(js|jsx|css|json|md|zip)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Only .js, .jsx, .css, .json, .md, and .zip files are allowed'));
        }
    }
});

app.post('/api/import-deck', codeUpload.array('files'), catchAsync(async (req, res, next) => {
    const { deckId, title, description, repoId } = req.body;

    if (!deckId || !title || !req.files || req.files.length === 0) {
        return next(new AppError('Missing required fields or files', 400));
    }

    const deckDir = path.join(__dirname, '..', 'src', 'decks', deckId);

    // Check if deck already exists
    if (fs.existsSync(deckDir)) {
        return next(new AppError('Deck with this ID already exists', 409));
    }

    // Create deck directory
    try {
        fs.mkdirSync(deckDir, { recursive: true });
    } catch (err) {
        return next(new AppError('Failed to create deck directory', 500));
    }

    // Move files to deck directory
    const importedFiles = [];
    const AdmZip = require('adm-zip');

    try {
        for (const file of req.files) {
            if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed' || file.originalname.endsWith('.zip')) {
                // Handle Zip File
                try {
                    const zip = new AdmZip(file.path);
                    const zipEntries = zip.getEntries();

                    zipEntries.forEach(entry => {
                        if (!entry.isDirectory && (entry.entryName.endsWith('.jsx') || entry.entryName.endsWith('.js'))) {
                            // Extract to deck directory, flattening the path (taking only filename)
                            const fileName = path.basename(entry.entryName);
                            // Avoid hidden files
                            if (fileName.startsWith('.')) return;

                            const targetPath = path.join(deckDir, fileName);

                            // Check if file is inside a __MACOSX folder or similar junk
                            if (!entry.entryName.includes('__MACOSX')) {
                                fs.writeFileSync(targetPath, entry.getData());
                                importedFiles.push(fileName);
                            }
                        }
                    });

                    // Clean up temp zip file
                    try { fs.unlinkSync(file.path); } catch (e) { }

                } catch (zipErr) {
                    console.error("Error extracting zip:", zipErr);
                }

            } else {
                // Handle Regular File
                const targetPath = path.join(deckDir, file.originalname);
                fs.renameSync(file.path, targetPath);
                importedFiles.push(file.originalname);
            }
        }
    } catch (err) {
        console.error("Error processing files:", err);
        // Clean up deck dir on failure?
        return next(new AppError('Failed to save files', 500));
    }

    // Process Markdown files to extract slides
    const mdFiles = importedFiles.filter(f => f.endsWith('.md'));
    for (const mdFile of mdFiles) {
        try {
            const mdPath = path.join(deckDir, mdFile);
            const content = fs.readFileSync(mdPath, 'utf8');

            // Regex to find sections starting with ## Filename
            // This handles variations like:
            // ## Slide1.jsx
            // ## Slide 1
            // ... code code ...

            // Split by lines starting with ##
            const sections = content.split(/(?=^##\s+)/m);

            let extractedCount = 0;

            sections.forEach(section => {
                const trimmed = section.trim();
                if (!trimmed.startsWith('##')) return;

                // Get first line as filename
                const firstLineEnd = trimmed.indexOf('\n');
                if (firstLineEnd === -1) return;

                let filenameLine = trimmed.substring(2, firstLineEnd).trim(); // Remove ##

                // Extract code block
                const codeBlockRegex = /```(?:jsx|js|javascript|typescript|ts)?\s*([\s\S]*?)```/;
                const match = trimmed.match(codeBlockRegex);

                if (match && match[1]) {
                    let code = match[1].trim();
                    let filename = filenameLine;

                    // Sanitize filename
                    filename = filename.replace(/[^\w\d\-\.]/g, '_');
                    if (!filename.match(/\.(js|jsx)$/i)) {
                        filename += '.jsx';
                    }

                    // Write file
                    const targetPath = path.join(deckDir, filename);
                    fs.writeFileSync(targetPath, code);
                    importedFiles.push(filename);
                    extractedCount++;
                }
            });

            // Fallback: If no ## headers found or regular structure, try to find just code blocks
            if (extractedCount === 0) {
                const codeBlockRegexGlobal = /```(?:jsx|js|javascript|typescript|ts)?\s*([\s\S]*?)```/g;
                let match;
                let idx = 1;
                while ((match = codeBlockRegexGlobal.exec(content)) !== null) {
                    if (match[1]) {
                        const code = match[1].trim();
                        // Basic check if it looks like React/Slide code
                        if (code.includes('import') && code.includes('export default')) {
                            const filename = `Slide_${idx}.jsx`;
                            const targetPath = path.join(deckDir, filename);
                            fs.writeFileSync(targetPath, code);
                            importedFiles.push(filename);
                            extractedCount++;
                            idx++;
                        }
                    }
                }
            }

        } catch (err) {
            console.error(`Error processing markdown file ${mdFile}:`, err);
        }
    }

    if (importedFiles.length === 0) {
        // Clean up created directory if no files
        try { fs.rmdirSync(deckDir, { recursive: true }); } catch (e) { }
        return next(new AppError('No valid slide files found in upload', 400));
    }

    // Generate deck.js
    const slideFiles = importedFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    // Sort slides: Alphabetical
    slideFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    const imports = slideFiles.map(f => `import ${path.parse(f).name} from './${f}';`).join('\n');
    const exports = `export default [\n    ${slideFiles.map(f => path.parse(f).name).join(',\n    ')}\n];`;

    const deckJsContent = `${imports}\n\n${exports}\n`;
    fs.writeFileSync(path.join(deckDir, 'deck.js'), deckJsContent);


    // Update deck-index.json
    const DECK_INDEX_FILE = path.join(__dirname, '..', 'src', 'data', 'deck-index.json');
    let deckIndex = [];
    try {
        if (fs.existsSync(DECK_INDEX_FILE)) {
            deckIndex = JSON.parse(fs.readFileSync(DECK_INDEX_FILE, 'utf8'));
        }
    } catch (e) {
        console.error("Error reading deck index", e);
    }

    const newDeck = {
        id: deckId,
        title,
        repoId: repoId || 'uncategorized',
        repoTitle: 'Imported Decks',
        description: description || '',
        icon: 'Layers',
        color: 'blue',
        status: 'active',
        path: `src/decks/${deckId}`,
        version: 1,
        hasLargeAssets: false,
        importedAt: new Date().toISOString()
    };

    deckIndex.push(newDeck);
    fs.writeFileSync(DECK_INDEX_FILE, JSON.stringify(deckIndex, null, 2));

    console.log(`Deck imported successfully: ${deckId}`);
    res.status(201).json({ success: true, deck: newDeck });

}));

const archiver = require('archiver');

app.post('/api/export', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds', 400));
    }

    const DECK_INDEX_FILE = path.join(__dirname, '..', 'src', 'data', 'deck-index.json');
    let deckIndex = [];
    if (fs.existsSync(DECK_INDEX_FILE)) {
        deckIndex = JSON.parse(fs.readFileSync(DECK_INDEX_FILE, 'utf8'));
    }

    // Helper to generate markdown for a single deck
    const generateDeckMarkdown = (deckId) => {
        const deckInfo = deckIndex.find(d => d.id === deckId);
        const deckTitle = deckInfo ? deckInfo.title : deckId;
        const deckDir = path.join(__dirname, '..', 'src', 'decks', deckId);

        if (!fs.existsSync(deckDir)) {
            throw new Error(`Deck directory not found for ${deckId}`);
        }

        const files = fs.readdirSync(deckDir);
        const slideFiles = files.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
        slideFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        let markdownContent = `# ${deckTitle}\n\n`;

        slideFiles.forEach(file => {
            if (file === 'deck.js') return;
            const content = fs.readFileSync(path.join(deckDir, file), 'utf8');
            markdownContent += `## ${file}\n\n\`\`\`jsx\n${content}\n\`\`\`\n\n`;
        });

        return { filename: `${deckTitle}.md`, content: markdownContent };
    };

    if (deckIds.length === 1) {
        // Single File Download
        try {
            const { filename, content } = generateDeckMarkdown(deckIds[0]);
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', 'text/markdown');
            res.send(content);
        } catch (error) {
            return next(new AppError(`Export failed: ${error.message}`, 500));
        }
    } else {
        // Zip Download
        try {
            const archive = archiver('zip', {
                zlib: { level: 9 } // Sets the compression level.
            });

            res.setHeader('Content-Disposition', 'attachment; filename="decks-export.zip"');
            res.setHeader('Content-Type', 'application/zip');

            archive.pipe(res);

            for (const deckId of deckIds) {
                try {
                    const { filename, content } = generateDeckMarkdown(deckId);
                    archive.append(content, { name: filename });
                } catch (err) {
                    console.error(`Skipping deck ${deckId} due to error:`, err);
                    archive.append(`Error exporting deck ${deckId}: ${err.message}`, { name: `${deckId}-error.txt` });
                }
            }

            await archive.finalize();
        } catch (error) {
            return next(new AppError('Export zip failed', 500));
        }
    }
}));
try {
    metadataManager.migrateMetadataSchema();
    console.log('Metadata schema initialized');
} catch (error) {
    console.error('Failed to initialize metadata schema:', error.message);
}


const { generateFeedbackDoc } = require('./services/docx-generator.js');

app.post('/api/feedback/download-docx', catchAsync(async (req, res, next) => {
    const { deckId, deckIds } = req.body;

    const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    const feedback = JSON.parse(fileContent);
    let feedbackItems = [];

    if (deckIds && Array.isArray(deckIds) && deckIds.length > 0) {
        // Multi-deck selection
        feedbackItems = feedback.filter(f => deckIds.includes(f.deckId) && f.status === 'pending');
        if (feedbackItems.length === 0) {
            return next(new AppError('No pending feedback found for selected decks', 404));
        }
    } else if (deckId) {
        // Single deck - check for slide specificity
        if (req.body.slideIndex !== undefined) {
            const index = parseInt(req.body.slideIndex);
            feedbackItems = feedback.filter(f => f.deckId === deckId && f.slideIndex === index && f.status === 'pending');
            if (feedbackItems.length === 0) {
                return next(new AppError('No pending feedback found for this slide', 404));
            }
        } else {
            // Full deck
            feedbackItems = feedback.filter(f => f.deckId === deckId && f.status === 'pending');
            if (feedbackItems.length === 0) {
                return next(new AppError('No pending feedback found for this deck', 404));
            }
        }
    } else {
        // Global feedback

        feedbackItems = feedback.filter(f => f.status === 'pending');
        if (feedbackItems.length === 0) {
            return next(new AppError('No pending feedback found', 404));
        }
    }

    // Sort: If global, sort by deckId then slideIndex. If local, deckId is same so sort by slideIndex.
    feedbackItems.sort((a, b) => {
        if (a.deckId !== b.deckId) return a.deckId.localeCompare(b.deckId);
        if (a.slideIndex !== b.slideIndex) return a.slideIndex - b.slideIndex;
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

    try {
        const buffer = await generateFeedbackDoc(feedbackItems, DECKS_DIR, SCREENSHOTS_DIR);

        const filename = (deckId)
            ? `${deckId}-design-feedback-${Date.now()}.docx`
            : (deckIds && deckIds.length > 0)
                ? `selected-decks-feedback-${Date.now()}.docx`
                : `global-design-feedback-${Date.now()}.docx`;

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Length', buffer.length);

        res.send(buffer);
        console.log(`Generated DOCX for ${deckId || 'ALL DECKS'} with ${feedbackItems.length} items`);
    } catch (error) {
        console.error('Error generating DOCX:', error);
        return next(new AppError('Failed to generate DOCX file', 500));
    }
}));


app.patch('/api/decks/:deckId', catchAsync(async (req, res, next) => {
    const { deckId } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return next(new AppError('No updates provided', 400));
    }

    try {
        const updatedDeck = metadataManager.updateDeck(deckId, updates);
        res.json({ success: true, deck: updatedDeck });
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
}));

app.post('/api/repositories/rename', catchAsync(async (req, res, next) => {
    const { repoId, newTitle } = req.body;

    if (!repoId || !newTitle) {
        return next(new AppError('Missing repoId or newTitle', 400));
    }

    try {
        const metadata = metadataManager.readMetadata();
        let updatedCount = 0;

        // Update all decks in this repository
        metadata.forEach(deck => {
            if (deck.repoId === repoId) {
                deck.repoTitle = newTitle;
                updatedCount++;
            }
        });

        if (updatedCount > 0) {
            metadataManager.writeMetadata(metadata);
        }

        res.json({ success: true, count: updatedCount });
    } catch (error) {
        return next(new AppError('Failed to rename repository', 500));
    }
}));

app.post('/api/open-file', catchAsync(async (req, res, next) => {
    const { deckId, slideIndex } = req.body;

    if (!deckId || slideIndex === undefined) {
        return next(new AppError('Missing required fields', 400));
    }

    const deckDir = path.join(__dirname, '..', 'src', 'decks', deckId);

    if (!fs.existsSync(deckDir)) {
        return next(new AppError('Deck not found', 404));
    }

    const deckJsPath = path.join(deckDir, 'deck.js');
    let filepath;
    let filename;

    // Try parsing deck.js first to get accurate file path
    if (fs.existsSync(deckJsPath)) {
        try {
            const deckContent = fs.readFileSync(deckJsPath, 'utf8');
            const exportMatch = deckContent.match(/export\s+default\s*\[([\s\S]*?)\]/);

            if (exportMatch) {
                const exportBody = exportMatch[1];
                const cleanBody = exportBody.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
                const componentNames = cleanBody
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);

                if (slideIndex < componentNames.length) {
                    const componentName = componentNames[slideIndex];
                    const safeName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const importRegex = new RegExp(`import\\s+${safeName}\\s+from\\s+['"](.+)['"]`);
                    const importMatch = deckContent.match(importRegex);

                    if (importMatch) {
                        const importPath = importMatch[1];
                        // Resolve path relative to deckDir
                        let resolvedPath = path.resolve(deckDir, importPath);

                        // Attach extension if missing
                        if (!resolvedPath.match(/\.(js|jsx)$/)) {
                            if (fs.existsSync(resolvedPath + '.jsx')) {
                                resolvedPath += '.jsx';
                            } else if (fs.existsSync(resolvedPath + '.js')) {
                                resolvedPath += '.js';
                            }
                        }

                        // Verify existence
                        if (fs.existsSync(resolvedPath)) {
                            filepath = resolvedPath;
                            filename = path.basename(resolvedPath);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error parsing deck.js:', err);
        }
    }

    // Fallback: directory listing (original logic)
    if (!filepath) {
        console.warn('Falling back to directory listing for open-file');

        const files = fs.readdirSync(deckDir);
        const slideFiles = files.filter(f => (f.endsWith('.jsx') || f.endsWith('.js')) && f !== 'deck.js');
        slideFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        filename = slideFiles[slideIndex];

        if (!filename) {
            return next(new AppError('Slide file not found', 404));
        }

        filepath = path.join(deckDir, filename);
    }

    console.log(`Opening file: ${filepath}`);

    exec(`code "${filepath}"`, (error) => {
        if (error) {
            console.log('VSCode not found or failed, trying Notepad...');
            exec(`notepad "${filepath}"`, (err2) => {
                if (err2) {
                    console.error('Failed to open file in Notepad:', err2);
                    return next(new AppError('Failed to open file in any editor', 500));
                }
                res.json({ success: true, file: filename, method: 'notepad' });
            });
        } else {
            res.json({ success: true, file: filename, method: 'code' });
        }
    });
}));



// Apollo Server Setup
const startServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    // GraphQL Endpoint
    app.use('/graphql', cors(), express.json(), expressMiddleware(apolloServer));

    // Handle 404 for non-graphql routes
    app.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    app.use(globalErrorHandler);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
    });
};

startServer();


