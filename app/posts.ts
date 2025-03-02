import { splitMatter } from '../frontmatter-vite-plugin';

function file_to_path(src: string) {
  const m = src.match(/^\.\/routes\/(.*)$/)!;
  return m[1];
}

const posts = Object.entries(
  import.meta.glob<string>('./routes/**/*.{md,mdx}', {
    import: 'default',
    // query: '?url',
    query: '?raw',
    eager: true,
  }),
)
  .map(([file, content]) => {
    return {
      path: file_to_path(file),
      file,
      data: splitMatter(content),
    };
  })
  ;

export default posts;
