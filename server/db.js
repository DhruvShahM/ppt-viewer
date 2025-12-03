const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

let sequelize;
let Repository;
let Deck;

const SQLITE_FILE = path.join(__dirname, 'database.sqlite');

const defineModels = (seq) => {
    const Repo = seq.define('Repository', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    const Dck = seq.define('Deck', {
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

    Repo.hasMany(Dck, { as: 'decks' });
    Dck.belongsTo(Repo);

    return { Repository: Repo, Deck: Dck };
};

const setupFTS = async (seq, dialect) => {
    try {
        if (dialect === 'mysql') {
            await seq.query(`
                ALTER TABLE Decks ADD FULLTEXT INDEX deck_search_idx (title, description);
            `).catch(err => {
                if (err.original && err.original.errno === 1061) {
                    console.log("FULLTEXT index 'deck_search_idx' already exists.");
                } else {
                    throw err;
                }
            });
            console.log("MySQL FULLTEXT setup complete");
        } else {
            // SQLite FTS5
            await seq.query(`
                CREATE VIRTUAL TABLE IF NOT EXISTS decks_fts USING fts5(id UNINDEXED, title, description);
            `);
            await seq.query(`
                CREATE TRIGGER IF NOT EXISTS decks_ai AFTER INSERT ON Decks BEGIN
                    INSERT INTO decks_fts(id, title, description) VALUES (new.id, new.title, new.description);
                END;
            `);
            await seq.query(`
                CREATE TRIGGER IF NOT EXISTS decks_ad AFTER DELETE ON Decks BEGIN
                    DELETE FROM decks_fts WHERE id = old.id;
                END;
            `);
            await seq.query(`
                CREATE TRIGGER IF NOT EXISTS decks_au AFTER UPDATE ON Decks BEGIN
                    UPDATE decks_fts SET title = new.title, description = new.description WHERE id = old.id;
                END;
            `);
            const [results] = await seq.query("SELECT count(*) as count FROM decks_fts");
            if (results[0].count === 0) {
                console.log("Populating FTS index...");
                await seq.query(`
                    INSERT INTO decks_fts(id, title, description) 
                    SELECT id, title, description FROM Decks;
                `);
            }
            console.log("SQLite FTS5 setup complete");
        }
    } catch (error) {
        console.error("Failed to setup FTS:", error);
    }
};

const migrateSQLiteToMySQL = async (mysqlSeq, mysqlModels) => {
    if (!fs.existsSync(SQLITE_FILE)) return;

    console.log("Found SQLite database. Starting migration to MySQL...");

    // Connect to SQLite
    const sqliteSeq = new Sequelize({
        dialect: 'sqlite',
        storage: SQLITE_FILE,
        logging: false
    });

    const sqliteModels = defineModels(sqliteSeq);
    let migrationSuccess = false;

    try {
        // Read data
        const repos = await sqliteModels.Repository.findAll();
        const decks = await sqliteModels.Deck.findAll();

        console.log(`Migrating ${repos.length} repositories and ${decks.length} decks...`);

        // Write to MySQL (using bulkCreate with ignoreDuplicates or updateOnDuplicate)
        // Since we want to preserve what's in SQLite, we'll use updateOnDuplicate for simplicity
        // assuming SQLite is the source of truth if it exists and we are migrating.

        if (repos.length > 0) {
            await mysqlModels.Repository.bulkCreate(repos.map(r => r.toJSON()), {
                updateOnDuplicate: ['title']
            });
        }

        if (decks.length > 0) {
            await mysqlModels.Deck.bulkCreate(decks.map(d => d.toJSON()), {
                updateOnDuplicate: ['title', 'description', 'icon', 'color', 'slides', 'RepositoryId']
            });
        }

        console.log("Migration complete.");
        migrationSuccess = true;

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await sqliteSeq.close();
    }

    if (migrationSuccess) {
        try {
            // Rename SQLite file
            const backupPath = SQLITE_FILE + '.migrated';
            if (fs.existsSync(backupPath)) {
                fs.unlinkSync(backupPath);
            }
            fs.renameSync(SQLITE_FILE, backupPath);
            console.log(`Renamed ${SQLITE_FILE} to ${backupPath}`);
        } catch (err) {
            console.error("Renaming failed:", err);
        }
    }
};

const initDB = async () => {
    let dialect = 'mysql';

    // Try MySQL
    sequelize = new Sequelize(
        process.env.DB_NAME || 'go_concurrency_ppt',
        process.env.DB_USER || 'root',
        process.env.DB_PASS || 'root',
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false
        }
    );

    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL.');
    } catch (err) {
        console.warn('Failed to connect to MySQL:', err.message);
        console.log('Falling back to SQLite...');
        dialect = 'sqlite';
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: SQLITE_FILE,
            logging: false
        });
        // Enable WAL for SQLite
        await sequelize.query('PRAGMA journal_mode = WAL;').catch(e => console.error(e));
    }

    const models = defineModels(sequelize);
    Repository = models.Repository;
    Deck = models.Deck;

    await sequelize.sync();
    console.log(`Database synced (${dialect})`);

    if (dialect === 'mysql') {
        await migrateSQLiteToMySQL(sequelize, models);
    }

    await setupFTS(sequelize, dialect);

    return { sequelize, Repository, Deck };
};

module.exports = { initDB };
