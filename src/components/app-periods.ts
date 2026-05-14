import { api } from "../api";
import type { Period } from "../types";

class AppPeriods extends HTMLElement {
  private periods: Period[] = [];

  connectedCallback() {
    this.render();
    this.load();
  }

  async load() {
    const tbody = this.querySelector("#periods-tbody")!;
    tbody.innerHTML =
      '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">Cargando...</td></tr>';
    try {
      this.periods = await api.periods.list();
      this.renderTable();
    } catch (e) {
      alert(String(e));
    }
  }

  render() {
    this.innerHTML =
      '<div class="space-y-6">' +
      '<div class="flex items-center justify-between">' +
      '<h2 class="text-2xl font-bold text-gray-800">Ciclos</h2>' +
      "</div>" +
      '<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">' +
      '<table class="w-full text-sm">' +
      '<thead class="bg-gray-50 text-gray-600 uppercase text-xs">' +
      "<tr>" +
      '<th class="text-left px-4 py-3">Per\u00EDodo</th>' +
      '<th class="text-left px-4 py-3">Estado</th>' +
      '<th class="text-left px-4 py-3">Apertura</th>' +
      '<th class="text-left px-4 py-3">Cierre</th>' +
      '<th class="text-right px-4 py-3 w-48">Acci\u00F3n</th>' +
      "</tr>" +
      "</thead>" +
      '<tbody id="periods-tbody" class="divide-y divide-gray-100"></tbody>' +
      "</table>" +
      "</div>" +
      "</div>";
  }

  renderTable() {
    const tbody = this.querySelector("#periods-tbody")!;

    if (this.periods.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">No hay ciclos registrados.</td></tr>';
      return;
    }

    tbody.innerHTML = this.periods
      .map((p) => {
        const isCurrent = p.is_open;
        const closedDate = p.closed_at
          ? new Date(p.closed_at).toLocaleDateString("es-MX")
          : "\u2014";
        const openedDate = new Date(p.opened_at).toLocaleDateString("es-MX");
        return (
          '<tr class="hover:bg-gray-50">' +
          '<td class="px-4 py-3 font-medium text-gray-900">' +
          this.esc(p.label) +
          "</td>" +
          '<td class="px-4 py-3">' +
          (isCurrent
            ? '<span class="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">Abierto</span>'
            : '<span class="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">Cerrado</span>') +
          "</td>" +
          '<td class="px-4 py-3 text-gray-600">' +
          openedDate +
          "</td>" +
          '<td class="px-4 py-3 text-gray-600">' +
          closedDate +
          "</td>" +
          '<td class="px-4 py-3 text-right">' +
          (isCurrent
            ? '<button data-close-period="' +
              p.id +
              '" class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer">Cerrar Ciclo</button>'
            : "") +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    tbody.querySelectorAll("[data-close-period]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (
          confirm(
            "¿Cerrar el ciclo actual? Se abrirá el siguiente mes automáticamente."
          )
        ) {
          (btn as HTMLButtonElement).disabled = true;
          btn.textContent = "...";
          try {
            await api.periods.close();
            await this.load();
          } catch (e) {
            alert(String(e));
            (btn as HTMLButtonElement).disabled = false;
          }
        }
      });
    });
  }

  private esc(s: string): string {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
}

customElements.define("app-periods", AppPeriods);
