import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { brand } from './src/config/brand';

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const canonical = brand.seo.siteUrl.replace(/\/+$/, '');
const base = process.env.BASE_PATH || '/';
const publicPath = (path: string) => `${base}${path.replace(/^\//, '')}`;

export default defineConfig({
  base,
  plugins: [react(), {
    name: 'editable-site-metadata',
    transformIndexHtml(html) {
      const values: Record<string, string> = {
        TITLE: brand.seo.title, DESCRIPTION: brand.seo.description,
        COMPANY: brand.companyName, LANG: brand.seo.language, LOCALE: brand.seo.locale,
        FAVICON: publicPath(brand.seo.favicon),
        SOCIAL_IMAGE: canonical ? new URL(brand.seo.socialImage.replace(/^\//, ''), `${canonical}/`).href : publicPath(brand.seo.socialImage),
        SOCIAL_ALT: brand.seo.socialImageAlt,
      };
      const result = html.replace(/__([A-Z_]+)__/g, (_, key: string) => escapeHtml(values[key] || ''));
      return { html: result, tags: canonical ? [
        { tag: 'link', attrs: { rel: 'canonical', href: `${canonical}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${canonical}/` }, injectTo: 'head' },
      ] : [] };
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${canonical ? `Sitemap: ${canonical}/sitemap.xml\n` : ''}` });
      if (canonical) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(canonical)}/</loc></url></urlset>` });
    },
  }],
});
