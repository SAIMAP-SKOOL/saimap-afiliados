import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

// Solo sirve contenido si hay un ID de AdSense configurado; si no, devuelve
// un archivo vacío (evita un 404 sin generar una declaración falsa).
export const GET: APIRoute = async () => {
  const body = siteConfig.adsensePublisherId
    ? `google.com, ${siteConfig.adsensePublisherId}, DIRECT, f08c47fec0942fa0\n`
    : '';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
