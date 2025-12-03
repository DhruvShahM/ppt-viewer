---
description: Analyze UI and fix issues based on feedback
---

1. Read `feedback.json` to identify pending items with `type: "ui_analysis"`.
2. For each pending item:
    a. Search in `src/data/decks.js` for the `deckId` to find the deck component name and its import path.
    b. Read the deck component file to find the list of slides.
    c. Identify the slide file path based on the `slideIndex` (0-based index in the slides array).
    b. Read the slide file.
    c. Analyze the UI code (CSS/Tailwind) based on the user's instruction.
    d. If the instruction implies fixing issues (e.g. "check alignment", "fix colors"), apply the necessary code changes to the slide file to improve the UI.
    e. Update `feedback.json` to mark the item as "completed".
3. Notify the user of the actions taken.
