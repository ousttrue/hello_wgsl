import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Triangle from './Triangle.tsx'

import Markdown from 'marked-react';
import type { MarkdownData } from '../mymd-vite-plugin';

const basename = "/hello_wgsl";
function fix_path(key: string) {
  return `${basename}/${key.substring(2)}`;
}

const WGSL: { [key: string]: React.ReactNode } = {
  './01_triangle.md': <Triangle />
};

const posts = import.meta.glob<MarkdownData>(
  './*.md',
  {
    import: 'default',
    eager: true
  }
);

const routes = [];

routes.push({
  path: "/",
  element: (<>
    <h1>{"bun + vite + typescript で WGPU を練習"}</h1>
    {Object.entries(posts).map(([k, v]) => (<li key={k}>
      <a href={fix_path(k)}>{v.frontmatter.title}</a>
    </li>))}
  </>),
});

for (const [k, v] of Object.entries(posts)) {
  routes.push({
    path: k.substring(2),
    element: (<>
      <Markdown>{v.content}</Markdown>
      {WGSL[k] ? WGSL[k] : ''}
    </>),
  });
}

export const router = createBrowserRouter(routes, { basename });

