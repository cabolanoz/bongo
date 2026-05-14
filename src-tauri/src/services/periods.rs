use crate::db::Database;
use crate::models::*;
use tauri::State;

fn month_label(year: i32, month: u32) -> String {
    let m = match month {
        1 => "ENERO",
        2 => "FEBRERO",
        3 => "MARZO",
        4 => "ABRIL",
        5 => "MAYO",
        6 => "JUNIO",
        7 => "JULIO",
        8 => "AGOSTO",
        9 => "SEPTIEMBRE",
        10 => "OCTUBRE",
        11 => "NOVIEMBRE",
        12 => "DICIEMBRE",
        _ => return format!("{:04}-{:02}", year, month),
    };
    format!("{} {}", m, year)
}

pub fn ensure_active_period(conn: &rusqlite::Connection) -> Result<Period, String> {
    let result = conn.query_row(
        "SELECT id, code, label, is_open, opened_at, closed_at, due_date, notes, created_at, updated_at
         FROM periods WHERE is_open = 1 LIMIT 1",
        [],
        |row| {
            Ok(Period {
                id: row.get(0)?,
                code: row.get(1)?,
                label: row.get(2)?,
                is_open: row.get::<_, bool>(3)?,
                opened_at: row.get(4)?,
                closed_at: row.get(5)?,
                due_date: row.get(6)?,
                notes: row.get(7)?,
                created_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        },
    );

    match result {
        Ok(period) => Ok(period),
        Err(_) => {
            let now = chrono::Utc::now();
            let year = now.format("%Y").to_string().parse::<i32>().unwrap_or(2025);
            let month = now.format("%m").to_string().parse::<u32>().unwrap_or(1);
            let code = format!("{:04}-{:02}", year, month);
            let label = month_label(year, month);
            conn.execute(
                "INSERT INTO periods (code, label, is_open) VALUES (?1, ?2, 1)",
                rusqlite::params![code, label],
            )
            .map_err(|e| e.to_string())?;
            let id = conn.last_insert_rowid();
            conn.query_row(
                "SELECT id, code, label, is_open, opened_at, closed_at, due_date, notes, created_at, updated_at
                 FROM periods WHERE id = ?1",
                rusqlite::params![id],
                |row| {
                    Ok(Period {
                        id: row.get(0)?,
                        code: row.get(1)?,
                        label: row.get(2)?,
                        is_open: row.get::<_, bool>(3)?,
                        opened_at: row.get(4)?,
                        closed_at: row.get(5)?,
                        due_date: row.get(6)?,
                        notes: row.get(7)?,
                        created_at: row.get(8)?,
                        updated_at: row.get(9)?,
                    })
                },
            )
            .map_err(|e| e.to_string())
        }
    }
}

pub fn prev_code(current: &str) -> String {
    let parts: Vec<&str> = current.split('-').collect();
    if parts.len() != 2 {
        return current.to_string();
    }
    let year: i32 = parts[0].parse().unwrap_or(2024);
    let month: u32 = parts[1].parse().unwrap_or(1);
    if month == 1 {
        format!("{:04}-{:02}", year - 1, 12)
    } else {
        format!("{:04}-{:02}", year, month - 1)
    }
}

fn next_code(current: &str) -> String {
    let parts: Vec<&str> = current.split('-').collect();
    if parts.len() != 2 {
        return current.to_string();
    }
    let year: i32 = parts[0].parse().unwrap_or(2024);
    let month: u32 = parts[1].parse().unwrap_or(1);
    if month == 12 {
        format!("{:04}-{:02}", year + 1, 1)
    } else {
        format!("{:04}-{:02}", year, month + 1)
    }
}

#[tauri::command]
pub fn get_current_period(db: State<'_, Database>) -> Result<Period, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    ensure_active_period(&conn)
}

#[tauri::command]
pub fn close_period(db: State<'_, Database>) -> Result<Period, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let current = ensure_active_period(&conn)?;

    let now = chrono::Utc::now().format("%Y-%m-%d %H:%M:%S").to_string();
    conn.execute(
        "UPDATE periods SET is_open = 0, closed_at = ?1, updated_at = ?1 WHERE id = ?2",
        rusqlite::params![now, current.id],
    )
    .map_err(|e| e.to_string())?;

    let new_code = next_code(&current.code);
    let parts: Vec<&str> = new_code.split('-').collect();
    let new_label = if parts.len() == 2 {
        let y: i32 = parts[0].parse().unwrap_or(2025);
        let m: u32 = parts[1].parse().unwrap_or(1);
        month_label(y, m)
    } else {
        new_code.clone()
    };
    conn.execute(
        "INSERT INTO periods (code, label, is_open) VALUES (?1, ?2, 1)",
        rusqlite::params![new_code, new_label],
    )
    .map_err(|e| e.to_string())?;

    let new_id = conn.last_insert_rowid();
    conn.query_row(
        "SELECT id, code, label, is_open, opened_at, closed_at, due_date, notes, created_at, updated_at
         FROM periods WHERE id = ?1",
        rusqlite::params![new_id],
        |row| {
            Ok(Period {
                id: row.get(0)?,
                code: row.get(1)?,
                label: row.get(2)?,
                is_open: row.get::<_, bool>(3)?,
                opened_at: row.get(4)?,
                closed_at: row.get(5)?,
                due_date: row.get(6)?,
                notes: row.get(7)?,
                created_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_periods(db: State<'_, Database>) -> Result<Vec<Period>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT id, code, label, is_open, opened_at, closed_at, due_date, notes, created_at, updated_at
             FROM periods ORDER BY code DESC",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(Period {
                id: row.get(0)?,
                code: row.get(1)?,
                label: row.get(2)?,
                is_open: row.get::<_, bool>(3)?,
                opened_at: row.get(4)?,
                closed_at: row.get(5)?,
                due_date: row.get(6)?,
                notes: row.get(7)?,
                created_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        })
        .map_err(|e| e.to_string())?;
    rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}
