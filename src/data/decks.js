const modules = import.meta.glob('../decks/**/deck.js');

export const getDeck = async (id) => {
    // Fallback to local loading for active decks
    // Robust lookup: find key ending with the expected pattern
    const targetSuffix = `/decks/${id}/deck.js`;
    const path = Object.keys(modules).find(p => p.endsWith(targetSuffix));
    const loader = path ? modules[path] : null;

    if (!loader) {
        console.error(`Deck not found: ${id}. Expected path suffix: ${targetSuffix}`);
        console.log('Available paths:', Object.keys(modules));
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

export const getAllDecks = async () => {
    const decks = {};
    for (const path in modules) {
        const match = path.match(/\.\.\/decks\/(.+)\/deck\.js/);
        if (match) {
            const id = match[1];
            const mod = await modules[path]();
            decks[id] = mod.default;
        }
    }
    return decks;
};
