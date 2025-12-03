const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

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

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SCREENSHOTS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
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

app.post('/api/feedback', upload.single('screenshot'), (req, res) => {
    const { deckId, slideIndex, instruction } = req.body;

    if (!deckId || slideIndex === undefined || !instruction) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
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

        // Add screenshot path if file was uploaded
        if (req.file) {
            newFeedback.screenshot = req.file.filename;
        }

        feedback.push(newFeedback);

        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

        console.log(`Feedback received for ${deckId} slide ${slideIndex}: ${instruction}${req.file ? ' (with screenshot)' : ''}`);
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

app.get('/api/feedback', (req, res) => {
    try {
        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
        const feedback = JSON.parse(fileContent);
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read feedback' });
    }
});

// Serve screenshot images
app.get('/api/screenshots/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(SCREENSHOTS_DIR, filename);

    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).json({ error: 'Screenshot not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

