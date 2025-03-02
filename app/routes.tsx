import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

import posts from './posts';

export default [
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    route("/01_triangle/", "./routes/01_triangle.tsx"),
    ...(posts.map(({ path, file }) => route(path, file)))
  ]),
  // route('/hello', 'routes/hello.mdx'),
] satisfies RouteConfig;
