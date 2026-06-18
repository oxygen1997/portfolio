import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — относительные пути к ассетам, чтобы собранный dist работал
// в любой папке на GitHub Pages (и внутри витрины портфолио, и отдельно).
export default defineConfig({
  base: './',
  plugins: [react()],
});
