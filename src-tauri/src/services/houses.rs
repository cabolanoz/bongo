use crate::db::Database;
use crate::models::*;
use tauri::State;

#[tauri::command]
pub fn get_houses(
    db: State<'_, Database>,
    resident_id: Option<i64>,
) -> Result<Vec<HouseWithResident>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let base = "SELECT h.id, h.resident_id, h.house_code, h.account_number, h.meter_number, r.name, h.notes, h.created_at, h.updated_at
                FROM houses h JOIN residents r ON h.resident_id = r.id";

    match resident_id {
        Some(rid) => {
            let mut stmt = conn
                .prepare(&format!("{} WHERE h.resident_id = ?1 ORDER BY h.house_code", base))
                .map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map(rusqlite::params![rid], |row| {
                    Ok(HouseWithResident {
                        id: row.get(0)?,
                        resident_id: row.get(1)?,
                        house_code: row.get(2)?,
                        account_number: row.get(3)?,
                        meter_number: row.get(4)?,
                        resident_name: row.get(5)?,
                        notes: row.get(6)?,
                        created_at: row.get(7)?,
                        updated_at: row.get(8)?,
                    })
                })
                .map_err(|e| e.to_string())?;
            rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
        }
        None => {
            let mut stmt = conn
                .prepare(&format!("{} ORDER BY h.house_code", base))
                .map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map([], |row| {
                    Ok(HouseWithResident {
                        id: row.get(0)?,
                        resident_id: row.get(1)?,
                        house_code: row.get(2)?,
                        account_number: row.get(3)?,
                        meter_number: row.get(4)?,
                        resident_name: row.get(5)?,
                        notes: row.get(6)?,
                        created_at: row.get(7)?,
                        updated_at: row.get(8)?,
                    })
                })
                .map_err(|e| e.to_string())?;
            rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
        }
    }
}

#[tauri::command]
pub fn create_house(
    db: State<'_, Database>,
    input: CreateHouseInput,
) -> Result<HouseWithResident, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO houses (resident_id, house_code, account_number, meter_number) VALUES (?1, ?2, ?3, ?4)",
        rusqlite::params![input.resident_id, input.house_code, input.account_number, input.meter_number],
    )
    .map_err(|e| e.to_string())?;
    let id = conn.last_insert_rowid();
    conn.query_row(
        "SELECT h.id, h.resident_id, h.house_code, h.account_number, h.meter_number, r.name, h.notes, h.created_at, h.updated_at
         FROM houses h JOIN residents r ON h.resident_id = r.id WHERE h.id = ?1",
        rusqlite::params![id],
        |row| {
            Ok(HouseWithResident {
                id: row.get(0)?,
                resident_id: row.get(1)?,
                house_code: row.get(2)?,
                account_number: row.get(3)?,
                meter_number: row.get(4)?,
                resident_name: row.get(5)?,
                notes: row.get(6)?,
                created_at: row.get(7)?,
                updated_at: row.get(8)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_house(
    db: State<'_, Database>,
    input: UpdateHouseInput,
) -> Result<HouseWithResident, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE houses SET resident_id = ?1, house_code = ?2, account_number = ?3, meter_number = ?4, updated_at = datetime('now') WHERE id = ?5",
        rusqlite::params![input.resident_id, input.house_code, input.account_number, input.meter_number, input.id],
    )
    .map_err(|e| e.to_string())?;
    conn.query_row(
        "SELECT h.id, h.resident_id, h.house_code, h.account_number, h.meter_number, r.name, h.notes, h.created_at, h.updated_at
         FROM houses h JOIN residents r ON h.resident_id = r.id WHERE h.id = ?1",
        rusqlite::params![input.id],
        |row| {
            Ok(HouseWithResident {
                id: row.get(0)?,
                resident_id: row.get(1)?,
                house_code: row.get(2)?,
                account_number: row.get(3)?,
                meter_number: row.get(4)?,
                resident_name: row.get(5)?,
                notes: row.get(6)?,
                created_at: row.get(7)?,
                updated_at: row.get(8)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_house(db: State<'_, Database>, id: i64) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM houses WHERE id = ?1", rusqlite::params![id])
        .map_err(|e| e.to_string())?;
    Ok(())
}
