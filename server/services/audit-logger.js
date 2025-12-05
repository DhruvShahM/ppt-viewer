const fs = require('fs');
const path = require('path');
const config = require('../config/archive-config');

/**
 * Audit Logger Service
 * Logs all archive and restore operations for auditing and debugging
 */

class AuditLogger {
    constructor() {
        this.logFile = config.auditLogFile;
        this.logDir = config.auditLogDir;

        // Ensure log directory exists
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Log an operation
     * @param {string} operation - Operation type (archive/restore)
     * @param {string} deckId - Deck ID
     * @param {Object} details - Operation details
     * @param {string} status - Operation status (success/failure)
     * @param {string} error - Error message if failed
     */
    log(operation, deckId, details = {}, status = 'success', error = null) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            operation,
            deckId,
            status,
            details,
            error,
        };

        // Append to log file (JSON Lines format)
        const logLine = JSON.stringify(logEntry) + '\n';
        fs.appendFileSync(this.logFile, logLine, 'utf8');

        console.log(`[Audit] ${operation} ${deckId}: ${status}`);
    }

    /**
     * Log archive operation
     * @param {string} deckId - Deck ID
     * @param {Object} details - Archive details
     */
    logArchive(deckId, details) {
        this.log('archive', deckId, details, 'success');
    }

    /**
     * Log restore operation
     * @param {string} deckId - Deck ID
     * @param {Object} details - Restore details
     */
    logRestore(deckId, details) {
        this.log('restore', deckId, details, 'success');
    }

    /**
     * Log failed operation
     * @param {string} operation - Operation type
     * @param {string} deckId - Deck ID
     * @param {string} error - Error message
     */
    logFailure(operation, deckId, error) {
        this.log(operation, deckId, {}, 'failure', error);
    }

    /**
     * Query audit log for a specific deck
     * @param {string} deckId - Deck ID
     * @returns {Array} Array of log entries
     */
    queryByDeck(deckId) {
        if (!fs.existsSync(this.logFile)) {
            return [];
        }

        const content = fs.readFileSync(this.logFile, 'utf8');
        const lines = content.trim().split('\n').filter(line => line);

        const entries = lines
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (error) {
                    return null;
                }
            })
            .filter(entry => entry && entry.deckId === deckId);

        return entries;
    }

    /**
     * Query audit log by operation type
     * @param {string} operation - Operation type
     * @returns {Array} Array of log entries
     */
    queryByOperation(operation) {
        if (!fs.existsSync(this.logFile)) {
            return [];
        }

        const content = fs.readFileSync(this.logFile, 'utf8');
        const lines = content.trim().split('\n').filter(line => line);

        const entries = lines
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (error) {
                    return null;
                }
            })
            .filter(entry => entry && entry.operation === operation);

        return entries;
    }

    /**
     * Get all audit logs
     * @param {number} limit - Maximum number of entries to return
     * @returns {Array} Array of log entries
     */
    getAllLogs(limit = 100) {
        if (!fs.existsSync(this.logFile)) {
            return [];
        }

        const content = fs.readFileSync(this.logFile, 'utf8');
        const lines = content.trim().split('\n').filter(line => line);

        const entries = lines
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (error) {
                    return null;
                }
            })
            .filter(entry => entry !== null)
            .slice(-limit); // Get last N entries

        return entries.reverse(); // Newest first
    }
}

module.exports = new AuditLogger();
