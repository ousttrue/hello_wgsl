import posts from '../posts';

export default function Home() {
  return (<>
    <ul>
      <li><a href={`${import.meta.env.BASE_URL}01_triangle/`}>01_triangle</a></li>
      {posts.map((post, i) => (<li key={i}>
        <a href={post.path}>
          post: {post.data.frontmatter.title}
        </a>
      </li>))}
    </ul>
  </>);
}
