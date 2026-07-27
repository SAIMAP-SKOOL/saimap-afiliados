// Configuración específica de este sitio de nicho.
// Al crear un nuevo nicho con scripts/crear-nicho.mjs, este archivo se
// personaliza automáticamente (nombre, tag de afiliado, categorías, color).
export const siteConfig = {
  nombre: 'Nombre del Nicho',
  descripcion: 'Reseñas honestas de productos para ayudarte a elegir mejor.',
  // Tag de Afiliado de Amazon España, ej: "sainicho-21"
  amazonTag: 'tu-tag-21',
  colorPrimario: '#1a1a2e',
  categorias: [
    { slug: 'general', nombre: 'General' },
  ],
};

export type SiteConfig = typeof siteConfig;
