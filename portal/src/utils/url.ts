// Construye URLs internas respetando el "base" del portal (import.meta.env.BASE_URL),
// necesario porque el portal puede desplegarse bajo una subruta
// (ej. GitHub Pages de proyecto: usuario.github.io/saimap-afiliados/).
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  const limpio = path.replace(/^\/+/, '');
  return base.endsWith('/') ? `${base}${limpio}` : `${base}/${limpio}`;
}
