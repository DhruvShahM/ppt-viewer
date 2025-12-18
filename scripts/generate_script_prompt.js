import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Explicitly load .env from project root to ensure key is picked up even if server isn't restarted
dotenv.config({ path: path.join(PROJECT_ROOT, '.env') });

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
    prompt += `Raw Content Context:\n\`\`\`jsx\n${slide.fileContent}\n\`\`\`\n\n`;
});

prompt += `\nPlease generate the full script now. Output ONLY the script content.`;

/* HEURISTIC FALLBACK GENERATOR */
const generateFallbackScript = (data, style) => {
    let script = `Title: ${data.deckName || 'Presentation Script'}\nStyle: ${style}\n\n`;
    script += `INTRODUCTION\n`;
    script += `(Upbeat music fades in)\n`;
    script += `Host: Welcome everyone! Today we're diving into a fascinating topic.\n\n`;

    data.slides.forEach(slide => {
        script += `==================================================\n`;
        script += `SLIDE ${slide.slideNumber}: ${slide.title}\n`;
        script += `==================================================\n`;
        script += `[Visual: Display slide with title "${slide.title}"]\n\n`;

        const textLines = slide.rawText.split('\n').filter(line => line.trim().length > 0);
        if (textLines.length > 0) {
            script += `Host: Let's look at ${slide.title}. \n`;
            textLines.forEach(line => {
                script += `As you can see here, ${line.trim()}.\n`;
            });
        } else {
            script += `Host: (Explain the concepts shown in the code/visuals on this slide).\n`;
        }
        script += `\n`;
    });

    script += `==================================================\n`;
    script += `CONCLUSION\n`;
    script += `==================================================\n`;
    script += `Host: That wraps up our overview. Thanks for watching!\n`;

    return script; // Return string, don't log it inside here to avoid dupes
};

/* AI GENERATION LOGIC */
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY not found in environment.");
    console.warn("Falling back to Heuristic Script.");
    console.log(generateFallbackScript(deckData, style));
    process.exit(0);
}

const runGenAI = async () => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-pro (standard free tier model)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log(text);
    } catch (error) {
        // Log error but don't fail process
        console.error(`AI Error (${error.message}). Switching to Heuristic Generator...`);

        // Final Fallback
        const fallback = generateFallbackScript(deckData, style);
        console.log(fallback);
        process.exit(0);
    }
};

runGenAI();
