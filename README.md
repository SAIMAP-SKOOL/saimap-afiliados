# SAIMAP - Afiliados

Sistema para crear y mantener varios blogs de reseñas de productos de Amazon
(marketing de afiliación), organizados por nicho, **todos bajo un mismo
dominio**: la raíz (`/`) es un portal que enlaza a cada nicho en su propia
subruta (`/cocina-hogar/`, `/jardin-terraza/`, etc.).

## Arquitectura

```
SAIMAP - Afiliados/
├── portal/              # Página principal del dominio (/) — lista los nichos activos
├── template-nicho/      # Plantilla base Astro para un nicho (no se despliega directamente)
├── sites/                # Un sitio Astro real por cada nicho, servido bajo /<slug>/
│   └── <slug>/
├── nichos.json           # Registro de nichos activos (lo lee el portal, lo actualiza crear-nicho.mjs)
└── scripts/
    ├── crear-nicho.mjs   # Genera un nuevo nicho a partir de la plantilla y lo registra
    └── build-todo.mjs    # Construye portal + todos los nichos en un único dist/
```

De momento el repositorio solo contiene el portal y la plantilla base;
`sites/` y `nichos.json` están vacíos. Los nichos concretos se irán creando
más adelante con `crear-nicho.mjs`.

Cada sitio en `sites/<slug>/` es un proyecto Astro independiente (su propio
`package.json`, `astro.config.mjs` con `base: '/<slug>/'`, categorías y tag de
afiliado en `src/config/site.ts`, y sus propias reseñas en
`src/content/resenas/`), pero comparte la misma estructura de componentes y
layouts que la plantilla.

## Crear un nuevo nicho

```bash
node scripts/crear-nicho.mjs <slug> "<Nombre visible>" <tu-tag-amazon-21> ["<descripción>"]
```

Ejemplo:

```bash
node scripts/crear-nicho.mjs jardin-terraza "Jardín y Terraza" saijardin-21 "Reseñas de muebles y herramientas de jardín"
```

Esto crea `sites/jardin-terraza/` con la plantilla ya personalizada (nombre,
tag de afiliado, `base` en `astro.config.mjs`) y añade el nicho a
`nichos.json`, con lo que aparecerá automáticamente en el portal. Luego:

```bash
cd sites/jardin-terraza
npm install
npm run dev
```

## Añadir reseñas a un nicho existente

Cada reseña es un archivo Markdown en `sites/<nicho>/src/content/resenas/`.
Ver el formato exacto en [template-nicho/README.md](template-nicho/README.md).

## Cumplimiento del Programa de Afiliados de Amazon

Cada sitio generado incluye:
- Un aviso de afiliados visible en el pie de cada página (`AvisoAfiliados.astro`).
- Una página legal `/aviso-afiliados/` con el texto completo requerido.
- Enlaces de compra con `rel="nofollow sponsored noopener"` y el tag de afiliado
  añadido automáticamente desde `site.ts`.

Al escribir reseñas: no inventes valoraciones, precios ni datos de producto —
verifica siempre la información real en Amazon antes de publicar.

## Construir y desplegar todo junto

```bash
node scripts/build-todo.mjs
```

Esto construye el portal y cada nicho listado en `nichos.json`, y los ensambla
en un único `dist/` en la raíz del repo: `dist/index.html` es el portal y
`dist/<slug>/` es cada nicho. Ese `dist/` es lo que se sube tal cual al
hosting final (GitHub Pages, Netlify, Vercel, Cloudflare Pages...) como un
solo sitio estático. Antes de desplegar, ajusta `site` en `portal/astro.config.mjs`
y en cada `sites/<slug>/astro.config.mjs` con el dominio final.
