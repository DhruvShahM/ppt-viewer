#!/usr/bin/env node

/**
 * Migration script to move existing file-based archives to PostgreSQL
 */

const fs = require('fs').promises;
const path = require('path');
const db = require('../database/db');
const archiveService = require('../services/archive-service');

const ROOT_DIR = path.join(__dirname, '..');
const ARCHIVE_DIR = path.join(ROOT_DIR, 'archives');
const INDEX_FILE = path.join(ROOT_DIR, 'src/data/deck-index.json');

async function migrateArchives() {
    console.log('🚀 Starting archive migration to PostgreSQL...\n');

    try {
        // Check if archive directory exists
        try {
            await fs.access(ARCHIVE_DIR);
        } catch {
            console.log('No archives directory found. Nothing to migrate.');
            return;
        }

        // Read deck index
        const indexContent = await fs.readFile(INDEX_FILE, 'utf8');
        const deckIndex = JSON.parse(indexContent);

        // Filter archived decks
        const archivedDecks = deckIndex.filter(d => d.status === 'archived');

        if (archivedDecks.length === 0) {
            console.log('No archived decks found in index.');
            return;
        }

        console.log(`Found ${archivedDecks.length} archived decks to migrate\n`);

        let successCount = 0;
        let errorCount = 0;

        for (const deck of archivedDecks) {
            try {
                console.log(`Migrating: ${deck.id}...`);

                // Insert into PostgreSQL archived_decks table
                const deckData = JSON.stringify(deck);
                const zlib = require('zlib');
                const { promisify } = require('util');
                const gzip = promisify(zlib.gzip);
                const compressed = await gzip(deckData);

                await db.query(`
                    INSERT INTO archived_decks 
                    (id, title, description, path, category, tags, created_at, updated_at, archived_at, original_data, metadata)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    ON CONFLICT (id) DO NOTHING
                `, [
                    deck.id,
                    deck.title || deck.id,
                    deck.description || '',
                    deck.path || '',
                    deck.category || 'uncategorized',
                    deck.tags || [],
                    deck.createdAt || new Date(),
                    deck.updatedAt || new Date(),
                    deck.archivedAt || new Date(),
                    compressed,
                    deck.metadata || {}
                ]);

                console.log(`✅ Migrated: ${deck.id}`);
                successCount++;

            } catch (error) {
                console.error(`❌ Failed to migrate ${deck.id}:`, error.message);
                errorCount++;
            }
        }

        console.log('\n📊 Migration Summary:');
        console.log(`   ✅ Success: ${successCount}`);
        console.log(`   ❌ Failed: ${errorCount}`);
        console.log(`   📦 Total: ${archivedDecks.length}`);

        if (successCount > 0) {
            console.log('\n💡 Tip: You can now safely delete the ./archives directory');
            console.log('   The data is stored in PostgreSQL with compression enabled.');
        }

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await db.close();
    }
}

// Run migration
migrateArchives().then(() => {
    console.log('\n✨ Migration completed!');
    process.exit(0);
}).catch(err => {
    console.error('Migration error:', err);
    process.exit(1);
});
