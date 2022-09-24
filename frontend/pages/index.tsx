import Container from '@mui/material/Container';
import Posts from '../components/Posts';
import { Post } from '../types';

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default function Index({ posts }: { posts: Post[] }) {
  return (
    <Container maxWidth="xl">
      <Container>
        <Posts posts={posts} />
      </Container>
    </Container>
  );
}
