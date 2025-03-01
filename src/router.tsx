import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import { evaluateSync } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import { type MarkdownData } from '../mymd-vite-plugin';
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const raws = import.meta.glob<MarkdownData>(
  './posts/**/*.mdx',
  {
    import: 'default',
    eager: true,
  }
);
const runtime = { jsx, jsxs, Fragment };

const posts = Object.entries(raws).map(([k, v]) => {
  const element = evaluateSync(v.content, runtime).default;
  return {
    url: k.substring(2),
    element,
    ...v,
  };
});

const routes: { path: string, element: React.ReactNode }[] = [];

function Index() {
  return (<>
    <h1>posts</h1>
    {posts.map((post, i) => (<li key={i}>
      <a href={post.url}>{post.frontmatter.title}</a>
    </li>))}
  </>);
}

routes.push({
  path: "/",
  element: <Index />,
});

for (const post of posts) {
  routes.push({
    path: post.url,
    element: <post.element />,
  });
}

export const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

