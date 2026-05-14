import { api } from "../api";
import type { HouseWithResident, ReadingWithDetails } from "../types";

class AppHistory extends HTMLElement {
  private houses: HouseWithResident[] = [];

  connectedCallback() {
    this.render();
    this.load();
  }

  async load() {
    try {
      this.houses = await api.houses.list();
      this.renderSelector();
    } catch (e) {
      alert(String(e));
    }
  }

  render() {
    this.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Historial de Lecturas</h2>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Filtrar por casa o residente</label>
          <select id="sel-house-history" class="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">Todas las casas</option>
          </select>
        </div>
        <div id="history-table" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
          <p class="px-4 py-8 text-center text-gray-400">Seleccione una casa o vea todas.</p>
        </div>
      </div>
    `;

    this.querySelector("#sel-house-history")!.addEventListener("change", () =>
      this.onHouseChange()
    );
  }

  renderSelector() {
    const sel = this.querySelector("#sel-house-history") as HTMLSelectElement;
    sel.innerHTML =
      '<option value="">Todas las casas</option>' +
      this.houses
        .map(
          (h) =>
            `<option value="${h.id}">${this.esc(h.house_code)} — ${this.esc(h.resident_name)}</option>`
        )
        .join("");
  }

  async onHouseChange() {
    const houseId = Number(
      (this.querySelector("#sel-house-history") as HTMLSelectElement).value
    );
    if (!houseId) return;

    try {
      const readings: ReadingWithDetails[] = await api.readings.list(houseId);
      this.renderHistory(readings);
    } catch (e) {
      alert(String(e));
    }
  }

  renderHistory(readings: ReadingWithDetails[]) {
    const container = this.querySelector("#history-table")!;

    if (readings.length === 0) {
      container.innerHTML =
        '<p class="px-4 py-8 text-center text-gray-400">No hay lecturas registradas para esta casa.</p>';
      return;
    }

    const rows = readings
      .map(
        (r) => `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">${this.esc(r.period_code)}</td>
        <td class="px-4 py-3 text-gray-600 whitespace-nowrap">${this.esc(r.house_code)}</td>
        <td class="px-4 py-3 text-gray-600 whitespace-nowrap">${this.esc(r.resident_name)}</td>
        <td class="px-4 py-3 text-gray-600 tabular-nums text-right">${r.previous_reading}</td>
        <td class="px-4 py-3 font-medium text-gray-900 tabular-nums text-right">${r.current_reading}</td>
        <td class="px-4 py-3 font-medium tabular-nums text-right ${r.consumption >= 0 ? "text-green-600" : "text-red-600"}">${r.consumption}</td>
        <td class="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">${this.esc(r.notes)}</td>
      </tr>`
      )
      .join("");

    container.innerHTML = `
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="text-left px-4 py-3 whitespace-nowrap">Período</th>
            <th class="text-left px-4 py-3 whitespace-nowrap">Casa</th>
            <th class="text-left px-4 py-3 whitespace-nowrap">Residente</th>
            <th class="text-right px-4 py-3 whitespace-nowrap">Anterior (m³)</th>
            <th class="text-right px-4 py-3 whitespace-nowrap">Actual (m³)</th>
            <th class="text-right px-4 py-3 whitespace-nowrap">Consumo (m³)</th>
            <th class="text-left px-4 py-3 whitespace-nowrap">Notas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">${rows}</tbody>
      </table>
      <p class="px-4 py-2 text-xs text-gray-400 border-t">${readings.length} registros</p>
    `;
  }

  private esc(s: string): string {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
}

customElements.define("app-history", AppHistory);
