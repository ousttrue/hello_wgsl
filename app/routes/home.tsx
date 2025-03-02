import posts from '../posts';
import routes from '../routes';

export default function Home() {
  return (<>
    <ul>
      {routes[0].children.filter((child) => child.path).map((child, i) => {
        const post = posts[child.file];
        return (<li key={i}>
          <a href={`${import.meta.env.BASE_URL}${child.path}`}>{(post && post.data) ? post.data.frontmatter.title : child.path}</a>
        </li>);
      })}
    </ul>
  </>);
}
