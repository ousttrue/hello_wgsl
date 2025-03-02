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
    route("01_canvas", "./routes/01_canvas.tsx"),
    route("02_wgpu", "./routes/02_wgpu.tsx"),
    ...(Object.entries(posts).map(([file, { path }]) => route(path, file)))
  ]),
  // route('/hello', 'routes/hello.mdx'),
] satisfies RouteConfig;
