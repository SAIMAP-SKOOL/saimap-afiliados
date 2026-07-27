#!/usr/bin/env node
// Construye el portal (página principal) y todos los nichos activos
// (según nichos.json) y los ensambla en un único dist/ en la raíz del repo,
// listo para desplegar como un solo sitio: dist/ = portal, dist/<slug>/ = nicho.
//
// Uso: node scripts/build-todo.mjs

import { execFileSync } from 'node:child_process';
import { existsSync, rmSync, mkdirSync, cpSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const nichos = JSON.parse(readFileSync(join(raiz, 'nichos.json'), 'utf-8'));

function buildProyecto(rutaProyecto, etiqueta) {
  const astroBin = join(rutaProyecto, 'node_modules', 'astro', 'astro.js');
  if (!existsSync(astroBin)) {
    throw new Error(`No se encuentra Astro instalado en ${rutaProyecto} (¿falta "npm install"?)`);
  }
  console.log(`\nConstruyendo ${etiqueta}...`);
  execFileSync(process.execPath, [astroBin, 'build', '--root', rutaProyecto], {
    stdio: 'inherit',
  });
}

const distFinal = join(raiz, 'dist');
rmSync(distFinal, { recursive: true, force: true });
mkdirSync(distFinal, { recursive: true });

// 1. Portal -> raíz del dominio
buildProyecto(join(raiz, 'portal'), 'portal (página principal)');
cpSync(join(raiz, 'portal', 'dist'), distFinal, { recursive: true });

// 2. Cada nicho activo -> dist/<slug>/
for (const nicho of nichos) {
  const rutaNicho = join(raiz, 'sites', nicho.slug);
  if (!existsSync(rutaNicho)) {
    console.warn(`Aviso: "${nicho.slug}" está en nichos.json pero no existe sites/${nicho.slug}/. Se omite.`);
    continue;
  }
  buildProyecto(rutaNicho, nicho.nombre ?? nicho.slug);
  cpSync(join(rutaNicho, 'dist'), join(distFinal, nicho.slug), { recursive: true });
}

console.log(`\nListo. Sitio completo generado en: ${distFinal}`);
