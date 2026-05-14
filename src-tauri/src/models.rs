use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Resident {
    pub id: i64,
    pub name: String,
    pub phone: String,
    pub email: String,
    pub notes: String,
    pub is_active: bool,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HouseWithResident {
    pub id: i64,
    pub resident_id: i64,
    pub house_code: String,
    pub account_number: String,
    pub meter_number: String,
    pub resident_name: String,
    pub notes: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Period {
    pub id: i64,
    pub code: String,
    pub label: String,
    pub is_open: bool,
    pub opened_at: String,
    pub closed_at: Option<String>,
    pub due_date: Option<String>,
    pub notes: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Reading {
    pub id: i64,
    pub house_id: i64,
    pub period_id: i64,
    pub previous_reading: f64,
    pub current_reading: f64,
    pub consumption: f64,
    pub reading_date: String,
    pub notes: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ReadingWithDetails {
    pub id: i64,
    pub house_id: i64,
    pub period_id: i64,
    pub previous_reading: f64,
    pub current_reading: f64,
    pub consumption: f64,
    pub reading_date: String,
    pub notes: String,
    pub period_code: String,
    pub house_code: String,
    pub resident_name: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateResidentInput {
    pub name: String,
    #[serde(default)]
    pub phone: String,
    #[serde(default)]
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateResidentInput {
    pub id: i64,
    pub name: String,
    pub phone: String,
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateHouseInput {
    pub resident_id: i64,
    pub house_code: String,
    #[serde(default)]
    pub account_number: String,
    #[serde(default)]
    pub meter_number: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateHouseInput {
    pub id: i64,
    pub resident_id: i64,
    pub house_code: String,
    pub account_number: String,
    pub meter_number: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateReadingInput {
    pub house_id: i64,
    pub current_reading: f64,
    #[serde(default)]
    pub notes: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ReadingsTableRow {
    pub house_id: i64,
    pub house_code: String,
    pub resident_name: String,
    pub previous_reading: f64,
    pub current_reading: Option<f64>,
    pub reading_id: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateReadingInput {
    pub id: i64,
    pub current_reading: f64,
    #[serde(default)]
    pub notes: String,
}
