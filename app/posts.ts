import { splitMatter } from '../frontmatter-vite-plugin';

function file_to_path(src: string) {
  const m = src.match(/^\.\/routes\/(.*)$/)!;
  return m[1];
}

const posts =
  import.meta.glob<string>('./routes/**/*.{md,mdx}', {
    import: 'default',
    // query: '?url',
    query: '?raw',
    eager: true,
  });

for (const file of Object.keys(posts)) {
  posts[file] = {
    path: file_to_path(file),
    file,
    data: splitMatter(posts[file]),
  };
}

export default posts;
