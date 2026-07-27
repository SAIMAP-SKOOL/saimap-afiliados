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
  filter: (ruta) => !/node_modules|dist|\.astro(\\|\/|$)/.test(ruta),
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

console.log(`Nicho creado en sites/${slug}`);
console.log('Siguientes pasos:');
console.log(`  cd "sites/${slug}"`);
console.log('  npm install');
console.log('  npm run dev');
console.log('');
console.log('Recuerda añadir categorías reales en src/config/site.ts y tus primeras reseñas en src/content/resenas/.');
