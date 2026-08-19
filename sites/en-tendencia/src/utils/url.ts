// Construye URLs internas respetando el "base" del sitio (import.meta.env.BASE_URL),
// necesario porque cada nicho se despliega bajo su propia subruta
// (ej. midominio.com/cocina-hogar/) en lugar de la raíz del dominio.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  const limpio = path.replace(/^\/+/, '');
  return base.endsWith('/') ? `${base}${limpio}` : `${base}/${limpio}`;
}
