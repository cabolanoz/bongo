use crate::db::Database;
use crate::models::*;
use tauri::State;

fn row_to_resident(row: &rusqlite::Row) -> rusqlite::Result<Resident> {
    Ok(Resident {
        id: row.get(0)?,
        name: row.get(1)?,
        phone: row.get(2)?,
        email: row.get(3)?,
        notes: row.get(4)?,
        is_active: row.get(5)?,
        created_at: row.get(6)?,
        updated_at: row.get(7)?,
    })
}

const SELECT: &str =
    "SELECT id, name, phone, email, notes, is_active, created_at, updated_at FROM residents";

#[tauri::command]
pub fn get_residents(db: State<'_, Database>) -> Result<Vec<Resident>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(&format!("{} ORDER BY name", SELECT))
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], row_to_resident)
        .map_err(|e| e.to_string())?;
    rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_resident(
    db: State<'_, Database>,
    input: CreateResidentInput,
) -> Result<Resident, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO residents (name, phone, email) VALUES (?1, ?2, ?3)",
        rusqlite::params![input.name, input.phone, input.email],
    )
    .map_err(|e| e.to_string())?;
    let id = conn.last_insert_rowid();
    conn.query_row(
        &format!("{} WHERE id = ?1", SELECT),
        rusqlite::params![id],
        row_to_resident,
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_resident(
    db: State<'_, Database>,
    input: UpdateResidentInput,
) -> Result<Resident, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE residents SET name = ?1, phone = ?2, email = ?3, updated_at = datetime('now') WHERE id = ?4",
        rusqlite::params![input.name, input.phone, input.email, input.id],
    )
    .map_err(|e| e.to_string())?;
    conn.query_row(
        &format!("{} WHERE id = ?1", SELECT),
        rusqlite::params![input.id],
        row_to_resident,
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn deactivate_resident(db: State<'_, Database>, id: i64) -> Result<Resident, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE residents SET is_active = 0, updated_at = datetime('now') WHERE id = ?1",
        rusqlite::params![id],
    )
    .map_err(|e| e.to_string())?;
    conn.query_row(
        &format!("{} WHERE id = ?1", SELECT),
        rusqlite::params![id],
        row_to_resident,
    )
    .map_err(|e| e.to_string())
}
