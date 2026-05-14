mod db;
mod models;
mod services;

use db::Database;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(&app_data_dir)?;
            let db_path = app_data_dir.join("bongo_production");
            let database =
                Database::new(&db_path).map_err(|e| Box::new(e) as Box<dyn std::error::Error>)?;

            if database.is_empty().unwrap_or(false) {
                eprintln!("Base de datos vacía — importando desde FACTURACION.xlsm...");
                if let Err(e) = services::seed::run_import(&database) {
                    eprintln!("Advertencia: importación de Excel falló: {}", e);
                }
            }

            app.manage(database);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            services::residents::get_residents,
            services::residents::create_resident,
            services::residents::update_resident,
            services::residents::deactivate_resident,
            services::houses::get_houses,
            services::houses::create_house,
            services::houses::update_house,
            services::houses::delete_house,
            services::periods::get_current_period,
            services::periods::close_period,
            services::periods::get_periods,
            services::readings::get_readings,
            services::readings::create_reading,
            services::readings::update_reading,
            services::readings::get_readings_table,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
