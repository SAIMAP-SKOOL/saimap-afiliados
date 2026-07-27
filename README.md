# SAIMAP - Afiliados

Sistema para crear y mantener varios blogs de reseñas de productos de Amazon
(marketing de afiliación), organizados por nicho. Cada nicho es un sitio Astro
independiente que se genera a partir de una plantilla común.

## Arquitectura

```
SAIMAP - Afiliados/
├── template-nicho/     # Plantilla base Astro (no se despliega directamente)
├── sites/              # Un sitio Astro real por cada nicho (se irán añadiendo)
└── scripts/
    └── crear-nicho.mjs # Genera un nuevo sitio de nicho a partir de la plantilla
```

De momento el repositorio solo contiene la plantilla base (`template-nicho/`).
Los nichos concretos (`sites/<nicho>/`) se irán creando más adelante con el
script `crear-nicho.mjs`.

Cada sitio en `sites/` es un proyecto Astro independiente y desplegable (por
ejemplo, un repositorio o rama de GitHub Pages distinto por nicho). Comparten
la misma estructura de componentes y layouts, pero cada uno tiene su propio
`src/config/site.ts` (nombre, tag de afiliado de Amazon, categorías, color) y
sus propias reseñas en `src/content/resenas/`.

## Crear un nuevo nicho

```bash
node scripts/crear-nicho.mjs <slug> "<Nombre visible>" <tu-tag-amazon-21> ["<descripción>"]
```

Ejemplo:

```bash
node scripts/crear-nicho.mjs jardin-terraza "Jardín y Terraza" saijardin-21 "Reseñas de muebles y herramientas de jardín"
```

Esto crea `sites/jardin-terraza/` con la plantilla ya personalizada. Luego:

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

## Despliegue

Cada sitio en `sites/` es estático (`astro build` genera `dist/`) y se puede
desplegar en GitHub Pages, Netlify, Vercel o Cloudflare Pages de forma
independiente. Recuerda ajustar `site` en `astro.config.mjs` de cada nicho con
el dominio final antes de desplegar.
