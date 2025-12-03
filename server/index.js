const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { sequelize, Repository, Deck, setupFTS } = require('./db');
const { Op, QueryTypes } = require('sequelize');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const FEEDBACK_FILE = path.join(__dirname, '..', 'feedback.json');
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const TEMP_DIR = path.join(SCREENSHOTS_DIR, 'temp');

// Ensure directories exist
if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Initial Data for Seeding
const INITIAL_REPOSITORIES = [
    {
        id: 'go-programming',
        title: 'Go Programming',
        decks: [
            {
                id: 'concurrency',
                title: 'Mastering Concurrency',
                description: 'The complete guide to Goroutines, Channels, Select, and Sync patterns.',
                icon: 'Layers',
                color: 'blue'
            },
            {
                id: 'goroutines',
                title: 'Goroutines Deep Dive',
                description: 'Under the hood: Scheduler, Stack Management, and Context Switching.',
                icon: 'Cpu',
                color: 'purple'
            },
            {
                id: 'interview',
                title: 'Interview Prep',
                description: 'Pointers, Interfaces, Methods, and Type Safety.',
                icon: 'Sparkles',
                color: 'green'
            },
            {
                id: 'concurrency-interview',
                title: 'Concurrency QA',
                description: 'Goroutines, Channels, Sync, and Context.',
                icon: 'Zap',
                color: 'orange'
            },
            {
                id: 'concurrency-guide',
                title: 'Concurrency Masterclass',
                description: 'The complete guide: From Basics to Advanced Patterns & Tools.',
                icon: 'Zap',
                color: 'orange'
            },
            {
                id: 'hindi-concurrency',
                title: 'Go Concurrency (हिंदी)',
                description: 'Goroutines, Channels, और GMP Scheduler हिंदी में।',
                icon: 'Layers',
                color: 'red'
            },
            {
                id: 'anime-golang',
                title: 'Anime Golang Character',
                description: 'Learn concurrency with a cute Anime Gopher! 🐹✨',
                icon: 'Sparkles',
                color: 'pink',
                slides: [
                    {
                        type: "TitleSlide",
                        title: "Concurrency in <span class='text-transparent bg-clip-text bg-gradient-to-r from-[#00ADD8] to-teal-400'>Golang</span>",
                        subtitle: "Explained by Anime Gopher",
                        author: "Your Name",
                        role: "Gopher Enthusiast",
                        theme: "anime"
                    },
                    {
                        type: "ContentSlide",
                        title: "Why Concurrency?",
                        content: [
                            "Concurrency is not parallelism.",
                            "It's about dealing with lots of things at once.",
                            "Go makes it easy with Goroutines and Channels."
                        ],
                        theme: "anime"
                    },
                    {
                        type: "CodeSlide",
                        title: "Just add <span class='text-pink-400 font-mono bg-pink-400/10 px-2 py-1 rounded'>go</span>!",
                        description: "It spins up a lightweight thread managed by the Go Runtime.",
                        code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n  // The \"go\" keyword starts a goroutine\n  go func() {\n    fmt.Println(\"Anime Gopher says hi!\")\n  }()\n\n  fmt.Println(\"Main function continues...\")\n}",
                        language: "go",
                        theme: "anime"
                    }
                ]
            }
        ]
    },
    {
        id: 'microservices',
        title: 'Microservices',
        decks: [
            {
                id: 'load-balancer',
                title: 'Load Balancer',
                description: 'In-depth Explained: Algorithms, Health Checks, and Failover.',
                icon: 'Network',
                color: 'cyan'
            }
        ]
    },
    {
        id: 'mental-health',
        title: 'Mental Health',
        decks: [
            {
                id: 'genz-mental-health',
                title: 'Gen-Z Mental Health',
                description: 'The Vibe Check: Burnout, Boundaries, and Communication.',
                icon: 'Heart',
                color: 'pink'
            }
        ]
    }
];

// Initialize Database
const initializeDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced');

        // Setup FTS
        await setupFTS();

        const repoCount = await Repository.count();
        if (repoCount === 0) {
            console.log('Seeding database...');
            for (const repoData of INITIAL_REPOSITORIES) {
                const repo = await Repository.create({
                    id: repoData.id,
                    title: repoData.title
                });

                for (const deckData of repoData.decks) {
                    await Deck.create({
                        ...deckData,
                        RepositoryId: repo.id
                    });
                }
            }
            console.log('Database seeded successfully');
        }
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
};

initializeDatabase();

// --- API Endpoints ---

