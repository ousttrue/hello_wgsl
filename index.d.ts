declare module "*.md" {
  import type { MarkdownData } from "./mymd-vite-plugin.ts";
  const md: MarkdownData;
  export { md as default };
}
