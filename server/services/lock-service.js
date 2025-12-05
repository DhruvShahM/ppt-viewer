/**
 * Lock Service
 * Manages in-memory locks to prevent concurrent operations on the same resource
 */

class LockService {
    constructor() {
        this.locks = new Map();
    }

    /**
     * Acquire a lock for a resource
     * @param {string} resourceId - ID of the resource to lock
     * @param {string} operation - Name of the operation requesting the lock
     * @returns {boolean} True if lock was acquired, false if already locked
     */
    acquire(resourceId, operation) {
        console.log(`[LockService] Acquiring lock for ${resourceId} (${operation})`);
        if (this.locks.has(resourceId)) {
            console.log(`[LockService] Failed to acquire lock for ${resourceId}. Already locked by:`, this.locks.get(resourceId));
            return false;
        }

        this.locks.set(resourceId, {
            operation,
            timestamp: Date.now()
        });
        console.log(`[LockService] Lock acquired for ${resourceId}`);
        return true;
    }

    /**
     * Release a lock for a resource
     * @param {string} resourceId - ID of the resource to unlock
     */
    release(resourceId) {
        console.log(`[LockService] Releasing lock for ${resourceId}`);
        this.locks.delete(resourceId);
    }

    /**
     * Check if a resource is locked
     * @param {string} resourceId - ID of the resource
     * @returns {boolean} True if locked
     */
    isLocked(resourceId) {
        return this.locks.has(resourceId);
    }

    /**
     * Get lock info for a resource
     * @param {string} resourceId - ID of the resource
     * @returns {Object|null} Lock info or null
     */
    getLockInfo(resourceId) {
        return this.locks.get(resourceId) || null;
    }
}

module.exports = new LockService();
