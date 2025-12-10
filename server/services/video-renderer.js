const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');
const fs = require('fs');

class VideoRenderer {
    constructor() {
        this.browser = null;
    }

    async renderSlide({ deckId, slideIndex, duration, width, height, outputPath }) {
        console.log(`Starting render for Deck: ${deckId}, Slide: ${slideIndex}, ${width}x${height}, ${duration}s`);

        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                `--window-size=${width},${height}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--autoplay-policy=no-user-gesture-required'
            ]
        });

        try {
            const page = await browser.newPage();
            await page.setViewport({ width, height });

            // Construct URL
            // Assuming the server can access the frontend via localhost:5173
            // In some environments, this might need to be host.docker.internal or similar, but for local it's localhost
            const url = `http://localhost:5173/?deckId=${deckId}&slide=${slideIndex}&mode=export`;

            console.log(`Navigating to ${url}`);

            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

            // Wait a bit for initial render/animations to stabilize
            await new Promise(r => setTimeout(r, 2000));

            // Hide scrollbars
            await page.addStyleTag({ content: 'body { overflow: hidden !important; }' });

            const recorder = new PuppeteerScreenRecorder(page, {
                followNewTab: false,
                fps: 60,
                ffmpeg_Path: null, // use default or system
                videoFrame: {
                    width: width,
                    height: height,
                },
                videoCrf: 18,
                videoCodec: 'libx264',
                videoPreset: 'ultrafast',
                videoBitrate: 1000,
                autopad: {
                    color: 'black',
                },
                aspectRatio: `${width}:${height}`,
            });

            console.log(`Recording started to ${outputPath}`);
            await recorder.start(outputPath);

            // Record for duration
            await new Promise(r => setTimeout(r, duration * 1000));

            await recorder.stop();
            console.log(`Recording finished`);

        } catch (error) {
            console.error("Render error:", error);
            throw error;
        } finally {
            await browser.close();
        }

        return outputPath;
    }
}

module.exports = new VideoRenderer();
