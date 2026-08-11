import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export const GET: APIRoute = async ({ site, url: reqUrl }) => {
  const base = import.meta.env.BASE_URL;
  const origin = site ?? new URL(reqUrl.origin);
  const abs = (ruta: string) => new URL(`${base}${ruta}`.replace(/\/{2,}/g, '/'), origin).toString();

  const resenas = await getCollection('resenas');

  const urls = [
    abs(''),
    abs('aviso-afiliados/'),
    ...siteConfig.categorias.map((c) => abs(`categoria/${c.slug}/`)),
    ...resenas.map((r) => abs(`resenas/${r.slug}/`)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
