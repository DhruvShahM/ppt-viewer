const path = require('path');

/**
 * Archive System Configuration
 * Central configuration for all archive operations
 */

const ROOT_DIR = path.join(__dirname, '..', '..');

const config = {
    // Repository Paths
    mainRepo: ROOT_DIR,
    archiveRepo: path.join(ROOT_DIR, '..', 'go-concurrency-ppt-archive'),

    // Backup Configuration
    backupDir: path.join(ROOT_DIR, 'backups'),
    backupRetentionDays: 30,
    enableEncryption: true,
    encryptionKey: process.env.ARCHIVE_ENCRYPTION_KEY || 'default-key-change-in-production',

    // Metadata
    metadataFile: path.join(ROOT_DIR, 'src', 'data', 'deck-index.json'),

    // Audit Logging
    auditLogDir: path.join(ROOT_DIR, 'server', 'logs'),
    auditLogFile: path.join(ROOT_DIR, 'server', 'logs', 'audit.log'),

    // Performance Thresholds
    performanceThresholds: {
        metadataOperationMs: 200,
        gitOperationMs: 2000,
    },

    // Git LFS Configuration
    lfsPatterns: [
        '*.mp4',
        '*.webm',
        '*.png',
        '*.jpg',
        '*.jpeg',
        '*.gif',
        '*.pdf',
        '*.zip',
    ],

    // Security
    securitySettings: {
        requireAuth: false, // Set to true when user authentication is implemented
        allowedOperations: ['archive', 'restore', 'list'],
        maxConcurrentOperations: 1,
    },

    // Git Configuration
    gitConfig: {
        userName: 'Archive System',
        userEmail: 'archive@system.local',
    },

    // Folders to archive
    archiveFolders: {
        decks: 'src/decks',
        slides: 'src/slides',
    },
};

module.exports = config;
