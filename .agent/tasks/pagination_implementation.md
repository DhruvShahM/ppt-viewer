# Pagination Implementation

I have successfully implemented a "beautiful" pagination system for the landing page, allowing users to browse decks category-wise.

## Features
- **Category-Based View**: Displays one repository (category) at a time, keeping the interface clean and focused.
- **Pagination Controls**: Added stylized "Previous", "Next", and numbered page buttons.
- **Visual Design**: Used glassmorphism effects (`bg-white/5`, `backdrop-blur`) and hover transitions to match the existing premium aesthetic.
- **Responsive State**:
  - Automatically resets to Page 1 when searching or sorting.
  - Adjusts the current page if the number of pages decreases (e.g., after deleting a repository).
  - Disables "Previous" on the first page and "Next" on the last page.

## Verification
- Validated functionality using a browser subagent.
- Confirmed that clicking "Next" correctly switches from "Go Programming" to "Microservices".
- Verified that the UI looks consistent and polished.

## Files Modified
- `src/components/DeckSelector.jsx`: Added pagination logic and UI components.
