const { sequelize, Repository, Deck, setupFTS } = require('./db');
const crypto = require('crypto');

const BATCH_SIZE = 100;
const TOTAL_DECKS = 10000;

const adjectives = ['Fast', 'Scalable', 'Reliable', 'Concurrent', 'Distributed', 'Cloud-Native', 'Robust', 'Dynamic', 'Async', 'Parallel'];
const nouns = ['Architecture', 'System', 'Microservice', 'Pipeline', 'Worker', 'Scheduler', 'Balancer', 'Database', 'Cache', 'Proxy'];
const langs = ['Go', 'Rust', 'Node.js', 'Python', 'Java', 'C++', 'Elixir', 'Haskell'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateDeck = (index) => {
    const title = `${getRandomElement(adjectives)} ${getRandomElement(langs)} ${getRandomElement(nouns)} ${index}`;
    const description = `Learn how to build a ${title.toLowerCase()} with best practices and high performance patterns.`;

    return {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        icon: 'Layers',
        color: ['blue', 'purple', 'green', 'orange', 'red', 'pink', 'cyan'][Math.floor(Math.random() * 7)],
        RepositoryId: 'go-programming' // Add all to one repo for stress testing, or distribute if needed
    };
};

const seed = async () => {
    try {
        await sequelize.sync();
        await setupFTS(); // Ensure FTS is ready

        console.log(`Starting seed of ${TOTAL_DECKS} decks...`);

        // Ensure repository exists
        const [repo] = await Repository.findOrCreate({
            where: { id: 'stress-test' },
            defaults: { title: 'Stress Test Repository' }
        });

        let count = 0;
        const decks = [];

        for (let i = 0; i < TOTAL_DECKS; i++) {
            const deck = generateDeck(i);
            deck.RepositoryId = repo.id;
            decks.push(deck);

            if (decks.length >= BATCH_SIZE) {
                await Deck.bulkCreate(decks);
                count += decks.length;
                process.stdout.write(`\rInserted ${count}/${TOTAL_DECKS} decks...`);
                decks.length = 0; // Clear array
            }
        }

        if (decks.length > 0) {
            await Deck.bulkCreate(decks);
            count += decks.length;
        }

        console.log(`\nSuccessfully seeded ${count} decks!`);
        process.exit(0);
    } catch (error) {
        console.error('\nSeeding failed:', error);
        process.exit(1);
    }
};

seed();
