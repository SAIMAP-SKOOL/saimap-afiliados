# Template de nicho

Este es el **template base** para cada blog de reseñas de Amazon. No se despliega
directamente: se copia dentro de `sites/` con `scripts/crear-nicho.mjs` (ver el
README raíz del repositorio) y ahí se personaliza.

## Estructura

- `src/config/site.ts` — nombre del sitio, tag de afiliado de Amazon, categorías, color.
- `src/content/resenas/*.md` — cada reseña de producto (una por archivo).
- `src/components/` — `ProductCard`, `StarRating`, `ComparisonTable`, `AvisoAfiliados`.
- `src/layouts/ReviewLayout.astro` — plantilla de página de reseña (pros/contras, botón de compra).
- `src/pages/aviso-afiliados.astro` — página legal exigida por el Programa de Afiliados de Amazon.

## Añadir una reseña

Crea un archivo en `src/content/resenas/mi-producto.md` con este frontmatter:

```markdown
---
titulo: "Nombre del producto: análisis completo"
producto: "Nombre del producto"
imagen: "/productos/mi-producto.jpg"
precioAprox: "29,99 €"
valoracion: 4.5
pros:
  - "Punto fuerte 1"
  - "Punto fuerte 2"
contras:
  - "Punto débil 1"
urlAmazon: "https://www.amazon.es/dp/XXXXXXXXXX"
categoria: "general"
fechaPublicacion: 2026-07-27
resumen: "Resumen corto para la tarjeta de producto y el SEO."
---

Cuerpo de la reseña en Markdown (análisis, uso, comparativa, conclusión).
```

## Comandos

```bash
npm install
npm run dev
npm run build
```
