import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { createRequire } from "module";
const require$1 = createRequire(import.meta.url);
const Database = require$1("better-sqlite3");
let db;
function initDb() {
  const dbPath = path.join(app.getPath("userData"), "leaderboard.db");
  db = new Database(dbPath);
  db.pragma("foreign_keys = ON;");
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
function ensureDefaultPlayer() {
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
const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
let mainWindow = null;
function createWindow() {
  console.log(__dirname$1);
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      contextIsolation: true
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    console.log("hello");
    mainWindow.loadFile(path.join(__dirname$1, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
function initialize() {
  initDb();
  createWindow();
}
app.whenReady().then(() => {
  initialize();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
