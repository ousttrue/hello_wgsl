import posts from '../posts';

export default function Home() {
  return (<>
    <ul>
      <li><a href={`${import.meta.env.BASE_URL}01_canvas/`}>01_triangle</a></li>
      <li><a href={`${import.meta.env.BASE_URL}02_wgpu/`}>02_wgpu</a></li>
      {posts.map((post, i) => (<li key={i}>
        <a href={post.path}>
          {post.data.frontmatter.title}
        </a>
      </li>))}
    </ul>
  </>);
}
