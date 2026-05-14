# Bongo — Control de Lecturas de Agua

Aplicación de escritorio (Tauri 2 + SQLite) para registrar lecturas de consumo de agua (m³) de residentes de un conjunto residencial.

## Requisitos

- **Node.js** ≥ 22.13 (recomendado: 22.22.1)
- **pnpm** 11
- **Rust** (herramientas de compilación de Tauri)
- **macOS** (para compilar el bundle .dmg)

## Instalación

```bash
# Clonar el repositorio
git clone <repo> bongo
cd bongo

# Instalar dependencias frontend
pnpm install
```

## Uso

### Desarrollo (hot-reload)

```bash
pnpm tauri dev
```

### Producción

```bash
pnpm tauri build
```

El binario se genera en:
- `src-tauri/target/release/bongo`
- `.app`: `src-tauri/target/release/bundle/macos/bongo.app`
- `.dmg`: `src-tauri/target/release/bundle/dmg/bongo_0.1.0_aarch64.dmg`

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo Vite |
| `pnpm build` | Compilar TypeScript + Vite |
| `pnpm tauri dev` | Desarrollo Tauri (con hot-reload) |
| `pnpm tauri build` | Compilar bundle de producción |

## Importación de Datos

1. Colocar el archivo `FACTURACION.xlsm` en la raíz del proyecto.
2. La primera vez que se ejecuta la app, importa automáticamente los datos (hoja "Residentes", filas 5+, columnas B–L).
3. Si la base de datos ya tiene datos, la importación se omite.

Para forzar una reimportación desde cero:

```bash
rm ~/Library/Application\ Support/com.bongo/bongo_production
pnpm tauri dev
```

## Estructura del Proyecto

```
bongo/
├── FACTURACION.xlsm          # Archivo fuente de datos
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── main.ts               # Entry point
│   ├── styles.css             # Tailwind v4
│   ├── types.ts               # Interfaces TypeScript
│   ├── router.ts              # Router SPA
│   └── components/
│       ├── app-shell.ts       # Layout y navegación
│       ├── app-residents.ts   # CRUD residentes con casas
│       ├── app-readings.ts    # Tabla de lecturas del mes
│       ├── app-periods.ts     # Gestión de ciclos
│       └── app-history.ts     # Historial por casa
│   └── services/
│       └── api.ts             # Llamadas Tauri invoke
└── src-tauri/
    ├── Cargo.toml
    └── src/
        ├── lib.rs             # Setup, handlers
        ├── db.rs              # SQLite schema + migraciones
        ├── models.rs          # Structs compartidos
        └── services/
            ├── residents.rs   # CRUD residentes
            ├── houses.rs      # CRUD casas
            ├── periods.rs     # Ciclos (abrir/cerrar)
            ├── readings.rs    # Lecturas (tabla + CRUD)
            └── seed.rs        # Importación Excel
```

## Base de Datos

- Archivo: `bongo_production` en el directorio de datos de la app.
- Location: `~/Library/Application Support/com.bongo/` (macOS).
- Motor: SQLite vía `rusqlite` (bundled).

### Esquema

- **residents**: nombre, teléfono, email, activo (soporta desactivación blanda).
- **houses**: código de casa, número de cuenta (único), número de medidor.
- **periods**: código (YYYY-MM), etiqueta, estado (abierto/cerrado).
- **readings**: lectura anterior, actual, consumo; único por (casa, período).

## Notas Técnicas

- TypeScript strict (`strict: true`) con Web Components (sin frameworks).
- Tailwind CSS v4 con `@tailwindcss/vite`.
- Todos los identificadores en inglés; UI en español.
