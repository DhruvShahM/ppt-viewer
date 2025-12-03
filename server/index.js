import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// Setup HTTP Server and Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins for dev
        methods: ["GET", "POST", "PUT"]
    }
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Setup LowDB
const FEEDBACK_FILE = join(__dirname, '..', 'feedback.json');
const adapter = new JSONFile(FEEDBACK_FILE);
const defaultData = [];
const db = new Low(adapter, defaultData);

// Initialize DB
await db.read();
if (!db.data) {
    db.data = defaultData;
    await db.write();
}

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Routes
app.post('/api/feedback', async (req, res) => {
    const { deckId, slideIndex, instruction } = req.body;

    if (!deckId || slideIndex === undefined || !instruction) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await db.read();
        const newFeedback = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            deckId,
            slideIndex,
            instruction,
            image: req.body.image || null,
            type: req.body.type || 'design',
            status: 'pending'
        };

        db.data.push(newFeedback);
        await db.write();

        console.log(`Feedback received for ${deckId} slide ${slideIndex}: ${instruction}`);

        // Emit update to all clients
        io.emit('feedback_updated', db.data);

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

app.put('/api/feedback/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        await db.read();
        const index = db.data.findIndex(f => f.id.toString() === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        db.data[index] = { ...db.data[index], ...updates };
        await db.write();

        console.log(`Feedback updated for ${id}:`, updates);

        // Emit update to all clients
        io.emit('feedback_updated', db.data);

        res.json(db.data[index]);
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ error: 'Failed to update feedback' });
    }
});

app.get('/api/feedback', async (req, res) => {
    try {
        await db.read();
        res.json(db.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read feedback' });
    }
});

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
