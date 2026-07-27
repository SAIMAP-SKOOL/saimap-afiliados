import { defineConfig } from 'astro/config';

// Cada sitio de nicho sobreescribe "site" con su propia URL antes de desplegar.
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
});
