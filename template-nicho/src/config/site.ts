// Configuración específica de este sitio de nicho.
// Al crear un nuevo nicho con scripts/crear-nicho.mjs, este archivo se
// personaliza automáticamente (nombre, tag de afiliado, categorías, color).
export const siteConfig = {
  nombre: 'Nombre del Nicho',
  descripcion: 'Reseñas honestas de productos para ayudarte a elegir mejor.',
  // Tag de Afiliado de Amazon España, ej: "sainicho-21"
  amazonTag: 'tu-tag-21',
  colorPrimario: '#1a1a2e',
  // Ruta opcional (dentro de public/) a una imagen de fondo temática,
  // repetida sutilmente detrás del contenido. Déjalo sin definir para
  // usar el fondo blanco por defecto.
  fondoPatron: undefined as string | undefined,
  // Opacidad (0-1) del velo blanco sobre el fondo temático. Baja este valor
  // (ej. 0.4-0.6) para patrones muy claros/pastel que si no quedan casi
  // invisibles bajo el velo por defecto (0.87, pensado para patrones oscuros).
  fondoPatronVelo: undefined as number | undefined,
  // ID de editor de Google AdSense (formato "pub-XXXXXXXXXXXXXXXX"), una vez
  // aprobada la cuenta. Déjalo sin definir para no cargar ningún script de
  // AdSense ni servir ads.txt.
  adsensePublisherId: undefined as string | undefined,
  categorias: [
    { slug: 'general', nombre: 'General' },
  ],
};

export type SiteConfig = typeof siteConfig;
