import { api } from "../api";
import type { ReadingsTableRow, Period } from "../types";

class AppReadings extends HTMLElement {
  private rows: ReadingsTableRow[] = [];
  private filtered: ReadingsTableRow[] = [];
  private period: Period | null = null;
  private saving = new Set<number>();

  connectedCallback() {
    this.render();
    this.load();
  }

  async load() {
    try {
      const [rows, period] = await Promise.all([
        api.readings.table(),
        api.periods.current(),
      ]);
      this.rows = rows;
      this.filtered = rows;
      this.period = period;
      this.renderBadge();
      this.renderTable();
    } catch (e) {
      alert(String(e));
    }
  }

  render() {
    this.innerHTML =
      '<div class="space-y-4">' +
      '<div class="flex items-center justify-between">' +
      '<h2 class="text-2xl font-bold text-gray-800">Lecturas del Mes</h2>' +
      '<span id="period-badge" class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"></span>' +
      "</div>" +
      '<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">' +
      '<input id="search-input" type="text" placeholder="Buscar por casa o residente..."' +
      ' class="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      "</div>" +
      '<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">' +
      '<div class="overflow-x-auto">' +
      '<table class="w-full text-sm">' +
      '<thead class="bg-gray-50 text-gray-600 uppercase text-xs">' +
      "<tr>" +
      '<th class="text-left px-4 py-3">Casa</th>' +
      '<th class="text-left px-4 py-3">Residente</th>' +
      '<th class="text-right px-4 py-3">Mes Anterior (m\u00B3)</th>' +
      '<th class="text-right px-4 py-3 w-48">Lectura Actual (m\u00B3)</th>' +
      '<th class="text-center px-4 py-3 w-24">Acci\u00F3n</th>' +
      "</tr>" +
      "</thead>" +
      '<tbody id="readings-tbody" class="divide-y divide-gray-100"></tbody>' +
      "</table>" +
      "</div>" +
      '<p id="row-count" class="px-4 py-2 text-xs text-gray-400 border-t"></p>' +
      "</div>" +
      "</div>";

    this.querySelector("#search-input")!.addEventListener("input", () => this.filter());
  }

  renderBadge() {
    const badge = this.querySelector("#period-badge")!;
    if (this.period) {
      badge.textContent = this.period.label;
    }
  }

  filter() {
    const q = (this.querySelector("#search-input") as HTMLInputElement).value.toLowerCase().trim();
    if (!q) {
      this.filtered = this.rows;
    } else {
      this.filtered = this.rows.filter(
        (r) =>
          r.house_code.toLowerCase().includes(q) ||
          r.resident_name.toLowerCase().includes(q)
      );
    }
    this.renderTable();
  }

  renderTable() {
    const tbody = this.querySelector("#readings-tbody")!;
    const count = this.querySelector("#row-count")!;

    if (this.filtered.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">Sin resultados.</td></tr>';
      count.textContent = "0 registros";
      return;
    }

    tbody.innerHTML = this.filtered
      .map(
        (r) =>
          "<tr class=\"hover:bg-gray-50\">" +
          '<td class="px-4 py-3 font-medium text-gray-900">' + this.esc(r.house_code) + "</td>" +
          '<td class="px-4 py-3 text-gray-600">' + this.esc(r.resident_name) + "</td>" +
          '<td class="px-4 py-3 text-right text-gray-600 tabular-nums">' + r.previous_reading + "</td>" +
          '<td class="px-4 py-3 text-right">' +
          '<input type="number" step="0.001" data-house="' + r.house_id + '"' +
          ' value="' + (r.current_reading ?? "") + '"' +
          ' placeholder="Ingrese lectura"' +
          ' class="w-full text-right border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums' +
          (r.current_reading !== null ? " border-green-300 bg-green-50" : "") + '" />' +
          "</td>" +
          '<td class="px-4 py-3 text-center">' +
          '<button data-save="' + r.house_id + '"' +
          ' class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:cursor-not-allowed">' +
          (r.current_reading !== null ? "Actualizar" : "Guardar") +
          "</button>" +
          '<span id="spinner-' + r.house_id + '" class="hidden text-gray-400 text-xs ml-1">...</span>' +
          "</td>" +
          "</tr>"
      )
      .join("");

    count.textContent = this.filtered.length + " registros";

    tbody.querySelectorAll("[data-save]").forEach((btn) => {
      (btn as HTMLButtonElement).disabled = false;
      btn.addEventListener("click", () => {
        const houseId = Number((btn as HTMLElement).dataset.save);
        this.saveRow(houseId);
      });
    });

    tbody.querySelectorAll("input[type='number']").forEach((input) => {
      (input as HTMLInputElement).disabled = false;
      input.addEventListener("keydown", (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "Enter") {
          const houseId = Number((input as HTMLElement).dataset.house);
          this.saveRow(houseId);
        }
      });
      input.addEventListener("input", () => {
        const val = (input as HTMLInputElement).value;
        const btn = tbody.querySelector(
          '[data-save="' + (input as HTMLElement).dataset.house + '"]'
        ) as HTMLButtonElement;
        if (btn) btn.disabled = !val.trim();
      });
    });
  }

  async saveRow(houseId: number) {
    if (this.saving.has(houseId)) return;
    this.saving.add(houseId);

    const input = this.querySelector(
      'input[data-house="' + houseId + '"]'
    ) as HTMLInputElement;
    const btn = this.querySelector(
      '[data-save="' + houseId + '"]'
    ) as HTMLButtonElement;
    const spinner = this.querySelector("#spinner-" + houseId)!;

    if (btn) btn.disabled = true;
    if (spinner) spinner.classList.remove("hidden");

    const rawValue = input?.value.trim();
    if (!rawValue) {
      this.saving.delete(houseId);
      if (spinner) spinner.classList.add("hidden");
      return;
    }

    const currentReading = Number(rawValue);

    try {
      const existing = this.rows.find((r) => r.house_id === houseId);
      if (existing?.reading_id) {
        await api.readings.update({ id: existing.reading_id, current_reading: currentReading });
      } else {
        await api.readings.create({ house_id: houseId, current_reading: currentReading });
      }
      await this.load();
    } catch (e) {
      alert(String(e));
      this.saving.delete(houseId);
      if (btn) btn.disabled = false;
      if (spinner) spinner.classList.add("hidden");
    }
  }

  private esc(s: string): string {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
}

customElements.define("app-readings", AppReadings);
