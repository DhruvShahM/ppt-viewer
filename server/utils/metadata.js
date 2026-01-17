const fs = require('fs');
const path = require('path');

/**
 * Metadata Management Utilities
 * Handles reading, writing, and validating deck metadata
 */

class MetadataManager {
    constructor() {
        this.metadataFile = path.join(__dirname, '../data/deck-index.json');
    }

    /**
     * Read metadata from deck-index.json
     * @returns {Array} Array of deck objects
     */
    readMetadata() {
        try {
            const startTime = Date.now();

            if (!fs.existsSync(this.metadataFile)) {
                throw new Error(`Metadata file not found: ${this.metadataFile}`);
            }

            const content = fs.readFileSync(this.metadataFile, 'utf8');
            const data = JSON.parse(content);

            return data;
        } catch (error) {
            throw new Error(`Failed to read metadata: ${error.message}`);
        }
    }

    /**
     * Write metadata to deck-index.json atomically
     * @param {Array} data - Array of deck objects
     */
    writeMetadata(data) {
        try {
            const startTime = Date.now();

            // Validate before writing
            this.validateMetadataArray(data);

            // Atomic write: write to temp file, then rename
            const tempFile = `${this.metadataFile}.tmp`;
            const content = JSON.stringify(data, null, 2);

            fs.writeFileSync(tempFile, content, 'utf8');
            fs.renameSync(tempFile, this.metadataFile);

            return true;
        } catch (error) {
            throw new Error(`Failed to write metadata: ${error.message}`);
        }
    }

    /**
     * Update a specific deck's status and additional fields
     * @param {string} deckId - Deck ID to update
     * @param {string} status - New status ('active' or 'archived')
     * @param {Object} additionalFields - Additional fields to update
     */
    updateDeckStatus(deckId, status, additionalFields = {}) {
        const metadata = this.readMetadata();
        const deck = metadata.find(d => d.id === deckId);

        if (!deck) {
            throw new Error(`Deck not found: ${deckId}`);
        }

        deck.status = status;

        // Add timestamp fields
        if (status === 'archived') {
            deck.archivedAt = new Date().toISOString();
        } else if (status === 'active') {
            deck.restoredAt = new Date().toISOString();
        }

        // Merge additional fields
        Object.assign(deck, additionalFields);

        this.writeMetadata(metadata);
        return deck;
    }

    /**
     * Update any fields of a specific deck
     * @param {string} deckId - Deck ID to update
     * @param {Object} updates - Fields to update
     */
    updateDeck(deckId, updates) {
        const metadata = this.readMetadata();
        const deck = metadata.find(d => d.id === deckId);

        if (!deck) {
            throw new Error(`Deck not found: ${deckId}`);
        }

        Object.assign(deck, updates);

        this.writeMetadata(metadata);
        return deck;
    }

    /**
     * Get decks filtered by status
     * @param {string} status - Status to filter by ('active' or 'archived')
     * @returns {Array} Filtered deck array
     */
    getDecksByStatus(status) {
        const metadata = this.readMetadata();
        return metadata.filter(d => d.status === status);
    }

    /**
     * Get a specific deck by ID
     * @param {string} deckId - Deck ID
     * @returns {Object|null} Deck object or null if not found
     */
    getDeckById(deckId) {
        const metadata = this.readMetadata();
        return metadata.find(d => d.id === deckId) || null;
    }

    /**
     * Validate metadata schema for a single deck
     * @param {Object} deck - Deck object to validate
     * @returns {boolean} True if valid
     */
    validateMetadata(deck) {
        const requiredFields = ['id', 'title', 'description', 'status'];

        for (const field of requiredFields) {
            if (!deck[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Validate status
        if (!['active', 'archived'].includes(deck.status)) {
            throw new Error(`Invalid status: ${deck.status}. Must be 'active' or 'archived'`);
        }

        // Validate archived deck has archivedAt
        if (deck.status === 'archived' && !deck.archivedAt) {
            console.warn(`Archived deck ${deck.id} missing archivedAt timestamp`);
        }

        return true;
    }

    /**
     * Validate an array of deck metadata
     * @param {Array} data - Array of deck objects
     * @returns {boolean} True if all valid
     */
    validateMetadataArray(data) {
        if (!Array.isArray(data)) {
            throw new Error('Metadata must be an array');
        }

        data.forEach((deck, index) => {
            try {
                this.validateMetadata(deck);
            } catch (error) {
                throw new Error(`Invalid deck at index ${index}: ${error.message}`);
            }
        });

        return true;
    }

    /**
     * Ensure all decks have required fields for archive system
     */
    migrateMetadataSchema() {
        const metadata = this.readMetadata();
        let modified = false;

        metadata.forEach(deck => {
            // Ensure status field exists
            if (!deck.status) {
                deck.status = 'active';
                modified = true;
            }

            // Add version if missing
            if (deck.version === undefined) {
                deck.version = 1;
                modified = true;
            }

            // Add hasLargeAssets if missing
            if (deck.hasLargeAssets === undefined) {
                deck.hasLargeAssets = false;
                modified = true;
            }
        });

        if (modified) {
            this.writeMetadata(metadata);
            console.log('Metadata schema migrated successfully');
        }

        return modified;
    }
}

module.exports = new MetadataManager();
