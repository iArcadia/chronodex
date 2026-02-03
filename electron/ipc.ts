import {ipcMain} from 'electron';
import {getDb} from './db';

/**
 * Register all IPC handlers for the application.
 */
function registerIpcHandlers(): void {
    /**
     * Create a new game.
     */
    ipcMain.handle('game:create', (_event, name: string, logoPath: string|null) => {
        const db = getDb();

        const stmt = db.prepare(`
            INSERT INTO games (name, logo_path)
            VALUES (?, ?)
        `);

        const result = stmt.run(name, logoPath);

        return result.lastInsertRowid;
    });

    /**
     * Fetch all games.
     */
    ipcMain.handle('game:list', () => {
        const db = getDb();

        const stmt = db.prepare(`
            SELECT id, name, logo_path
            FROM games
            ORDER BY name ASC
        `);

        return stmt.all();
    });
}

export {
    registerIpcHandlers,
};