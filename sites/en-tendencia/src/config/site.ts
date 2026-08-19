// Configuración específica de este sitio de nicho.
// Al crear un nuevo nicho con scripts/crear-nicho.mjs, este archivo se
// personaliza automáticamente (nombre, tag de afiliado, categorías, color).
export const siteConfig = {
  nombre: 'En Tendencia',
  descripcion: 'Reseñas de moda, belleza, hogar y los productos más virales del momento',
  // Tag de Afiliado de Amazon España, ej: "sainicho-21"
  amazonTag: 'saimap0b-21',
  colorPrimario: '#7a2048',
  // Ruta opcional (dentro de public/) a una imagen de fondo temática,
  // repetida sutilmente detrás del contenido. Déjalo sin definir para
  // usar el fondo blanco por defecto.
  fondoPatron: undefined as string | undefined,
  // ID de editor de Google AdSense (formato "pub-XXXXXXXXXXXXXXXX"), una vez
  // aprobada la cuenta. Déjalo sin definir para no cargar ningún script de
  // AdSense ni servir ads.txt.
  adsensePublisherId: 'pub-2380420808720124' as string | undefined,
  categorias: [
    { slug: 'moda', nombre: 'Moda' },
    { slug: 'belleza', nombre: 'Belleza y Glamour' },
    { slug: 'hogar', nombre: 'Hogar y Decoración' },
    { slug: 'tendencias', nombre: 'Tendencias del Momento' },
  ],
};

export type SiteConfig = typeof siteConfig;
