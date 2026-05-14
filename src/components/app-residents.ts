import { api } from "../api";
import type { Resident, HouseWithResident } from "../types";

class AppResidents extends HTMLElement {
  private residents: Resident[] = [];
  private filtered: Resident[] = [];
  private editingId: number | null = null;

  connectedCallback() {
    this.render();
    this.load();
  }

  async load() {
    const tbody = this.querySelector("#residents-tbody")!;
    tbody.innerHTML =
      '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">Cargando...</td></tr>';
    try {
      this.residents = await api.residents.list();
      this.filtered = this.residents;
      this.renderTable();
    } catch (e) {
      this.renderError(String(e));
    }
  }

  render() {
    this.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800">Residentes</h2>
          <button id="btn-new-resident" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">+ Nuevo Residente</button>
        </div>
        <div id="form-container"></div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <input id="search-input" type="text" placeholder="Buscar por nombre..."
            class="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th class="text-left px-4 py-3">Nombre</th>
                <th class="text-left px-4 py-3">Casas</th>
                <th class="text-left px-4 py-3">Teléfono</th>
                <th class="text-left px-4 py-3">Email</th>
                <th class="text-right px-4 py-3 w-40">Acciones</th>
              </tr>
            </thead>
            <tbody id="residents-tbody" class="divide-y divide-gray-100"></tbody>
          </table>
          <p id="row-count" class="px-4 py-2 text-xs text-gray-400 border-t"></p>
        </div>
      </div>
    `;

    this.querySelector("#btn-new-resident")!.addEventListener("click", () => this.showForm());
    this.querySelector("#search-input")!.addEventListener("input", () => this.filter());
  }

  filter() {
    const q = (this.querySelector("#search-input") as HTMLInputElement).value.toLowerCase().trim();
    if (!q) {
      this.filtered = this.residents;
    } else {
      this.filtered = this.residents.filter((r) => r.name.toLowerCase().includes(q));
    }
    this.renderTable();
  }

  async renderTable() {
    const tbody = this.querySelector("#residents-tbody")!;
    const count = this.querySelector("#row-count")!;

    tbody.innerHTML =
      '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">Cargando...</td></tr>';

    const allHouses = await api.houses.list();
    const housesByResident = new Map<number, HouseWithResident[]>();
    for (const h of allHouses) {
      const list = housesByResident.get(h.resident_id) ?? [];
      list.push(h);
      housesByResident.set(h.resident_id, list);
    }

    if (this.filtered.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">No hay residentes registrados.</td></tr>';
      count.textContent = "0 residentes";
      return;
    }

    tbody.innerHTML = this.filtered
      .map((r) => {
        const houses = housesByResident.get(r.id) ?? [];
        const housesStr = houses
          .map((h) => {
            let s = h.house_code;
            const parts: string[] = [];
            if (h.account_number) parts.push("Cta: " + h.account_number);
            if (h.meter_number) parts.push("Med: " + h.meter_number);
            if (parts.length) s += " (" + parts.join(", ") + ")";
            return s;
          })
          .join(", ");
        return `
      <tr class="hover:bg-gray-50 ${r.is_active ? "" : "opacity-50"}">
        <td class="px-4 py-3 font-medium text-gray-900">${this.esc(r.name)}${r.is_active ? "" : ' <span class="text-xs text-red-500">(inactivo)</span>'}</td>
        <td class="px-4 py-3 text-gray-600 text-xs">${this.esc(housesStr)}</td>
        <td class="px-4 py-3 text-gray-600">${this.esc(r.phone)}</td>
        <td class="px-4 py-3 text-gray-600">${this.esc(r.email)}</td>
        <td class="px-4 py-3 text-right space-x-2">
          <button data-edit="${r.id}" class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">Editar</button>
          ${r.is_active ? '<button data-deactivate="' + r.id + '" class="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">Desactivar</button>' : ""}
        </td>
      </tr>`;
      })
      .join("");

    count.textContent = this.filtered.length + " residentes";

    tbody.querySelectorAll("[data-edit]").forEach((btn) => {
      (btn as HTMLButtonElement).disabled = false;
      btn.addEventListener("click", () => {
        const id = Number((btn as HTMLElement).dataset.edit);
        const r = this.residents.find((x) => x.id === id);
        if (r) this.showForm(r);
      });
    });

    tbody.querySelectorAll("[data-deactivate]").forEach((btn) => {
      (btn as HTMLButtonElement).disabled = false;
      btn.addEventListener("click", async () => {
        const id = Number((btn as HTMLElement).dataset.deactivate);
        (btn as HTMLButtonElement).disabled = true;
        btn.textContent = "...";
        try {
          await api.residents.deactivate(id);
          await this.load();
        } catch (e) {
          alert(String(e));
          (btn as HTMLButtonElement).disabled = false;
        }
      });
    });
  }

  async showForm(resident?: Resident) {
    const container = this.querySelector("#form-container")!;
    const r = resident;
    this.editingId = r?.id ?? null;

    container.innerHTML = '<p class="text-sm text-gray-400">Cargando...</p>';

    let housesHtml = "";
    if (r) {
      try {
        const houses = await api.houses.list(r.id);
        housesHtml = houses
          .map(
            (h) =>
              '<div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">' +
              '<span class="text-sm">' + this.esc(h.house_code) +
              (h.account_number ? " Cta: " + this.esc(h.account_number) : "") +
              (h.meter_number ? " (Med: " + this.esc(h.meter_number) + ")" : "") +
              '</span>' +
              '<button data-del-house="' + h.id + '" class="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer">Eliminar</button>' +
              '</div>'
          )
          .join("");
      } catch (e) {
        alert(String(e));
        container.innerHTML = "";
        return;
      }
    }

    container.innerHTML =
      '<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">' +
      '<h3 class="font-semibold text-gray-700">' + (r ? "Editar Residente" : "Nuevo Residente") + '</h3>' +
      '<div class="grid grid-cols-3 gap-3">' +
      '<input id="f-name" value="' + this.esc(r?.name ?? "") + '" placeholder="Nombre *" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      '<input id="f-phone" value="' + this.esc(r?.phone ?? "") + '" placeholder="Teléfono" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      '<input id="f-email" value="' + this.esc(r?.email ?? "") + '" placeholder="Email" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      '</div>' +
      '<div class="border-t pt-3">' +
      '<h4 class="text-sm font-medium text-gray-700 mb-2">Casas</h4>' +
      '<div id="houses-list" class="space-y-1 mb-2">' + (housesHtml || '<p class="text-sm text-gray-400">Sin casas asignadas.</p>') + '</div>' +
      '<div class="flex gap-2 items-end">' +
      '<input id="f-house-code" placeholder="Código (ej. A-3)" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      '<input id="f-house-account" placeholder="N° Cuenta" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      '<input id="f-house-meter" placeholder="N° Medidor" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />' +
      '<button id="btn-add-house" class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer">Agregar</button>' +
      '</div>' +
      '</div>' +
      '<div class="flex gap-2 pt-2">' +
      '<button id="btn-save-resident" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Guardar</button>' +
      '<button id="btn-cancel-resident" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Cancelar</button>' +
      '</div>' +
      '</div>';

    container.querySelector("#btn-add-house")!.addEventListener("click", () => this.addHouse());
    container.querySelector("#btn-save-resident")!.addEventListener("click", () => this.save());
    container.querySelector("#btn-cancel-resident")!.addEventListener("click", () => {
      container.innerHTML = "";
      this.editingId = null;
    });

    container.querySelectorAll("[data-del-house]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number((btn as HTMLElement).dataset.delHouse);
        if (confirm("¿Eliminar esta casa?")) {
          await api.houses.delete(id);
          if (this.editingId) {
            try {
              const updated = await api.residents.list();
              const resident = updated.find((x) => x.id === this.editingId);
              if (resident) this.showForm(resident);
            } catch (e) {
              alert(String(e));
            }
          }
        }
      });
    });
  }

  async addHouse() {
    if (!this.editingId) return;
    const code = (this.querySelector("#f-house-code") as HTMLInputElement).value.trim();
    const account = (this.querySelector("#f-house-account") as HTMLInputElement).value.trim();
    const meter = (this.querySelector("#f-house-meter") as HTMLInputElement).value.trim();
    if (!code) return;

    const btn = this.querySelector("#btn-add-house") as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "...";

    try {
      await api.houses.create({
        resident_id: this.editingId,
        house_code: code,
        account_number: account,
        meter_number: meter,
      });
      const updated = await api.residents.list();
      const resident = updated.find((x) => x.id === this.editingId);
      if (resident) this.showForm(resident);
    } catch (e) {
      alert(String(e));
      btn.disabled = false;
      btn.textContent = "Agregar";
    }
  }

  async save() {
    const name = (this.querySelector("#f-name") as HTMLInputElement).value.trim();
    const phone = (this.querySelector("#f-phone") as HTMLInputElement).value.trim();
    const email = (this.querySelector("#f-email") as HTMLInputElement).value.trim();
    if (!name) return;

    const btn = this.querySelector("#btn-save-resident") as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "...";

    try {
      if (this.editingId) {
        await api.residents.update({
          id: this.editingId, name, phone, email,
          notes: "", is_active: true, created_at: "", updated_at: "",
        });
      } else {
        const created = await api.residents.create({ name, phone, email });
        this.editingId = created.id;
        btn.disabled = false;
        btn.textContent = "Guardar";
        await this.showForm(created);
        return;
      }
      this.querySelector("#form-container")!.innerHTML = "";
      this.editingId = null;
      await this.load();
    } catch (e) {
      alert(String(e));
      btn.disabled = false;
      btn.textContent = "Guardar";
    }
  }

  renderError(msg: string) {
    const tbody = this.querySelector("#residents-tbody")!;
    tbody.innerHTML =
      '<tr><td colspan="5" class="px-4 py-8 text-center text-red-500">Error: ' +
      this.esc(msg) + "</td></tr>";
  }

  private esc(s: string): string {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
}

customElements.define("app-residents", AppResidents);
