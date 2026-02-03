// import Database from 'better-sqlite3';
import { createRequire } from 'module';
import path from 'path';
import {app} from 'electron';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

let db: Database;

/**
 * Initializes the SQLite database.
 * - Creates the database file in the userData folder.
 * - Enables foreign keys.
 * - Creates tables if they do not exist.
 * - Ensures a default human player exists.
 */
function initDb(): void {
    const dbPath = path.join(app.getPath('userData'), 'leaderboard.db');

    db = new Database(dbPath);
    db.pragma('foreign_keys = ON;');

    db.exec(`
        CREATE TABLE IF NOT EXISTS players (
           id INTEGER PRIMARY KEY,
           name TEXT NOT NULL,
           is_bot INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            logo_path TEXT
        );

        CREATE TABLE IF NOT EXISTS levels (
            id INTEGER PRIMARY KEY,
            game_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            image_path TEXT,
            
            FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS times (
            id INTEGER PRIMARY KEY,
            level_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            time_ms INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
            FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
        );
    `);

    ensureDefaultPlayer();
}

/**
 * Ensures that a default human player exists.
 * If no human player is found, inserts one named "Me".
 */
function ensureDefaultPlayer(): void {
    const stmt = db.prepare(`
        SELECT id
        FROM players
        WHERE is_bot = 0 LIMIT 1;
    `);

    const row = stmt.get();

    if (!row) {
        db.prepare(`
            INSERT INTO players (name, is_bot)
            VALUES ('Me', 0);
        `).run();
    }
}

/**
 * Returns the active database instance.
 * @returns {Database.Database} The initialized SQLite database.
 * @throws {Error} If the database has not been initialized.
 */
function getDb(): Database {
    if (!db) {
        throw new Error('Database has not been initialized. Call initDb() first.');
    }

    return db;
}

// Export a clean global object
export {
    initDb,
    getDb
};
