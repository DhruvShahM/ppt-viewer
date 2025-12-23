const express = require('express');
const archiveService = require('../services/archive-service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const router = express.Router();

/**
 * POST /api/archive/deck/:deckId
 * Archive a single deck
 */
router.post('/deck/:deckId', catchAsync(async (req, res, next) => {
    const { deckId } = req.params;

    if (!deckId) {
        return next(new AppError('Deck ID is required', 400));
    }

    const result = await archiveService.archiveDeck(deckId);

    res.status(200).json({
        success: true,
        message: `Deck ${deckId} archived successfully`,
        data: result
    });
}));

/**
 * POST /api/archive/bulk
 * Archive multiple decks
 */
router.post('/bulk', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds array', 400));
    }

    const results = [];
    const errors = [];

    for (const deckId of deckIds) {
        try {
            const result = await archiveService.archiveDeck(deckId);
            results.push(result);
        } catch (error) {
            errors.push({ deckId, error: error.message });
        }
    }

    res.status(200).json({
        success: true,
        message: `Archived ${results.length} of ${deckIds.length} decks`,
        results,
        errors: errors.length > 0 ? errors : undefined
    });
}));

/**
 * POST /api/archive/restore/:deckId
 * Restore a single archived deck
 */
router.post('/restore/:deckId', catchAsync(async (req, res, next) => {
    const { deckId } = req.params;

    if (!deckId) {
        return next(new AppError('Deck ID is required', 400));
    }

    const result = await archiveService.restoreDeck(deckId);

    res.status(200).json({
        success: true,
        message: `Deck ${deckId} restored successfully`,
        data: result
    });
}));

/**
 * POST /api/archive/restore-bulk
 * Restore multiple archived decks
 */
router.post('/restore-bulk', catchAsync(async (req, res, next) => {
    const { deckIds } = req.body;

    if (!deckIds || !Array.isArray(deckIds) || deckIds.length === 0) {
        return next(new AppError('Invalid deckIds array', 400));
    }

    const results = [];
    const errors = [];

    for (const deckId of deckIds) {
        try {
            const result = await archiveService.restoreDeck(deckId);
            results.push(result);
        } catch (error) {
            errors.push({ deckId, error: error.message });
        }
    }

    res.status(200).json({
        success: true,
        message: `Restored ${results.length} of ${deckIds.length} decks`,
        results,
        errors: errors.length > 0 ? errors : undefined
    });
}));

/**
 * GET /api/archive/list
 * Get all archived decks
 */
router.get('/list', catchAsync(async (req, res, next) => {
    const archives = await archiveService.getArchivedDecks();

    res.status(200).json({
        success: true,
        count: archives.length,
        data: archives
    });
}));

/**
 * GET /api/archive/stats
 * Get archive statistics
 */
router.get('/stats', catchAsync(async (req, res, next) => {
    const stats = await archiveService.getArchiveStats();

    res.status(200).json({
        success: true,
        data: stats
    });
}));

/**
 * POST /api/archive/cleanup
 * Manually trigger cleanup of old archives
 */
router.post('/cleanup', catchAsync(async (req, res, next) => {
    const { retentionDays } = req.body;

    const result = await archiveService.cleanupOldArchives(
        retentionDays || parseInt(process.env.ARCHIVE_RETENTION_DAYS) || 90
    );

    res.status(200).json({
        success: true,
        message: `Cleanup completed: ${result.deletedCount} archives deleted`,
        data: result
    });
}));

module.exports = router;
