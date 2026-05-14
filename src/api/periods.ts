import { invoke } from "@tauri-apps/api/core";
import type { Period } from "../types";

export const periods = {
  current: () => invoke<Period>("get_current_period"),
  close: () => invoke<Period>("close_period"),
  list: () => invoke<Period[]>("get_periods"),
};
