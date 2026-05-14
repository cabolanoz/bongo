export interface Resident {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface House {
  id: number;
  resident_id: number;
  house_code: string;
  account_number: string;
  meter_number: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HouseWithResident extends House {
  resident_name: string;
}

export interface Period {
  id: number;
  code: string;
  label: string;
  is_open: boolean;
  opened_at: string;
  closed_at: string | null;
  due_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Reading {
  id: number;
  house_id: number;
  period_id: number;
  previous_reading: number;
  current_reading: number;
  consumption: number;
  reading_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ReadingsTableRow {
  house_id: number;
  house_code: string;
  resident_name: string;
  previous_reading: number;
  current_reading: number | null;
  reading_id: number | null;
}

export interface ReadingWithDetails {
  id: number;
  house_id: number;
  period_id: number;
  previous_reading: number;
  current_reading: number;
  consumption: number;
  reading_date: string;
  notes: string;
  period_code: string;
  house_code: string;
  resident_name: string;
  created_at: string;
  updated_at: string;
}
