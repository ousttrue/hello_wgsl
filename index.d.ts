declare module "*.md" {
  import type { MarkdownData } from "./mymd-vite-plugin.ts";
  const md: MarkdownData;
  export { md as default };
}
declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  const title: string;
  export var title;
  export default MDXComponent;
}
