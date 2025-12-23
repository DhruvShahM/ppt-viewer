#!/usr/bin/env node

/**
 * Test script to verify archive system functionality
 */

const db = require('./database/db');
const archiveService = require('./services/archive-service');

async function runTests() {
    console.log('🧪 Testing Archive System\n');
    console.log('='.repeat(50));

    try {
        // Test 1: Database Connection
        console.log('\n[Test 1] Database Connection...');
        const isConnected = await db.ping();
        if (isConnected) {
            console.log('✅ Database connected successfully');
        } else {
            throw new Error('Database connection failed');
        }

        // Test 2: Get Archive Stats
        console.log('\n[Test 2] Archive Statistics...');
        const stats = await archiveService.getArchiveStats();
        console.log('✅ Archive stats retrieved:');
        console.log('   Total archived:', stats.total_archived);
        console.log('   Table size:', stats.table_size);
        console.log('   Pending cleanup:', stats.pending_cleanup);

        // Test 3: List Archived Decks
        console.log('\n[Test 3] List Archived Decks...');
        const archives = await archiveService.getArchivedDecks();
        console.log(`✅ Found ${archives.length} archived decks`);
        if (archives.length > 0) {
            console.log('   First archive:', archives[0].id);
        }

        // Test 4: Check Cleanup Function
        console.log('\n[Test 4] Cleanup Function (dry run)...');
        const result = await db.query(`
            SELECT COUNT(*) as count 
            FROM archived_decks 
            WHERE archived_at < NOW() - INTERVAL '90 days'
        `);
        console.log(`✅ Would delete ${result.rows[0].count} old archives`);

        // Test 5: Compression Test
        console.log('\n[Test 5] Compression Test...');
        const testData = {
            id: 'test-deck',
            title: 'Test Deck',
            content: 'A'.repeat(10000) // 10KB of data
        };
        const zlib = require('zlib');
        const { promisify } = require('util');
        const gzip = promisify(zlib.gzip);

        const original = JSON.stringify(testData);
        const compressed = await gzip(original);
        const ratio = ((1 - compressed.length / original.length) * 100).toFixed(2);

        console.log('✅ Compression test:');
        console.log(`   Original: ${original.length} bytes`);
        console.log(`   Compressed: ${compressed.length} bytes`);
        console.log(`   Reduction: ${ratio}%`);

        console.log('\n' + '='.repeat(50));
        console.log('✨ All tests passed!\n');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await db.close();
    }
}

// Run tests
runTests().then(() => {
    console.log('Test suite completed successfully');
    process.exit(0);
}).catch(err => {
    console.error('Test suite failed:', err);
    process.exit(1);
});
