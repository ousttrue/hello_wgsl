import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import mdx from '@mdx-js/rollup';

import remarkFrontmatter from 'remark-frontmatter';
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkReactRouerRouteModule from './remark-reactrouter-routemodule';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    base: '/hello_wgsl/',
    plugins: [
      {
        enforce: 'pre', ...mdx({
          /* jsxImportSource: …, otherOptions… */
          remarkPlugins: [
            [remarkFrontmatter],
            // [remarkMdxFrontmatter],
            [
              remarkReactRouerRouteModule,
              {
                meta: (frontmatter: Record<string, string>) => {
                  return [
                    { title: `${frontmatter.title}` },
                    {
                      name: 'description',
                      content: frontmatter.description,
                    },
                    {
                      property: 'og:title',
                      content: `${frontmatter.title}`,
                    },
                  ];
                },
              },
            ],
          ],
        })
      },
      reactRouter()
    ]
  };
});
