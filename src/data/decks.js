
const modules = import.meta.glob('../decks/**/deck.js');

export const getDeck = async (id) => {
    // 1. Try fetching from API (Data-Driven)
    try {
        const response = await fetch(`http://localhost:3002/api/decks/${id}`);
        if (response.ok) {
            const deckData = await response.json();
            // If the deck has slides data (JSON), return it
            if (deckData.slides && Array.isArray(deckData.slides) && deckData.slides.length > 0) {
                console.log(`Loaded deck ${id} from API (Data-Driven)`);
                return deckData.slides;
            }
        }
    } catch (e) {
        console.warn(`Failed to fetch deck ${id} from API, falling back to local files.`, e);
    }

    // 2. Fallback to local files (Legacy File-Based)
    // Note: This is not scalable for millions of files.
    const path = Object.keys(modules).find(p => p.includes(`/${id}/deck.js`));

    if (!path) {
        console.warn(`Deck not found in DB or local files: ${id}`);
        return null;
    }

    console.log(`Loading deck ${id} from local file: ${path}`);

    const loader = modules[path];

    try {
        const mod = await loader();
        return mod.default;
    } catch (e) {
        console.error(`Error loading deck ${id}:`, e);
        return null;
    }
};

// Fetch decks from the backend API
export const getAllDecks = async (page = 1, limit = 10, search = '') => {
    try {
        const response = await fetch(`http://localhost:3002/api/decks?page=${page}&limit=${limit}&search=${search}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch decks:', error);
        return { repositories: [], total: 0, page: 1, totalPages: 0 };
    }
};
