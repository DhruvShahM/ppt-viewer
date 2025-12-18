import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const INPUT_FILE = path.join(PROJECT_ROOT, 'deck-content.json');

if (!fs.existsSync(INPUT_FILE)) {
    console.error('deck-content.json not found. Run extract_deck_content.js first.');
    process.exit(1);
}

const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
const deckData = JSON.parse(rawData);

// Parse arguments for style
const args = process.argv.slice(2);
let style = 'educational'; // default

args.forEach(arg => {
    if (arg.startsWith('--style=')) {
        style = arg.split('=')[1];
    }
});

// Templates
const templates = {
    educational: {
        role: "You are an expert educator creating a script for a technical YouTube tutorial.",
        instruction: "Create a clear, engaging, and in-depth voiceover script based on the following slides. content. Explain complex concepts simply.",
        format: "Section by section, corresponding to each slide."
    },
    promotional: {
        role: "You are a marketing professional creating a high-energy promo video.",
        instruction: "Create a punchy, exciting script that highlights the key benefits shown in these slides. Keep it fast-paced.",
        format: "Continuous narrative with high energy."
    },
    podcaster: {
        role: "You are a casual, friendly tech podcaster.",
        instruction: "Turn this presentation content into a natural-sounding conversation or monologue. Use rhetorical questions and personal insights.",
        format: "Conversational tone."
    }
};

const selectedTemplate = templates[style] || templates.educational;

let prompt = `${selectedTemplate.role}\n\n`;
prompt += `Task: ${selectedTemplate.instruction}\n`;
prompt += `Format: ${selectedTemplate.format}\n\n`;
prompt += `Here is the slide content:\n\n`;

deckData.slides.forEach(slide => {
    prompt += `--- Slide ${slide.slideNumber}: ${slide.title} ---\n`;
    prompt += `Visuals/Text: ${slide.rawText}\n`;

    // Optional: Include full code if it looks like there's code in the file
    // This is a heuristic; we can refine it. 
    // For now, let's include a snippet if we detected specific code markers in raw content earlier, 
    // or just rely on rawText which captured meaningful content.
    // Let's actually append the raw content for context, but truncated if too long?
    // No, full context is better for LLMs.

    prompt += `Raw Content Context:\n\`\`\`jsx\n${slide.fileContent}\n\`\`\`\n\n`;
});

prompt += `\nPlease generate the full script now.`;

console.log(prompt);
