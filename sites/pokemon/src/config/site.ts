// Configuración específica de este sitio de nicho.
// Al crear un nuevo nicho con scripts/crear-nicho.mjs, este archivo se
// personaliza automáticamente (nombre, tag de afiliado, categorías, color).
export const siteConfig = {
  nombre: 'Pokémon',
  descripcion: 'Reseñas de cartas, peluches y merchandising de Pokémon',
  // Tag de Afiliado de Amazon España, ej: "sainicho-21"
  amazonTag: 'saimap0b-21',
  colorPrimario: '#1a1a2e',
  categorias: [
    { slug: 'cartas-tcg', nombre: 'Cartas TCG' },
    { slug: 'peluches', nombre: 'Peluches' },
    { slug: 'figuras', nombre: 'Figuras' },
    { slug: 'videojuegos', nombre: 'Videojuegos' },
  ],
};

export type SiteConfig = typeof siteConfig;
