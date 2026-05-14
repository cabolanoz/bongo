import { Router } from "../router";

class AppShell extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="bg-blue-700 text-white px-6 py-3 flex items-center gap-6 shadow-md">
        <span class="text-xl font-bold tracking-tight">Bongo</span>
        <a href="#/residents" class="hover:text-blue-200 transition-colors">Residentes</a>
        <a href="#/readings" class="hover:text-blue-200 transition-colors">Lecturas</a>
        <a href="#/periods" class="hover:text-blue-200 transition-colors">Ciclos</a>
        <a href="#/history" class="hover:text-blue-200 transition-colors">Historial</a>
      </nav>
      <main id="outlet" class="max-w-6xl mx-auto p-6"></main>
    `;

    const outlet = this.querySelector<HTMLElement>("#outlet")!;
    const router = new Router(outlet);
    router.init();
  }
}

customElements.define("app-shell", AppShell);
