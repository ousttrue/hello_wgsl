import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import mdx from '@mdx-js/rollup';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    base: '/hello_wgsl/',
    plugins: [
      {
        enforce: 'pre', ...mdx({
          /* jsxImportSource: …, otherOptions… */
          remarkPlugins: [
            [remarkFrontmatter],
            [remarkMdxFrontmatter],
          ],
        })
      },
      reactRouter()
    ]
  };
});
