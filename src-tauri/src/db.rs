use rusqlite::Connection;
use std::path::Path;
use std::sync::Mutex;

pub struct Database {
    pub conn: Mutex<Connection>,
}

impl Database {
    pub fn is_empty(&self) -> Result<bool, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let count: i64 =
            conn.query_row("SELECT COUNT(*) FROM residents", [], |row| row.get(0))?;
        Ok(count == 0)
    }

    pub fn new(path: &Path) -> Result<Self, rusqlite::Error> {
        let conn = Connection::open(path)?;
        conn.execute_batch("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;")?;
        let db = Database {
            conn: Mutex::new(conn),
        };
        db.migrate()?;
        Ok(db)
    }

    fn migrate(&self) -> Result<(), rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        conn.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS residents (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                name      TEXT NOT NULL,
                phone     TEXT NOT NULL DEFAULT '',
                email     TEXT NOT NULL DEFAULT '',
                notes     TEXT NOT NULL DEFAULT '',
                is_active INTEGER NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                updated_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS houses (
                id             INTEGER PRIMARY KEY AUTOINCREMENT,
                resident_id    INTEGER NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
                house_code     TEXT NOT NULL,
                account_number TEXT NOT NULL DEFAULT '' UNIQUE,
                meter_number   TEXT NOT NULL DEFAULT '',
                notes          TEXT NOT NULL DEFAULT '',
                created_at     TEXT NOT NULL DEFAULT (datetime('now')),
                updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS periods (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                code      TEXT NOT NULL UNIQUE,
                label     TEXT NOT NULL,
                is_open   INTEGER NOT NULL DEFAULT 1,
                opened_at TEXT NOT NULL DEFAULT (datetime('now')),
                closed_at TEXT,
                due_date  TEXT,
                notes     TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                updated_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS readings (
                id               INTEGER PRIMARY KEY AUTOINCREMENT,
                house_id         INTEGER NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
                period_id        INTEGER NOT NULL REFERENCES periods(id),
                previous_reading REAL NOT NULL DEFAULT 0,
                current_reading  REAL NOT NULL DEFAULT 0,
                consumption      REAL NOT NULL DEFAULT 0,
                reading_date     TEXT NOT NULL DEFAULT (date('now')),
                notes            TEXT NOT NULL DEFAULT '',
                created_at       TEXT NOT NULL DEFAULT (datetime('now')),
                updated_at       TEXT NOT NULL DEFAULT (datetime('now')),
                UNIQUE(house_id, period_id)
            );

            CREATE INDEX IF NOT EXISTS idx_houses_resident ON houses(resident_id);
            CREATE INDEX IF NOT EXISTS idx_readings_house ON readings(house_id);
            CREATE INDEX IF NOT EXISTS idx_readings_period ON readings(period_id);
            ",
        )?;
        Ok(())
    }
}
