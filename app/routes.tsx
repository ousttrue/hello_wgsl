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
    route("01_canvas", "./routes/01_canvas.tsx"),
    route("02_wgpu", "./routes/02_wgpu.tsx"),
    route('10_setup', './routes/10_setup.mdx'),
    route('11_canvas', './routes/11_canvas.mdx'),
    route('12_wgpu', './routes/12_wgpu.mdx'),
  ]),
] satisfies RouteConfig;
