import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(PROJECT_ROOT, '.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No GEMINI_API_KEY found.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // We can't list models directly with the helper in all versions, 
        // but let's try a direct fetch if needed or just try a simple generation test.

        // Actually, the error message said "Call ListModels". 
        // The SDK doesn't always expose listModels easily in the high-level client?
        // Let's try to just run a simple prompt with 'gemini-pro' and 'gemini-1.5-flash' and see which works/errors specificially.

        console.log("Testing gemini-1.5-flash...");
        try {
            const m1 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            await m1.generateContent("test");
            console.log("SUCCESS: gemini-1.5-flash works.");
        } catch (e) {
            console.log("FAIL: gemini-1.5-flash failed:", e.message);
        }

        console.log("Testing gemini-pro...");
        try {
            const m2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            await m2.generateContent("test");
            console.log("SUCCESS: gemini-pro works.");
        } catch (e) {
            console.log("FAIL: gemini-pro failed:", e.message);
        }

    } catch (e) {
        console.error(e);
    }
}

listModels();
