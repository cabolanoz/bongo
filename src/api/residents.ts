import { invoke } from "@tauri-apps/api/core";
import type { Resident } from "../types";

export const residents = {
  list: () => invoke<Resident[]>("get_residents"),
  create: (data: { name: string; phone?: string; email?: string }) =>
    invoke<Resident>("create_resident", data),
  update: (data: Resident) => invoke<Resident>("update_resident", { ...data }),
  deactivate: (id: number) => invoke<Resident>("deactivate_resident", { id }),
};
