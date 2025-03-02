import posts from '../posts';

export default function Home() {
  return (<>
    <h1>Home</h1>
    {posts.map((post, i) => (<li key={i}>
      <a href={post.path}>
        post: {post.data.frontmatter.title}
      </a>
    </li>))}
  </>);
}
