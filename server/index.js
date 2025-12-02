const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const FEEDBACK_FILE = path.join(__dirname, '..', 'feedback.json');

// Ensure feedback file exists
if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2));
}

app.post('/api/feedback', (req, res) => {
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
            slideIndex,
            instruction,
            status: 'pending'
        };

        feedback.push(newFeedback);

        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

        console.log(`Feedback received for ${deckId} slide ${slideIndex}: ${instruction}`);
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
