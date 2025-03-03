import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    route("canvas.tsx", "./routes/canvas.tsx"),
    route("wgpu.tsx", "./routes/wgpu.tsx"),
    route('site.mdx', './routes/site_setup.mdx'),
    route('canvas.mdx', './routes/mdx_canvas.mdx'),
    route('wgpu.mdx', './routes/mdx_wgpu.mdx'),
  ]),
] satisfies RouteConfig;
