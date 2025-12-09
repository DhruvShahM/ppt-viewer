const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    ImageRun,
    HeadingLevel,
    AlignmentType,
    WidthType,
    Table,
    TableRow,
    TableCell,
    BorderStyle
} = require("docx");
const fs = require("fs");
const path = require("path");
const { imageSize: sizeOf } = require("image-size");

/**
 * Removes characters that are invalid in XML 1.0
 * @param {string} text 
 * @returns {string}
 */
const sanitizeText = (text) => {
    if (!text) return "";
    // Remove null bytes and other control characters that are invalid in XML
    // Keep tab (\x09), line feed (\x0A), carriage return (\x0D)
    // Range \x20-\x7E is basic printable ASCII
    // \u00A0-\uFFFF covers most other valid utf8
    // We explicitly strip low control chars except whitespace
    return text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");
};

/**
 * Generates a DOCX buffer from feedback items
 * @param {Array} feedbackItems - List of feedback objects
 * @param {string} screenshotsDir - Directory containing screenshot files
 * @returns {Promise<Buffer>}
 */
const generateFeedbackDoc = async (feedbackItems, decksDir, screenshotsDir) => {
    const children = [];

    // Title
    children.push(
        new Paragraph({
            text: "Design Feedback Report",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
                after: 400
            }
        })
    );

    children.push(
        new Paragraph({
            text: `Generated on: ${new Date().toLocaleString()}`,
            alignment: AlignmentType.CENTER,
            spacing: {
                after: 800
            }
        })
    );


    // Group by Deck ID
    const feedbackByDeck = {};
    for (const item of feedbackItems) {
        if (!feedbackByDeck[item.deckId]) {
            feedbackByDeck[item.deckId] = [];
        }
        feedbackByDeck[item.deckId].push(item);
    }

    const deckIds = Object.keys(feedbackByDeck).sort();

    for (const deckId of deckIds) {
        // Deck Header
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: sanitizeText(`Deck: ${deckId}`),
                        bold: true,
                        size: 36,
                        color: "2E74B5"
                    })
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: {
                    before: 600,
                    after: 400
                },
                border: {
                    bottom: {
                        color: "2E74B5",
                        space: 1,
                        style: BorderStyle.SINGLE,
                        size: 12
                    }
                }
            })
        );

        const deckItems = feedbackByDeck[deckId];

        // Group items by slideIndex
        const itemsBySlide = {};
        for (const item of deckItems) {
            const slideIdx = item.slideIndex;
            if (!itemsBySlide[slideIdx]) {
                itemsBySlide[slideIdx] = [];
            }
            itemsBySlide[slideIdx].push(item);
        }

        // Sort slide indices
        const slideIndices = Object.keys(itemsBySlide).sort((a, b) => parseInt(a) - parseInt(b));

        for (const slideIndex of slideIndices) {
            const items = itemsBySlide[slideIndex];

            // Header for the Slide Group (Optional, but helps structure)
            // children.push(
            //     new Paragraph({
            //         text: `Slide ${slideIndex}`,
            //         heading: HeadingLevel.HEADING_2,
            //         spacing: { before: 400, after: 200 }
            //     })
            // );

            // List all feedback items for this slide
            for (const [index, item] of items.entries()) {
                // Item Header
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: sanitizeText(`Feedback #${index + 1} - Slide ${item.slideIndex}`),
                                bold: true,
                                size: 28
                            })
                        ],
                        heading: HeadingLevel.HEADING_2,
                        spacing: {
                            before: 400,
                            after: 200
                        },
                        border: {
                            bottom: {
                                color: "CCCCCC",
                                space: 1,
                                style: BorderStyle.SINGLE,
                                size: 6
                            }
                        }
                    })
                );

                // Details Table
                const rows = [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ children: [new TextRun({ text: "Timestamp", bold: true })] })],
                                width: { size: 30, type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph(new Date(item.timestamp).toLocaleString())],
                                width: { size: 70, type: WidthType.PERCENTAGE }
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({ children: [new TextRun({ text: "Instruction", bold: true })] })],
                            }),
                            new TableCell({
                                children: [new Paragraph(sanitizeText(item.instruction))],
                            })
                        ]
                    })
                ];

                children.push(
                    new Table({
                        rows: rows,
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE
                        },
                        margins: {
                            top: 100,
                            bottom: 100,
                            left: 100,
                            right: 100
                        }
                    })
                );

                children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
            }

            // --- Embed Slide Code Once per Slide Group ---

            // Use the first item to get deck info (all items in this loop have same deckId and slideIndex)
            const representativeItem = items[0];

            const deckDir = path.join(decksDir, representativeItem.deckId);
            let slideCode = "// Code not found";
            let slideFilename = "Unknown";

            if (fs.existsSync(deckDir)) {
                try {
                    const files = fs.readdirSync(deckDir);
                    // Match SlideN_Name.jsx pattern
                    const slideFile = files.find(f => f.startsWith(`Slide${representativeItem.slideIndex}_`) && (f.endsWith('.jsx') || f.endsWith('.js')));

                    if (slideFile) {
                        slideFilename = slideFile;
                        slideCode = fs.readFileSync(path.join(deckDir, slideFile), 'utf8');
                    } else {
                        // Fallback: Check deck.js for imports
                        const deckJsPath = path.join(deckDir, 'deck.js');
                        if (fs.existsSync(deckJsPath)) {
                            const deckJsContent = fs.readFileSync(deckJsPath, 'utf8');
                            // 1. Find the component name at index (0-based in array, but slides are usually 1-indexed in UI? 
                            // item.slideIndex is likely 1-based from the look of matching logic above)
                            // The deck.js export is an array [Slide1, Slide2, ...]
                            // We need to parse the export default [...]

                            const exportMatch = deckJsContent.match(/export\s+default\s*\[([\s\S]*?)\];/);
                            if (exportMatch) {
                                const components = exportMatch[1]
                                    .split(',')
                                    .map(s => s.trim())
                                    .filter(s => s.length > 0);

                                // Adjust index: item.slideIndex is 1-based usually (e.g., Slide 1, Slide 2)
                                // Array is 0-based.
                                const componentName = components[representativeItem.slideIndex - 1];

                                if (componentName) {
                                    // 2. Find import path for this component
                                    // import ComponentName from 'path';
                                    const importRegex = new RegExp(`import\\s+${componentName}\\s+from\\s+['"]([^'"]+)['"]`);
                                    const importMatch = deckJsContent.match(importRegex);

                                    if (importMatch) {
                                        let importPath = importMatch[1];
                                        // Resolve path relative to deckDir
                                        // importPath might be ../../slides/SomeSlide
                                        // We need to add extension if missing
                                        if (!importPath.endsWith('.jsx') && !importPath.endsWith('.js')) {
                                            // Try .jsx first, then .js
                                            if (fs.existsSync(path.resolve(deckDir, importPath + '.jsx'))) {
                                                importPath += '.jsx';
                                            } else if (fs.existsSync(path.resolve(deckDir, importPath + '.js'))) {
                                                importPath += '.js';
                                            }
                                        }

                                        const absolutePath = path.resolve(deckDir, importPath);
                                        if (fs.existsSync(absolutePath)) {
                                            slideFilename = path.basename(absolutePath);
                                            slideCode = fs.readFileSync(absolutePath, 'utf8');
                                        } else {
                                            slideCode = `// Could not resolve imported file: ${absolutePath}`;
                                        }
                                    } else {
                                        slideCode = `// Could not find import statement for ${componentName} in deck.js`;
                                    }
                                } else {
                                    slideCode = `// Could not find component at index ${representativeItem.slideIndex - 1} in deck.js export`;
                                }
                            } else {
                                slideCode = `// Could not parse export default in deck.js`;
                            }
                        } else {
                            slideCode = `// Could not find file for Slide ${representativeItem.slideIndex} in ${representativeItem.deckId} and no deck.js found`;
                        }
                    }
                } catch (err) {
                    slideCode = `// Error reading deck directory: ${err.message}`;
                }
            } else {
                slideCode = `// Deck directory not found: ${representativeItem.deckId}`;
            }

            children.push(
                new Paragraph({
                    children: [new TextRun({ text: `Slide Code (${slideFilename}):`, bold: true, size: 24 })],
                    spacing: { after: 100 }
                })
            );

            // Split code into lines for formatting
            const codeLines = slideCode.split('\n');
            for (const line of codeLines) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: sanitizeText(line),
                                font: "Courier New",
                                size: 20
                            })
                        ],
                        spacing: { after: 0, before: 0 } // Compact spacing for code
                    })
                );
            }

            // --- Embed Screenshots for this Slide Group ---
            // Collect all screenshots for items in this slide group
            const screenshotsToEmbed = [];
            for (const item of items) {
                if (item.screenshots && Array.isArray(item.screenshots)) {
                    item.screenshots.forEach(s => screenshotsToEmbed.push({ filename: s, label: `Feedback #${item.id}` }));
                } else if (item.screenshot) {
                    screenshotsToEmbed.push({ filename: item.screenshot, label: `Feedback #${item.id}` });
                }
            }

            if (screenshotsToEmbed.length > 0) {
                children.push(
                    new Paragraph({
                        text: "Screenshots:",
                        heading: HeadingLevel.HEADING_3,
                        spacing: { before: 400, after: 200 }
                    })
                );

                for (const { filename, label } of screenshotsToEmbed) {
                    const imagePath = path.join(screenshotsDir, filename);
                    if (fs.existsSync(imagePath)) {
                        try {
                            const imageBuffer = fs.readFileSync(imagePath);
                            const dimensions = sizeOf(imageBuffer);

                            // Validate dimensions
                            if (!dimensions || !dimensions.width || !dimensions.height) {
                                throw new Error(`Invalid image dimensions for ${filename}`);
                            }

                            // Scale down if too wide (max width ~600px usually fits well on page)
                            let width = dimensions.width;
                            let height = dimensions.height;
                            const MAX_WIDTH = 600;

                            if (width > MAX_WIDTH) {
                                const ratio = MAX_WIDTH / width;
                                width = MAX_WIDTH;
                                height = height * ratio;
                            }

                            // Ensure integer dimensions (Word requires integers)
                            width = Math.round(width);
                            height = Math.round(height);

                            // Final safety check
                            if (width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
                                throw new Error(`Invalid calculated dimensions: ${width}x${height}`);
                            }

                            children.push(
                                new Paragraph({
                                    children: [
                                        new ImageRun({
                                            data: imageBuffer,
                                            transformation: {
                                                width: width,
                                                height: height
                                            }
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER,
                                    spacing: { before: 200, after: 100 }
                                })
                            );
                            children.push(
                                new Paragraph({
                                    text: label,
                                    alignment: AlignmentType.CENTER,
                                    spacing: { after: 400 }
                                })
                            );

                        } catch (err) {
                            console.error(`Error embedding screenshot ${filename}:`, err);
                            children.push(
                                new Paragraph({
                                    text: `Error loading screenshot: ${filename}`,
                                    color: "RED",
                                    spacing: { after: 200 }
                                })
                            );
                        }
                    } else {
                        children.push(
                            new Paragraph({
                                text: `Screenshot not found: ${filename}`,
                                color: "RED",
                                spacing: { after: 200 }
                            })
                        );
                    }
                }
            }

            // Separator
            children.push(
                new Paragraph({
                    text: "____________________________________________________________",
                    alignment: AlignmentType.CENTER,
                    color: "EEEEEE",
                    spacing: { before: 400, after: 400 }
                })
            );
        }

        // Page break after each deck unless it's the last one
        if (deckId !== deckIds[deckIds.length - 1]) {
            children.push(new Paragraph({
                children: [],
                pageBreakBefore: true
            }));
        }
    }


    const doc = new Document({
        sections: [
            {
                properties: {},
                children: children
            }
        ]
    });

    return await Packer.toBuffer(doc);
};

module.exports = { generateFeedbackDoc };
