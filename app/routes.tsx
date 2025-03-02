import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

import posts from './posts';

export default [
  {
    path: '/',
    file: "./routes/layout.tsx",
    children: [
      {
        index: true,
        file: "./routes/home.tsx",
      },
      // {
      //   path: "about",
      //   file: "./routes/about.tsx",
      // },
      // {
      //   path: "todos",
      //   file: "./routes/todos.tsx",
      //   children: [
      //     {
      //       path: ":id",
      //       file: "./routes/todo.tsx",
      //     },
      //   ],
      // },
    ],
  },
  // route('/hello', 'routes/hello.mdx'),
  ...(posts.map(({ path, file }) => route(path, file)))
] satisfies RouteConfig;
