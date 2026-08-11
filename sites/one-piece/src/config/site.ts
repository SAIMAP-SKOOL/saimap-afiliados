// Configuración específica de este sitio de nicho.
// Al crear un nuevo nicho con scripts/crear-nicho.mjs, este archivo se
// personaliza automáticamente (nombre, tag de afiliado, categorías, color).
export const siteConfig = {
  nombre: 'One Piece',
  descripcion: 'Reseñas de manga, figuras y merchandising de One Piece',
  // Tag de Afiliado de Amazon España, ej: "sainicho-21"
  amazonTag: 'saimap0b-21',
  colorPrimario: '#1a1a2e',
  categorias: [
    { slug: 'manga', nombre: 'Manga' },
    { slug: 'figuras', nombre: 'Figuras' },
    { slug: 'merchandising', nombre: 'Merchandising' },
    { slug: 'card-game', nombre: 'One Piece Card Game' },
  ],
};

export type SiteConfig = typeof siteConfig;
