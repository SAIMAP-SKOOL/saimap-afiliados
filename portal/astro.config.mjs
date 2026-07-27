import { defineConfig } from 'astro/config';

// El portal vive en la raíz del dominio; cada nicho se sirve bajo su propia
// subruta (ej. /cocina-hogar/), fuera del alcance de este site.
export default defineConfig({
  site: 'https://example.com',
  base: '/',
  output: 'static',
});
