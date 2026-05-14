import { invoke } from "@tauri-apps/api/core";
import type { Reading, ReadingsTableRow, ReadingWithDetails } from "../types";

export const readings = {
  table: () => invoke<ReadingsTableRow[]>("get_readings_table"),
  list: (houseId: number) =>
    invoke<ReadingWithDetails[]>("get_readings", { house_id: houseId }),
  create: (data: {
    house_id: number;
    current_reading: number;
    notes?: string;
  }) => invoke<Reading>("create_reading", data),
  update: (data: {
    id: number;
    current_reading: number;
    notes?: string;
  }) => invoke<Reading>("update_reading", data),
};
