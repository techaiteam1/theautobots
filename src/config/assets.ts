/** Root-relative content assets also work when deployed under a Vite base path. */
export function assetUrl(path: string): string {
  if (/^(https?:|data:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
