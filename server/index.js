const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const AppError = require('./utils/AppError');
const catchAsync = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');

const metadataManager = require('./utils/metadata');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const FEEDBACK_FILE = path.join(__dirname, '..', 'feedback.json');
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

// Ensure feedback file exists
if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2));
}

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
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

// Run cleanup on startup
cleanupScreenshots();
cleanupFeedback();

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
        if (file.originalname.match(/\.(js|jsx|css|json|md)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Only .js, .jsx, .css, .json, and .md files are allowed'));
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
    try {
        for (const file of req.files) {
            const destPath = path.join(deckDir, file.originalname);
            // Remove the timestamp prefix if we want original names, or just use originalName since multer saves with unique name in temp
            // We want the original name in the target dir
            // Wait, Multer filename function above sets the name in temp. 
            // file.originalname is the original name.
            // But if users upload Slide1.jsx, we want Slide1.jsx in the destination.

            // Note: req.files contains the file info including 'path' (the temp path)
            const targetPath = path.join(deckDir, file.originalname); // Use original name
            fs.renameSync(file.path, targetPath);
            importedFiles.push(file.originalname);
        }
    } catch (err) {
        // Cleanup on error could go here
        return next(new AppError('Failed to save files', 500));
    }

    // Generate deck.js
    const slideFiles = importedFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    // Sort slides: By default alphabetical, or maybe try to parse numbers?
    // Let's rely on alphabetical for now, users usually number them like 01_Title.jsx.
    slideFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    const imports = slideFiles.map(f => `import ${path.parse(f).name} from './${f}';`).join('\n');
    const exports = `export default [\n    ${slideFiles.map(f => path.parse(f).name).join(',\n    ')}\n];`;

    const deckJsContent = `${imports}\n\n${exports}\n`;
    fs.writeFileSync(path.join(deckDir, 'deck.js'), deckJsContent);


    // Update deck-index.json
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
        repoTitle: 'Imported Decks', // Default if not found? Or look it up.
        // Actually the repoTitle comes from the Repo ID usually, but here we can just set it or leave it.
        // The frontend groups by repoId mainly.
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
try {
    metadataManager.migrateMetadataSchema();
    console.log('Metadata schema initialized');
} catch (error) {
    console.error('Failed to initialize metadata schema:', error.message);
}


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

