import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Markdown from './mymd-vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  base: "/hello_wgsl/",
  plugins: [
    react(),
    Markdown(),
  ],
})
