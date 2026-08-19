import { defineConfig } from 'astro/config';

// Cada sitio de nicho se despliega bajo su propia subruta del mismo dominio
// (ej. midominio.com/cocina-hogar/), por eso "base" no es "/" por defecto.
// scripts/crear-nicho.mjs fija "base" y "site" automáticamente al generar el nicho.
export default defineConfig({
  site: 'https://saimap-skool.github.io',
  base: '/saimap-afiliados/en-tendencia/',
  output: 'static',
});
