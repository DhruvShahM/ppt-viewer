
import puppeteer from 'puppeteer';

/**
 * Opens ChatGPT in a browser and inputs the given prompt.
 * @param {string} promptText - The text to input into the chat box.
 */
export async function inputPromptToChatGPT(promptText) {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: false, // Show the browser
        defaultViewport: null, // Use default window size
        args: ['--start-maximized'] // Start maximized
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to ChatGPT...');
        // Go to ChatGPT. 
        // networkidle2 can be flaky if there's a constant stream of data, using domcontentloaded is safer for initial load.
        await page.goto('https://chatgpt.com/', { waitUntil: 'domcontentloaded' });
        // Give it a moment for dynamic scripts to hydrate
        await new Promise(r => setTimeout(r, 2000));

        console.log('Waiting for input area...');

        // Selectors can change. We try the common ID, then a generic textarea.
        const selector = '#prompt-textarea';
        let inputElement = null;

        try {
            await page.waitForSelector(selector, { timeout: 5000 });
            inputElement = await page.$(selector);
            console.log("Found element by ID: #prompt-textarea");
        } catch (e) {
            console.log("Could not find #prompt-textarea. Searching for any textarea...");
            try {
                await page.waitForSelector('textarea', { timeout: 5000 });
                inputElement = await page.$('textarea');
                console.log("Found a generic textarea.");
            } catch (e2) {
                console.error("No input field found.");
            }
        }

        if (inputElement) {
            // Debugging: Log what we found
            const elementInfo = await page.evaluate(el => ({
                id: el.id,
                className: el.className,
                placeholder: el.placeholder,
                isVisible: el.offsetParent !== null
            }), inputElement);
            console.log("Input Element Info:", elementInfo);

            await inputElement.click();
            console.log(`Typing prompt: "${promptText}"`);

            await inputElement.type(promptText, { delay: 50 });

            // Press Enter to send
            await page.keyboard.press('Enter');
            console.log('Text typed and Enter pressed.');

            // Take a screenshot to verify what happened
            const screenshotPath = 'automation/debug_result.png';
            await page.screenshot({ path: screenshotPath });
            console.log(`Screenshot saved to ${screenshotPath}. Please check this image.`);

        } else {
            console.error('Could not find the input field to type into.');
            await page.screenshot({ path: 'automation/error_no_input.png' });
        }

        console.log('Browser is open. Close it manually when done.');

        // If you want to close it automatically after some time, uncomment:
        // await new Promise(r => setTimeout(r, 10000));
        // await browser.close();

    } catch (error) {
        console.error('An error occurred:', error);
        await page.screenshot({ path: 'automation/error_exception.png' });
        // await browser.close();
    }
}
