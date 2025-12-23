# Archive System with PostgreSQL & Docker

## Overview
This implementation provides a robust archive system with:
- **Separate archive table** with automatic compression (LZ4)
- **Automatic cleanup** of archives older than 90 days
- **Persistent data storage** via Docker volumes
- **Database-level compression** to reduce storage size

## Architecture

### Database Tables
1. **`decks`** - Active presentation decks
2. **`archived_decks`** - Archived decks with LZ4 compression
3. **`cleanup_jobs`** - Tracks automatic cleanup runs

### Storage Reduction
- **Application-level compression**: Gzip compression of JSON data
- **Database-level compression**: LZ4 TOAST compression (2-3x reduction)
- **Automatic cleanup**: Deletes archives older than 90 days

## Setup Instructions

### 1. Install Dependencies
```bash
npm install pg
```

### 2. Start PostgreSQL with Docker
```bash
# Start PostgreSQL container with persistent storage
docker-compose up -d

# Check if container is running
docker ps

# View logs
docker-compose logs -f postgres
```

### 3. Configure Environment
Copy `.env.example` to `.env` and update if needed:
```bash
cp .env.example .env
```

### 4. Migrate Existing Archives (Optional)
If you have existing file-based archives:
```bash
node server/database/migrate-archives.js
```

### 5. Update Server to Use Archive Service
Add to your `server/index.js`:

```javascript
// Add at the top with other requires
const db = require('./database/db');
const archiveService = require('./services/archive-service');
const archiveRoutes = require('./routes/archive');

// Add after other middleware
app.use('/api/archive', archiveRoutes);

// Start automatic cleanup (add before app.listen)
const retentionDays = parseInt(process.env.ARCHIVE_RETENTION_DAYS) || 90;
const cleanupInterval = parseInt(process.env.ARCHIVE_CLEANUP_INTERVAL_HOURS) || 24;
archiveService.startAutoCleanup(cleanupInterval, retentionDays);

// Health check endpoint
app.get('/api/health/db', async (req, res) => {
    const isHealthy = await db.ping();
    res.status(isHealthy ? 200 : 503).json({ 
        database: isHealthy ? 'connected' : 'disconnected' 
    });
});
```

## API Endpoints

### Archive Operations

#### Archive Single Deck
```bash
POST /api/archive/deck/:deckId
```

#### Archive Multiple Decks
```bash
POST /api/archive/bulk
Body: { "deckIds": ["deck1", "deck2"] }
```

#### Restore Single Deck
```bash
POST /api/archive/restore/:deckId
```

#### Restore Multiple Decks
```bash
POST /api/archive/restore-bulk
Body: { "deckIds": ["deck1", "deck2"] }
```

#### List Archived Decks
```bash
GET /api/archive/list
```

#### Get Archive Statistics
```bash
GET /api/archive/stats
```

#### Manual Cleanup
```bash
POST /api/archive/cleanup
Body: { "retentionDays": 90 } (optional)
```

## How It Works

### 1. Archiving Process
```
Active Deck → Compress (Gzip) → Store in archived_decks → Delete from decks
```

### 2. Storage Reduction
- **Before**: 10KB JSON data
- **After Gzip**: ~3KB (70% reduction)
- **After LZ4 TOAST**: ~2KB (80% total reduction)

### 3. Automatic Cleanup
- Runs every 24 hours (configurable)
- Deletes archives older than 90 days (configurable)
- Logs all cleanup operations in `cleanup_jobs` table

### 4. Data Persistence
- PostgreSQL data stored in Docker volume `postgres_data`
- Survives container restarts and rebuilds
- Can be backed up using `docker volume` commands

## Docker Commands

### Start Database
```bash
docker-compose up -d
```

### Stop Database
```bash
docker-compose down
```

### Stop and Remove Data (⚠️ Destructive)
```bash
docker-compose down -v
```

### Backup Database
```bash
docker exec ppt_postgres pg_dump -U ppt_user ppt_database > backup.sql
```

### Restore Database
```bash
docker exec -i ppt_postgres psql -U ppt_user ppt_database < backup.sql
```

### Access PostgreSQL CLI
```bash
docker exec -it ppt_postgres psql -U ppt_user -d ppt_database
```

## Monitoring

### Check Archive Stats
```bash
curl http://localhost:3001/api/archive/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "total_archived": 45,
    "archived_last_week": 5,
    "archived_last_month": 12,
    "pending_cleanup": 3,
    "table_size": "2048 kB"
  }
}
```

### View Cleanup History
```sql
SELECT * FROM cleanup_jobs ORDER BY last_run DESC LIMIT 10;
```

## Configuration

### Environment Variables
- `DB_USER` - Database user (default: ppt_user)
- `DB_HOST` - Database host (default: localhost)
- `DB_NAME` - Database name (default: ppt_database)
- `DB_PASSWORD` - Database password (default: ppt_password)
- `DB_PORT` - Database port (default: 5432)
- `ARCHIVE_RETENTION_DAYS` - Days to keep archives (default: 90)
- `ARCHIVE_CLEANUP_INTERVAL_HOURS` - Cleanup frequency (default: 24)

## Troubleshooting

### Database Connection Failed
```bash
# Check if container is running
docker ps

# Check container logs
docker-compose logs postgres

# Restart container
docker-compose restart postgres
```

### Migration Issues
```bash
# Check database connection
node -e "require('./server/database/db').ping().then(console.log)"

# Run migration with verbose logging
NODE_ENV=development node server/database/migrate-archives.js
```

## Benefits

✅ **Reduced Storage**: 70-80% reduction via compression  
✅ **Automatic Cleanup**: No manual intervention needed  
✅ **Data Persistence**: Survives server restarts  
✅ **Easy Backup**: Standard PostgreSQL tools  
✅ **Scalable**: Can handle thousands of archives  
✅ **Transparent**: Compression is automatic  

## Next Steps

1. Update frontend to use new API endpoints
2. Add archive browsing UI
3. Implement archive search functionality
4. Add export/import features for archives
