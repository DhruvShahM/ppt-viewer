-- Create main decks table
CREATE TABLE IF NOT EXISTS decks (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    path VARCHAR(1000),
    category VARCHAR(100),
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    metadata JSONB
);

-- Create archived_decks table with compression
CREATE TABLE IF NOT EXISTS archived_decks (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    path VARCHAR(1000),
    category VARCHAR(100),
    tags TEXT[],
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    original_data JSONB, -- Compressed JSON data
    metadata JSONB
);

-- Enable TOAST compression (LZ4 for better performance)
ALTER TABLE archived_decks SET (toast_compression = 'lz4');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_decks_status ON decks(status);
CREATE INDEX IF NOT EXISTS idx_decks_category ON decks(category);
CREATE INDEX IF NOT EXISTS idx_decks_created_at ON decks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_archived_decks_archived_at ON archived_decks(archived_at DESC);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_decks_updated_at BEFORE UPDATE ON decks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function for automatic archive cleanup (older than 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_archives()
RETURNS void AS $$
BEGIN
    DELETE FROM archived_decks
    WHERE archived_at < NOW() - INTERVAL '90 days';
    
    RAISE NOTICE 'Cleaned up archives older than 90 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job table for tracking cleanup runs
CREATE TABLE IF NOT EXISTS cleanup_jobs (
    id SERIAL PRIMARY KEY,
    job_name VARCHAR(100) NOT NULL,
    last_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    deleted_count INTEGER DEFAULT 0
);

-- Insert initial cleanup job record
INSERT INTO cleanup_jobs (job_name, status) 
VALUES ('archive_cleanup', 'pending')
ON CONFLICT DO NOTHING;

COMMENT ON TABLE decks IS 'Active presentation decks';
COMMENT ON TABLE archived_decks IS 'Archived decks with automatic 90-day retention and LZ4 compression';
COMMENT ON FUNCTION cleanup_old_archives() IS 'Deletes archived decks older than 90 days';
