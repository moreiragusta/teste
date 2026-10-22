// @ts-check
import { defineConfig } from 'astro/config';

// Em produção o site fica na raiz de nukkitech.com.br.
// No teste do GitHub Pages (moreiragusta.github.io/teste) o workflow define
// SITE_URL e BASE_PATH; ver .github/workflows/deploy.yml.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://nukkitech.com.br',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
});
