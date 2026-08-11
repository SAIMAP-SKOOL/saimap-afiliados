#!/usr/bin/env node
// Escala el sistema a un nuevo nicho: copia template-nicho/ dentro de sites/<slug>
// y personaliza src/config/site.ts con los datos indicados.
//
// Uso:
//   node scripts/crear-nicho.mjs <slug> "<Nombre visible>" <amazon-tag> ["<descripcion>"]
//
// Ejemplo:
//   node scripts/crear-nicho.mjs jardin-terraza "Jardín y Terraza" saijardin-21 "Reseñas de muebles y herramientas de jardín"

import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const [slug, nombre, amazonTag, descripcion] = process.argv.slice(2);

if (!slug || !nombre || !amazonTag) {
  console.error(
    'Uso: node scripts/crear-nicho.mjs <slug> "<Nombre visible>" <amazon-tag> ["<descripcion>"]'
  );
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('El slug solo puede contener minúsculas, números y guiones (ej: jardin-terraza).');
  process.exit(1);
}

const origen = join(raiz, 'template-nicho');
const destino = join(raiz, 'sites', slug);

if (existsSync(destino)) {
  console.error(`Ya existe sites/${slug}. Elige otro slug o elimina la carpeta primero.`);
  process.exit(1);
}

mkdirSync(destino, { recursive: true });
cpSync(origen, destino, {
  recursive: true,
  // Excluye node_modules/, dist/ y la caché .astro/ como carpetas, sin tocar
  // archivos de código que terminan en ".astro" (ej. index.astro).
  filter: (ruta) => {
    const segmentos = ruta.split(/[\\/]/);
    return !segmentos.includes('node_modules') && !segmentos.includes('dist') && !segmentos.includes('.astro');
  },
});

// Personalizar src/config/site.ts
const rutaConfig = join(destino, 'src', 'config', 'site.ts');
let config = readFileSync(rutaConfig, 'utf-8');
config = config
  .replace(/nombre: '.*?'/, `nombre: '${nombre.replace(/'/g, "\\'")}'`)
  .replace(/amazonTag: '.*?'/, `amazonTag: '${amazonTag}'`);
if (descripcion) {
  config = config.replace(/descripcion: '.*?'/, `descripcion: '${descripcion.replace(/'/g, "\\'")}'`);
}
writeFileSync(rutaConfig, config);

// Personalizar package.json
const rutaPkg = join(destino, 'package.json');
const pkg = JSON.parse(readFileSync(rutaPkg, 'utf-8'));
pkg.name = `saimap-afiliados-${slug}`;
writeFileSync(rutaPkg, JSON.stringify(pkg, null, 2) + '\n');

// Personalizar astro.config.mjs: el nicho se sirve bajo /saimap-afiliados/<slug>/,
// porque el portal está desplegado como GitHub Pages de proyecto (sin dominio
// propio todavía). Si en el futuro se usa un dominio propio, quitar este prefijo.
const PREFIJO_DEPLOY = '/saimap-afiliados';
const rutaAstroConfig = join(destino, 'astro.config.mjs');
let astroConfig = readFileSync(rutaAstroConfig, 'utf-8');
astroConfig = astroConfig.replace(/base: '.*?'/, `base: '${PREFIJO_DEPLOY}/${slug}/'`);
astroConfig = astroConfig.replace(/site: '.*?'/, `site: 'https://saimap-skool.github.io'`);
writeFileSync(rutaAstroConfig, astroConfig);

// Registrar el nicho en nichos.json para que el portal (página principal) lo liste.
const rutaRegistro = join(raiz, 'nichos.json');
const registro = JSON.parse(readFileSync(rutaRegistro, 'utf-8'));
if (registro.some((n) => n.slug === slug)) {
  console.error(`El slug "${slug}" ya estaba registrado en nichos.json.`);
  process.exit(1);
}
registro.push({ slug, nombre, descripcion: descripcion ?? '' });
writeFileSync(rutaRegistro, JSON.stringify(registro, null, 2) + '\n');

console.log(`Nicho creado en sites/${slug} y registrado en nichos.json`);
console.log('Siguientes pasos:');
console.log(`  cd "sites/${slug}"`);
console.log('  npm install');
console.log('  npm run dev');
console.log('');
console.log('Recuerda añadir categorías reales en src/config/site.ts y tus primeras reseñas en src/content/resenas/.');
console.log('Cuando quieras publicar todo junto (portal + nichos), ejecuta: node scripts/build-todo.mjs');
