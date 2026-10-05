const cache = new Map<string, Promise<boolean>>();

/** true si el archivo existe en public/. Sirve para usar assets opcionales (sprites mayores, fotos, música). */
export function assetExists(url: string): Promise<boolean> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url, { method: 'HEAD' })
      .then((r) => r.ok && !(r.headers.get('content-type') ?? '').includes('text/html'))
      .catch(() => false);
    cache.set(url, p);
  }
  return p;
}
