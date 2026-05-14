import { invoke } from "@tauri-apps/api/core";
import type { HouseWithResident } from "../types";

export const houses = {
  list: (residentId?: number) =>
    invoke<HouseWithResident[]>("get_houses", {
      resident_id: residentId ?? null,
    }),
  create: (data: {
    resident_id: number;
    house_code: string;
    account_number?: string;
    meter_number?: string;
  }) => invoke<HouseWithResident>("create_house", data),
  delete: (id: number) => invoke<void>("delete_house", { id }),
};
