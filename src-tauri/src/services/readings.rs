use crate::db::Database;
use crate::models::*;
use crate::services::periods::ensure_active_period;
use tauri::State;

#[tauri::command]
pub fn get_readings(
    db: State<'_, Database>,
    house_id: i64,
) -> Result<Vec<ReadingWithDetails>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT r.id, r.house_id, r.period_id, r.previous_reading, r.current_reading, r.consumption,
                    r.reading_date, r.notes, p.code, h.house_code, res.name, r.created_at, r.updated_at
             FROM readings r
             JOIN periods p ON r.period_id = p.id
             JOIN houses h ON r.house_id = h.id
             JOIN residents res ON h.resident_id = res.id
             WHERE r.house_id = ?1
             ORDER BY p.code DESC",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map(rusqlite::params![house_id], |row| {
            Ok(ReadingWithDetails {
                id: row.get(0)?,
                house_id: row.get(1)?,
                period_id: row.get(2)?,
                previous_reading: row.get(3)?,
                current_reading: row.get(4)?,
                consumption: row.get(5)?,
                reading_date: row.get(6)?,
                notes: row.get(7)?,
                period_code: row.get(8)?,
                house_code: row.get(9)?,
                resident_name: row.get(10)?,
                created_at: row.get(11)?,
                updated_at: row.get(12)?,
            })
        })
        .map_err(|e| e.to_string())?;
    rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_reading(
    db: State<'_, Database>,
    input: CreateReadingInput,
) -> Result<Reading, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let period = ensure_active_period(&conn)?;

    let previous_reading: f64 = conn
        .query_row(
            "SELECT current_reading FROM readings WHERE house_id = ?1 ORDER BY period_id DESC LIMIT 1",
            rusqlite::params![input.house_id],
            |row| row.get(0),
        )
        .unwrap_or(0.0);

    let consumption = input.current_reading - previous_reading;

    conn.execute(
        "INSERT INTO readings (house_id, period_id, previous_reading, current_reading, consumption, notes) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        rusqlite::params![input.house_id, period.id, previous_reading, input.current_reading, consumption, input.notes],
    )
    .map_err(|e| e.to_string())?;

    let id = conn.last_insert_rowid();
    conn.query_row(
        "SELECT id, house_id, period_id, previous_reading, current_reading, consumption, reading_date, notes, created_at, updated_at
         FROM readings WHERE id = ?1",
        rusqlite::params![id],
        |row| {
            Ok(Reading {
                id: row.get(0)?,
                house_id: row.get(1)?,
                period_id: row.get(2)?,
                previous_reading: row.get(3)?,
                current_reading: row.get(4)?,
                consumption: row.get(5)?,
                reading_date: row.get(6)?,
                notes: row.get(7)?,
                created_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_readings_table(db: State<'_, Database>) -> Result<Vec<ReadingsTableRow>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let current_period = ensure_active_period(&conn)?;
    let prev_code = crate::services::periods::prev_code(&current_period.code);

    let mut stmt = conn
        .prepare(
            "SELECT h.id, h.house_code, res.name,
                    COALESCE(prev_r.current_reading, 0.0),
                    curr_r.current_reading,
                    curr_r.id
             FROM houses h
             JOIN residents res ON h.resident_id = res.id AND res.is_active = 1
             LEFT JOIN readings prev_r ON prev_r.house_id = h.id
                 AND prev_r.period_id = (SELECT id FROM periods WHERE code = ?1)
             LEFT JOIN readings curr_r ON curr_r.house_id = h.id
                 AND curr_r.period_id = ?2
             ORDER BY res.name, h.house_code",
        )
        .map_err(|e| e.to_string())?;

    let rows = stmt
        .query_map(rusqlite::params![prev_code, current_period.id], |row| {
            Ok(ReadingsTableRow {
                house_id: row.get(0)?,
                house_code: row.get(1)?,
                resident_name: row.get(2)?,
                previous_reading: row.get(3)?,
                current_reading: row.get(4)?,
                reading_id: row.get(5)?,
            })
        })
        .map_err(|e| e.to_string())?;
    rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_reading(
    db: State<'_, Database>,
    input: UpdateReadingInput,
) -> Result<Reading, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let reading = conn
        .query_row(
            "SELECT id, house_id, period_id, previous_reading, current_reading, consumption, reading_date, notes, created_at, updated_at
             FROM readings WHERE id = ?1",
            rusqlite::params![input.id],
            |row| {
                Ok(Reading {
                    id: row.get(0)?,
                    house_id: row.get(1)?,
                    period_id: row.get(2)?,
                    previous_reading: row.get(3)?,
                    current_reading: row.get(4)?,
                    consumption: row.get(5)?,
                    reading_date: row.get(6)?,
                    notes: row.get(7)?,
                    created_at: row.get(8)?,
                    updated_at: row.get(9)?,
                })
            },
        )
        .map_err(|e| e.to_string())?;

    let consumption = input.current_reading - reading.previous_reading;

    conn.execute(
        "UPDATE readings SET current_reading = ?1, consumption = ?2, notes = ?3, updated_at = datetime('now') WHERE id = ?4",
        rusqlite::params![input.current_reading, consumption, input.notes, input.id],
    )
    .map_err(|e| e.to_string())?;

    conn.query_row(
        "SELECT id, house_id, period_id, previous_reading, current_reading, consumption, reading_date, notes, created_at, updated_at
         FROM readings WHERE id = ?1",
        rusqlite::params![input.id],
        |row| {
            Ok(Reading {
                id: row.get(0)?,
                house_id: row.get(1)?,
                period_id: row.get(2)?,
                previous_reading: row.get(3)?,
                current_reading: row.get(4)?,
                consumption: row.get(5)?,
                reading_date: row.get(6)?,
                notes: row.get(7)?,
                created_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}
