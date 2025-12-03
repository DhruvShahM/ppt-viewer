const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

// Enable WAL mode for better concurrency
sequelize.query('PRAGMA journal_mode = WAL;')
    .then(() => console.log('SQLite WAL mode enabled'))
    .catch(err => console.error('Failed to enable WAL mode:', err));

const Repository = sequelize.define('Repository', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Deck = sequelize.define('Deck', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    icon: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
    slides: {
        type: DataTypes.JSON
    }
});

Repository.hasMany(Deck, { as: 'decks' });
Deck.belongsTo(Repository);

const setupFTS = async () => {
    try {
        // Create FTS virtual table
        // Note: id is UNINDEXED because we don't search by ID, but we need it to link back
        await sequelize.query(`
            CREATE VIRTUAL TABLE IF NOT EXISTS decks_fts USING fts5(id UNINDEXED, title, description);
        `);

        // Create Triggers to keep FTS in sync
        // 1. After Insert
        await sequelize.query(`
            CREATE TRIGGER IF NOT EXISTS decks_ai AFTER INSERT ON Decks BEGIN
                INSERT INTO decks_fts(id, title, description) VALUES (new.id, new.title, new.description);
            END;
        `);

        // 2. After Delete
        await sequelize.query(`
            CREATE TRIGGER IF NOT EXISTS decks_ad AFTER DELETE ON Decks BEGIN
                DELETE FROM decks_fts WHERE id = old.id;
            END;
        `);

        // 3. After Update
        await sequelize.query(`
            CREATE TRIGGER IF NOT EXISTS decks_au AFTER UPDATE ON Decks BEGIN
                UPDATE decks_fts SET title = new.title, description = new.description WHERE id = old.id;
            END;
        `);

        // Populate FTS table if empty (initial migration)
        const [results] = await sequelize.query("SELECT count(*) as count FROM decks_fts");
        if (results[0].count === 0) {
            console.log("Populating FTS index...");
            await sequelize.query(`
                INSERT INTO decks_fts(id, title, description) 
                SELECT id, title, description FROM Decks;
            `);
        }

        console.log("FTS5 setup complete");
    } catch (error) {
        console.error("Failed to setup FTS:", error);
    }
};

module.exports = {
    sequelize,
    Repository,
    Deck,
    setupFTS
};
