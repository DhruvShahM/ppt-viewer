
import { inputPromptToChatGPT } from './chatgpt_client.js';

const testCases = [
    {
        name: "Simple Greeting",
        prompt: "Hello, how are you today?"
    },
    {
        name: "Code Request",
        prompt: "Write a JavaScript function to reverse a string."
    },
    {
        name: "Creative Writing",
        prompt: "Write a short poem about a robot learning to code."
    }
];

async function runTests() {
    console.log("Available Test Cases:");
    testCases.forEach((tc, index) => {
        console.log(`${index + 1}. ${tc.name}`);
    });

    // For demonstration, we will run the first test case.
    // You can change the index to run other test cases.
    const selectedToRun = 0;

    console.log(`\nRunning Test Case ${selectedToRun + 1}: ${testCases[selectedToRun].name}`);

    await inputPromptToChatGPT(testCases[selectedToRun].prompt);
}

runTests();
