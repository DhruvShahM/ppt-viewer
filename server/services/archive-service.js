const db = require('../database/db');
const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

class ArchiveService {
    /**
     * Archive a deck - moves from active to archived table
     * @param {string} deckId - The deck ID to archive
     * @returns {Promise<Object>} Archive result
     */
    async archiveDeck(deckId) {
        const client = await db.pool.connect();

        try {
            await client.query('BEGIN');

            // Get deck from active table
            const deckResult = await client.query(
                'SELECT * FROM decks WHERE id = $1',
                [deckId]
            );

            if (deckResult.rows.length === 0) {
                throw new Error(`Deck ${deckId} not found`);
            }

            const deck = deckResult.rows[0];

            // Compress the full deck data
            const deckData = JSON.stringify(deck);
            const compressed = await gzip(deckData);

            // Insert into archived_decks table
            await client.query(`
                INSERT INTO archived_decks 
                (id, title, description, path, category, tags, created_at, updated_at, original_data, metadata)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    path = EXCLUDED.path,
                    category = EXCLUDED.category,
                    tags = EXCLUDED.tags,
                    updated_at = EXCLUDED.updated_at,
                    archived_at = CURRENT_TIMESTAMP,
                    original_data = EXCLUDED.original_data,
                    metadata = EXCLUDED.metadata
            `, [
                deck.id,
                deck.title,
                deck.description,
                deck.path,
                deck.category,
                deck.tags,
                deck.created_at,
                deck.updated_at,
                compressed,
                deck.metadata
            ]);

            // Delete from active table
            await client.query('DELETE FROM decks WHERE id = $1', [deckId]);

            await client.query('COMMIT');

            console.log(`✅ Archived deck: ${deckId}`);

            return {
                success: true,
                deckId,
                archivedAt: new Date().toISOString(),
                compressionRatio: (compressed.length / deckData.length * 100).toFixed(2) + '%'
            };

        } catch (error) {
            await client.query('ROLLBACK');
            console.error(`❌ Archive failed for ${deckId}:`, error);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Restore a deck - moves from archived to active table
     * @param {string} deckId - The deck ID to restore
     * @returns {Promise<Object>} Restore result
     */
    async restoreDeck(deckId) {
        const client = await db.pool.connect();

        try {
            await client.query('BEGIN');

            // Get deck from archived table
            const archivedResult = await client.query(
                'SELECT * FROM archived_decks WHERE id = $1',
                [deckId]
            );

            if (archivedResult.rows.length === 0) {
                throw new Error(`Archived deck ${deckId} not found`);
            }

            const archived = archivedResult.rows[0];

            // Decompress original data
            let originalDeck;
            if (archived.original_data) {
                const decompressed = await gunzip(archived.original_data);
                originalDeck = JSON.parse(decompressed.toString());
            } else {
                // Fallback if no compressed data
                originalDeck = archived;
            }

            // Insert back into active table
            await client.query(`
                INSERT INTO decks 
                (id, title, description, path, category, tags, created_at, updated_at, status, metadata)
                VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, 'active', $8)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    path = EXCLUDED.path,
                    category = EXCLUDED.category,
                    tags = EXCLUDED.tags,
                    updated_at = CURRENT_TIMESTAMP,
                    status = 'active',
                    metadata = EXCLUDED.metadata
            `, [
                originalDeck.id,
                originalDeck.title,
                originalDeck.description,
                originalDeck.path,
                originalDeck.category,
                originalDeck.tags,
                originalDeck.created_at,
                originalDeck.metadata
            ]);

            // Delete from archived table
            await client.query('DELETE FROM archived_decks WHERE id = $1', [deckId]);

            await client.query('COMMIT');

            console.log(`✅ Restored deck: ${deckId}`);

            return {
                success: true,
                deckId,
                restoredAt: new Date().toISOString()
            };

        } catch (error) {
            await client.query('ROLLBACK');
            console.error(`❌ Restore failed for ${deckId}:`, error);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Get all archived decks
     * @returns {Promise<Array>} List of archived decks
     */
    async getArchivedDecks() {
        const result = await db.query(`
            SELECT id, title, description, category, tags, 
                   created_at, updated_at, archived_at
            FROM archived_decks
            ORDER BY archived_at DESC
        `);

        return result.rows;
    }

    /**
     * Cleanup old archives (older than retention days)
     * @param {number} retentionDays - Number of days to keep archives (default: 90)
     * @returns {Promise<Object>} Cleanup result
     */
    async cleanupOldArchives(retentionDays = 90) {
        try {
            const result = await db.query(`
                DELETE FROM archived_decks
                WHERE archived_at < NOW() - INTERVAL '${retentionDays} days'
                RETURNING id
            `);

            const deletedCount = result.rowCount;

            // Log cleanup job
            await db.query(`
                INSERT INTO cleanup_jobs (job_name, status, deleted_count)
                VALUES ('archive_cleanup', 'completed', $1)
            `, [deletedCount]);

            console.log(`🗑️  Cleaned up ${deletedCount} archives older than ${retentionDays} days`);

            return {
                success: true,
                deletedCount,
                retentionDays,
                cleanedAt: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Cleanup failed:', error);

            await db.query(`
                INSERT INTO cleanup_jobs (job_name, status, deleted_count)
                VALUES ('archive_cleanup', 'failed', 0)
            `);

            throw error;
        }
    }

    /**
     * Get archive statistics
     * @returns {Promise<Object>} Archive stats
     */
    async getArchiveStats() {
        const stats = await db.query(`
            SELECT 
                COUNT(*) as total_archived,
                COUNT(*) FILTER (WHERE archived_at > NOW() - INTERVAL '7 days') as archived_last_week,
                COUNT(*) FILTER (WHERE archived_at > NOW() - INTERVAL '30 days') as archived_last_month,
                COUNT(*) FILTER (WHERE archived_at < NOW() - INTERVAL '90 days') as pending_cleanup,
                pg_size_pretty(pg_total_relation_size('archived_decks')) as table_size
            FROM archived_decks
        `);

        return stats.rows[0];
    }

    /**
     * Schedule automatic cleanup (call this on server startup)
     */
    startAutoCleanup(intervalHours = 24, retentionDays = 90) {
        console.log(`🕐 Starting automatic archive cleanup (every ${intervalHours}h, retention: ${retentionDays} days)`);

        // Run immediately on startup
        this.cleanupOldArchives(retentionDays).catch(err => {
            console.error('Initial cleanup failed:', err);
        });

        // Schedule periodic cleanup
        setInterval(async () => {
            try {
                await this.cleanupOldArchives(retentionDays);
            } catch (error) {
                console.error('Scheduled cleanup failed:', error);
            }
        }, intervalHours * 60 * 60 * 1000);
    }
}

module.exports = new ArchiveService();
