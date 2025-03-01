import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Markdown from './mymd-vite-plugin';
// import mdx from '@mdx-js/rollup';
// import remarkGfm from 'remark-gfm';
// {
//   enforce: 'pre', ...mdx({
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [],
//   })
// }

// https://vite.dev/config/
export default defineConfig({
  base: "/hello_wgsl/",
  plugins: [
    react(),
    Markdown(),
  ],
})
