import { defineConfig } from 'astro/config';

// Desplegado como GitHub Pages "de proyecto": vive bajo /saimap-afiliados/,
// no en la raíz del dominio. Si en el futuro se usa un dominio propio, cambia
// "site" y "base" aquí (y ajusta el prefijo de base en cada sites/<slug>/).
export default defineConfig({
  site: 'https://saimap-skool.github.io',
  base: '/saimap-afiliados/',
  output: 'static',
});
