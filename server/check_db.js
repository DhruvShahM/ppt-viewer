const { initDB } = require('./db');

const run = async () => {
    try {
        const { Repository, Deck } = await initDB();

        const decks = await Deck.findAll({ include: Repository });
        console.log('Decks found:', JSON.stringify(decks, null, 2));

        const repos = await Repository.findAll();
        console.log('Repositories found:', JSON.stringify(repos, null, 2));

    } catch (error) {
        console.error('Check failed:', error);
    } finally {
        process.exit(0);
    }
};

run();
