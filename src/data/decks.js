
const modules = import.meta.glob('../decks/**/deck.js');

export const getDeck = async (id) => {
    const path = `../decks/${id}/deck.js`;
    const loader = modules[path];

    if (!loader) {
        console.error(`Deck not found: ${id} at path ${path}`);
        console.log('Available modules:', Object.keys(modules));
        return null;
    }

    try {
        const mod = await loader();
        return mod.default;
    } catch (e) {
        console.error(`Error loading deck ${id}:`, e);
        return null;
    }
};

// Helper for the export functionality to get all decks
export const getAllDecks = async () => {
    const decks = {};
    for (const path in modules) {
        // Extract ID from path: ../decks/[id]/deck.js
        const match = path.match(/\.\.\/decks\/(.+)\/deck\.js/);
        if (match) {
            const id = match[1];
            const mod = await modules[path]();
            decks[id] = mod.default;
        }
    }
    return decks;
};