// Get all repositories with their decks (Optimized for initial load)
// Supports pagination and search
app.get('/api/decks', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        let rows = [];
        let count = 0;

        if (search) {
            // Use FTS5 for search
            // 1. Get IDs from FTS
            const ftsResults = await sequelize.query(
                `SELECT id FROM decks_fts WHERE decks_fts MATCH :search ORDER BY rank LIMIT :limit OFFSET :offset`,
                {
                    replacements: { search: `"${search}"*`, limit: parseInt(limit), offset: parseInt(offset) },
                    type: QueryTypes.SELECT
                }
            );

            const ftsCount = await sequelize.query(
                `SELECT count(*) as count FROM decks_fts WHERE decks_fts MATCH :search`,
                {
                    replacements: { search: `"${search}"*` },
                    type: QueryTypes.SELECT
                }
            );

            count = ftsCount[0].count;
            const ids = ftsResults.map(r => r.id);

            if (ids.length > 0) {
                // 2. Fetch full objects
                rows = await Deck.findAll({
                    where: { id: ids },
                    include: [{ model: Repository }]
                });

                // Maintain FTS rank order
                rows.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
            }

        } else {
            // Standard pagination
            const result = await Deck.findAndCountAll({
                include: [{ model: Repository }],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['title', 'ASC']]
            });
            rows = result.rows;
            count = result.count;
        }

        const grouped = {};
        rows.forEach(deck => {
            if (!grouped[deck.Repository.id]) {
                grouped[deck.Repository.id] = {
                    id: deck.Repository.id,
                    title: deck.Repository.title,
                    decks: []
                };
            }
            grouped[deck.Repository.id].decks.push({
                id: deck.id,
                title: deck.title,
                description: deck.description,
                icon: deck.icon,
                color: deck.color
            });
        });

        const repositories = Object.values(grouped);

        res.json({
            repositories,
            total: count,
            page: parseInt(page),
            totalPages: Math.ceil(count / limit)
        });

    } catch (error) {
        console.error('Error fetching decks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single deck details
app.get('/api/decks/:id', async (req, res) => {
    try {
        const deck = await Deck.findByPk(req.params.id, {
            include: [Repository]
        });

        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }

        res.json(deck);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Existing Feedback Endpoints ---

// Helper to delete a file safely
const safeDeleteFile = (relativePath) => {
    if (!relativePath) return;
    // Prevent directory traversal
    const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(SCREENSHOTS_DIR, safePath);

    if (fs.existsSync(fullPath)) {
        try {
            fs.unlinkSync(fullPath);
            console.log(`Deleted file: ${safePath}`);

            // Optional: Try to remove empty parent directories (cleanup)
            const dir = path.dirname(fullPath);
            if (dir !== SCREENSHOTS_DIR && fs.readdirSync(dir).length === 0) {
                fs.rmdirSync(dir); // Only removes if empty
            }
        } catch (err) {
            console.error(`Failed to delete file ${safePath}:`, err);
        }
    }
};

// Cleanup screenshots for completed feedback
const cleanupScreenshots = () => {
    try {
        if (!fs.existsSync(FEEDBACK_FILE)) return;

        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
        const feedback = JSON.parse(fileContent);

        feedback.forEach(item => {
            if (item.status === 'completed') {
                if (item.screenshots && Array.isArray(item.screenshots)) {
                    item.screenshots.forEach(safeDeleteFile);
                } else if (item.screenshot) {
                    safeDeleteFile(item.screenshot);
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

// Configure multer for file uploads (Temporary storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR);
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

// Helper to move file to hashed directory
const moveFileToHashedStorage = (filename) => {
    // Create a hash of the filename to determine directory structure
    const hash = crypto.createHash('md5').update(filename).digest('hex');
    const dir1 = hash.substring(0, 2);
    const dir2 = hash.substring(2, 4);

    const targetDir = path.join(SCREENSHOTS_DIR, dir1, dir2);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const sourcePath = path.join(TEMP_DIR, filename);
    const targetPath = path.join(targetDir, filename);

    fs.renameSync(sourcePath, targetPath);

    // Return relative path for storage
    return path.join(dir1, dir2, filename).replace(/\\/g, '/');
};

app.post('/api/feedback', upload.array('screenshots', 10), (req, res) => {
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

        // Process uploaded files
        if (req.files && req.files.length > 0) {
            newFeedback.screenshots = req.files.map(f => moveFileToHashedStorage(f.filename));
        }

        feedback.push(newFeedback);

        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

        console.log(`Feedback received for ${deckId} slide ${slideIndex}: ${instruction} (${req.files ? req.files.length : 0} screenshots)`);
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

// Serve screenshot images (supports nested paths)
app.get('/api/screenshots/*', (req, res) => {
    // req.params[0] contains the wildcard match (e.g. "ab/cd/image.png")
    const relativePath = req.params[0];

    // Security check: prevent directory traversal
    const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
    const filepath = path.join(SCREENSHOTS_DIR, safePath);

    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).json({ error: 'Screenshot not found' });
    }
});

app.delete('/api/feedback/:id', (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf8');
        let feedback = JSON.parse(fileContent);

        const itemIndex = feedback.findIndex(f => f.id === id);
        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        const item = feedback[itemIndex];

        if (item.screenshots && Array.isArray(item.screenshots)) {
            item.screenshots.forEach(safeDeleteFile);
        } else if (item.screenshot) {
            safeDeleteFile(item.screenshot);
        }

        // Remove from array
        feedback.splice(itemIndex, 1);

        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
        console.log(`Deleted feedback ${id}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});

app.delete('/api/feedback/:deckId/:slideIndex', (req, res) => {
    const { deckId, slideIndex } = req.params;
    const index = parseInt(slideIndex);

    try {
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

        // Delete screenshots for all items
        itemsToDelete.forEach(item => {
            if (item.screenshots && Array.isArray(item.screenshots)) {
                item.screenshots.forEach(safeDeleteFile);
            } else if (item.screenshot) {
                safeDeleteFile(item.screenshot);
            }
        });

        // Filter out deleted items
        feedback = feedback.filter(f =>
            !(f.deckId === deckId && f.slideIndex === index && f.status === 'pending')
        );

        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
        console.log(`Deleted ${itemsToDelete.length} pending feedback entries for ${deckId} slide ${index}`);
        res.json({ success: true, count: itemsToDelete.length });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

