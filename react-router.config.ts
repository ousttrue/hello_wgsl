import type { Config } from "@react-router/dev/config";
import posts from './app/posts';

export default {
  basename: '/hello_wgsl/',
  // ssr: false,
  ssr: true,
  // appDirectory: "app",
  prerender: true,
  // async prerender({ getStaticPaths }) {
  //   const staticPaths = getStaticPaths();
  //   const dynamicPaths = posts.map(x => x.path);
  //   return [...staticPaths, ...dynamicPaths];
  // },
} satisfies Config;
