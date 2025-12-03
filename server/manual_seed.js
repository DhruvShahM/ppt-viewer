const { initDB } = require('./db');

const run = async () => {
    console.log('Starting manual seed...');
    try {
        const { Repository, Deck } = await initDB();

        const repoData = {
            id: 'microservices',
            title: 'Microservices'
        };

        const deckData = {
            id: 'load-balancer',
            title: 'Load Balancer',
            description: 'In-depth Explained: Algorithms, Health Checks, and Failover.',
            icon: 'Network',
            color: 'cyan',
            RepositoryId: 'microservices'
        };

        console.log('Seeding Repository...');
        const [repo] = await Repository.findOrCreate({
            where: { id: repoData.id },
            defaults: repoData
        });
        console.log('Repository seeded:', repo.id);

        console.log('Seeding Deck...');
        const [deck, created] = await Deck.findOrCreate({
            where: { id: deckData.id },
            defaults: deckData
        });

        if (created) {
            console.log('Deck created successfully:', deck.id);
        } else {
            console.log('Deck already exists:', deck.id);
            // Optional: Update if it exists but details are wrong?
            // await deck.update(deckData);
        }

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        process.exit(0);
    }
};

run();
