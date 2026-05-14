use calamine::{DataType, Reader};
use crate::db::Database;

#[derive(Debug, serde::Serialize)]
pub struct ImportResult {
    pub residents: u32,
    pub houses: u32,
    pub readings: u32,
}

struct MonthDef {
    period: &'static str,
    label: &'static str,
    col: usize,
}

const MONTHS: &[MonthDef] = &[
    MonthDef { period: "2024-08", label: "AGOSTO 2024", col: 7 },
    MonthDef { period: "2024-09", label: "SEPTIEMBRE 2024", col: 8 },
    MonthDef { period: "2024-10", label: "OCTUBRE 2024", col: 9 },
    MonthDef { period: "2024-11", label: "NOVIEMBRE 2024", col: 10 },
    MonthDef { period: "2024-12", label: "DICIEMBRE 2024", col: 11 },
];

pub fn run_import(db: &Database) -> Result<ImportResult, String> {
    let path = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../FACTURACION.xlsm");

    let mut workbook: calamine::Xlsx<_> =
        calamine::open_workbook(&path).map_err(|e| format!("No se pudo abrir el archivo: {}", e))?;

    let sheet = workbook
        .worksheet_range("Residentes")
        .map_err(|e| format!("No se encontró la hoja 'Residentes': {}", e))?;

    let conn = db.conn.lock().map_err(|e| e.to_string())?;

    let mut residents_created = 0u32;
    let mut houses_created = 0u32;
    let mut readings_created = 0u32;

    // Pre-create periods
    for m in MONTHS {
        conn.execute(
            "INSERT OR IGNORE INTO periods (code, label, is_open) VALUES (?1, ?2, 0)",
            rusqlite::params![m.period, m.label],
        )
        .map_err(|e| e.to_string())?;
    }

    let mut period_ids: Vec<(String, i64)> = Vec::new();
    let mut stmt = conn
        .prepare("SELECT code, id FROM periods WHERE code LIKE '2024-%' ORDER BY code")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
        })
        .map_err(|e| e.to_string())?;
    for row in rows {
        let (code, id) = row.map_err(|e| e.to_string())?;
        period_ids.push((code, id));
    }

    for row in sheet.rows().skip(4) {
        let casa = match row.get(1).and_then(|d| d.get_string()) {
            Some(s) => s.trim().to_string(),
            None => continue,
        };
        if casa.is_empty() {
            continue;
        }

        let nombre = match row.get(2).and_then(|d| d.get_string()) {
            Some(s) => s.trim().to_string(),
            None => continue,
        };
        if nombre.is_empty() {
            continue;
        }

        let cuenta = row
            .get(3)
            .and_then(|d| d.get_string())
            .unwrap_or("")
            .trim()
            .to_string();
        let medidor = row
            .get(4)
            .and_then(|d| d.get_string())
            .unwrap_or("")
            .trim()
            .to_string();

        // Find or create resident
        let resident_id: i64 = match conn.query_row(
            "SELECT id FROM residents WHERE name = ?1",
            rusqlite::params![nombre],
            |row| row.get(0),
        ) {
            Ok(id) => id,
            Err(_) => {
                conn.execute(
                    "INSERT INTO residents (name) VALUES (?1)",
                    rusqlite::params![nombre],
                )
                .map_err(|e| e.to_string())?;
                residents_created += 1;
                conn.last_insert_rowid()
            }
        };

        // Find or create house by account_number (unique identifier)
        let house_id: i64 = if !cuenta.is_empty() {
            match conn.query_row(
                "SELECT id FROM houses WHERE account_number = ?1",
                rusqlite::params![cuenta],
                |row| row.get(0),
            ) {
                Ok(id) => id,
                Err(_) => {
                    conn.execute(
                        "INSERT INTO houses (resident_id, house_code, account_number, meter_number) VALUES (?1, ?2, ?3, ?4)",
                        rusqlite::params![resident_id, casa, cuenta, medidor],
                    )
                    .map_err(|e| e.to_string())?;
                    houses_created += 1;
                    conn.last_insert_rowid()
                }
            }
        } else {
            conn.execute(
                "INSERT INTO houses (resident_id, house_code, account_number, meter_number) VALUES (?1, ?2, ?3, ?4)",
                rusqlite::params![resident_id, casa, cuenta, medidor],
            )
            .map_err(|e| e.to_string())?;
            houses_created += 1;
            conn.last_insert_rowid()
        };

        // Process monthly readings
        let mut prev_reading = 0.0;
        for m in MONTHS.iter() {
            let raw = row.get(m.col).and_then(|d| d.get_float()).unwrap_or(0.0);

            let period_id = period_ids
                .iter()
                .find(|(code, _)| code == m.period)
                .map(|(_, id)| *id);

            if let Some(pid) = period_id {
                let current = raw;
                let consumption = current - prev_reading;

                let exists: bool = conn
                    .query_row(
                        "SELECT COUNT(*) FROM readings WHERE house_id = ?1 AND period_id = ?2",
                        rusqlite::params![house_id, pid],
                        |row| row.get::<_, i64>(0),
                    )
                    .map(|count| count > 0)
                    .unwrap_or(false);

                if !exists && current > 0.0 {
                    conn.execute(
                        "INSERT INTO readings (house_id, period_id, previous_reading, current_reading, consumption) VALUES (?1, ?2, ?3, ?4, ?5)",
                        rusqlite::params![house_id, pid, prev_reading, current, consumption],
                    )
                    .map_err(|e| e.to_string())?;
                    readings_created += 1;
                }

                prev_reading = current;
            }
        }
    }

    Ok(ImportResult {
        residents: residents_created,
        houses: houses_created,
        readings: readings_created,
    })
}
