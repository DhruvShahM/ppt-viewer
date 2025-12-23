/**
 * INTEGRATION GUIDE
 * Add these snippets to your server/index.js
 */

// ============================================
// 1. ADD IMPORTS (at the top with other requires)
// ============================================
const db = require('./database/db');
const archiveService = require('./services/archive-service');
const archiveRoutes = require('./routes/archive');

// ============================================
// 2. ADD ROUTES (after other app.use statements)
// ============================================
app.use('/api/archive', archiveRoutes);

// ============================================
// 3. ADD HEALTH CHECK (optional but recommended)
// ============================================
app.get('/api/health/db', catchAsync(async (req, res, next) => {
    const isHealthy = await db.ping();
    res.status(isHealthy ? 200 : 503).json({
        database: isHealthy ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
}));

// ============================================
// 4. START AUTO-CLEANUP (before app.listen)
// ============================================
// Load environment variables
const retentionDays = parseInt(process.env.ARCHIVE_RETENTION_DAYS) || 90;
const cleanupInterval = parseInt(process.env.ARCHIVE_CLEANUP_INTERVAL_HOURS) || 24;

// Start automatic cleanup scheduler
archiveService.startAutoCleanup(cleanupInterval, retentionDays);
console.log(`🗄️  Archive system initialized (retention: ${retentionDays} days, cleanup: every ${cleanupInterval}h)`);

// ============================================
// 5. GRACEFUL SHUTDOWN (at the end of file)
// ============================================
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing database connection...');
    await db.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, closing database connection...');
    await db.close();
    process.exit(0);
});

// ============================================
// 6. REPLACE EXISTING ARCHIVE ENDPOINT (optional)
// ============================================
// If you have an existing /api/archive endpoint, replace it with:
app.post('/api/archive', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds', 400));
    }

    console.log(`Archiving decks to database: ${deckIds.join(', ')}`);

    const results = [];
    const errors = [];

    for (const deckId of deckIds) {
        try {
            const result = await archiveService.archiveDeck(deckId);
            results.push(result);
        } catch (error) {
            console.error(`Failed to archive ${deckId}:`, error);
            errors.push({ deckId, error: error.message });
        }
    }

    res.json({
        success: true,
        archived: results.length,
        total: deckIds.length,
        results,
        errors: errors.length > 0 ? errors : undefined
    });
}));

// ============================================
// 7. REPLACE EXISTING RESTORE ENDPOINT (optional)
// ============================================
// If you have an existing /api/restore endpoint, replace it with:
app.post('/api/restore', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds', 400));
    }

    console.log(`Restoring decks from database: ${deckIds.join(', ')}`);

    const results = [];
    const errors = [];

    for (const deckId of deckIds) {
        try {
            const result = await archiveService.restoreDeck(deckId);
            results.push(result);
        } catch (error) {
            console.error(`Failed to restore ${deckId}:`, error);
            errors.push({ deckId, error: error.message });
        }
    }

    res.json({
        success: true,
        restored: results.length,
        total: deckIds.length,
        results,
        errors: errors.length > 0 ? errors : undefined
    });
}));
