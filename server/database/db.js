const { Pool } = require('pg');

class DatabaseService {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER || 'ppt_user',
            host: process.env.DB_HOST || 'localhost',
            database: process.env.DB_NAME || 'ppt_database',
            password: process.env.DB_PASSWORD || 'ppt_password',
            port: process.env.DB_PORT || 5432,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        this.pool.on('error', (err) => {
            console.error('Unexpected database error:', err);
        });
    }

    async query(text, params) {
        const start = Date.now();
        try {
            const res = await this.pool.query(text, params);
            const duration = Date.now() - start;
            console.log('Executed query', { text, duration, rows: res.rowCount });
            return res;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }

    async getClient() {
        return await this.pool.query();
    }

    async close() {
        await this.pool.end();
    }

    // Health check
    async ping() {
        try {
            await this.query('SELECT 1');
            return true;
        } catch (error) {
            console.error('Database ping failed:', error);
            return false;
        }
    }
}

module.exports = new DatabaseService();
