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

        if (feedback.length > 30) {
            const count = feedback.length - 30;
            feedback = feedback.slice(-30);
            fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
            console.log(`Removed ${count} old feedback entries`);
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
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

app.post('/api/feedback', upload.array('screenshots', 10), catchAsync(async (req, res, next) => {
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
    if (req.files && req.files.length > 0) {
        newFeedback.screenshots = req.files.map(f => f.filename);
    }

    feedback.push(newFeedback);

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

    console.log(`Feedback received for ${deckId} slide ${slideIndex}: ${instruction} (${req.files ? req.files.length : 0} screenshots)`);
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





// Initialize metadata schema on server start
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

