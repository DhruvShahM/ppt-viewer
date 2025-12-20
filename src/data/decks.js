const modules = import.meta.glob('../decks/**/deck.js');

export const getDeck = async (id) => {
    // Fallback to local loading for active decks
    const path = `../decks/${id}/deck.js`;
    const loader = modules[path];

    if (!loader) {
        console.error(`Deck not found: ${id} at path ${path}`);
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
