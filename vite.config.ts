import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { profile } from './src/config/profile.ts'
import { THEME_STORAGE_KEY } from './src/config/theme.ts'

/**
 * Injects values from `src/config/profile.ts` into index.html (canonical,
 * OpenGraph, JSON-LD) and emits sitemap.xml / robots.txt.
 */
function seo(): Plugin {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: `${profile.role} — ${profile.status}`,
    email: `mailto:${profile.email}`,
    url: `${profile.siteUrl}/`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lyon', addressCountry: 'FR' },
    knowsAbout: ['Vue.js', 'TypeScript', 'Architecture frontend', 'Design Systems', 'Tests'],
    sameAs: [profile.linkedinUrl],
  }

  const replacements: Record<string, string> = {
    '%SITE_URL%': profile.siteUrl,
    '%PROFILE_NAME%': profile.name,
    '%THEME_STORAGE_KEY%': THEME_STORAGE_KEY,
    '%JSON_LD%': JSON.stringify(jsonLd),
  }

  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let output = html
        for (const [token, value] of Object.entries(replacements)) {
          output = output.replaceAll(token, value)
        }
        return output
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${profile.siteUrl}/</loc></url>
</urlset>
`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${profile.siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

/** Preloads the variable font of the hero headline (hashed name: build only). */
function preloadHeadlineFont(): Plugin {
  return {
    name: 'portfolio-preload-font',
    apply: 'build',
    transformIndexHtml(_, ctx) {
      const font = Object.keys(ctx.bundle ?? {}).find((file) =>
        /instrument-sans-latin-wdth-normal.*\.woff2$/.test(file),
      )
      if (!font) return
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: `/${font}`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
          },
          injectTo: 'head',
        },
      ]
    },
  }
}

/**
 * Inlines the (small) stylesheet into index.html: one less render-blocking
 * round trip before first paint.
 */
function inlineCss(): Plugin {
  return {
    name: 'portfolio-inline-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      let output = html
      for (const [fileName, chunk] of Object.entries(ctx.bundle ?? {})) {
        if (chunk.type !== 'asset' || !fileName.endsWith('.css')) continue
        const link = new RegExp(`<link[^>]+href="/${fileName}"[^>]*>`)
        if (!link.test(output)) continue
        output = output.replace(link, () => `<style>${String(chunk.source)}</style>`)
        delete ctx.bundle?.[fileName]
      }
      return output
    },
  }
}

export default defineConfig({
  plugins: [vue(), seo(), preloadHeadlineFont(), inlineCss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
})
