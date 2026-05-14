interface Route {
  path: string;
  component: string;
  label: string;
}

const routes: Route[] = [
  { path: "/residents", component: "app-residents", label: "Residentes" },
  { path: "/readings", component: "app-readings", label: "Lecturas" },
  { path: "/periods", component: "app-periods", label: "Ciclos" },
  { path: "/history", component: "app-history", label: "Historial" },
];

export class Router {
  private outlet: HTMLElement;

  constructor(outlet: HTMLElement) {
    this.outlet = outlet;
  }

  init() {
    const navigate = (path: string) => {
      const route = routes.find((r) => r.path === path) ?? routes[0];
      this.outlet.innerHTML = `<${route.component}></${route.component}>`;
    };

    navigate(window.location.hash.slice(1) || "/periods");
    window.addEventListener("hashchange", () => {
      navigate(window.location.hash.slice(1) || "/periods");
    });
  }

  getRoutes(): Route[] {
    return routes;
  }
}
