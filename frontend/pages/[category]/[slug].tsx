import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PostHeading from '../../components/Heading';
import ProductsList from '../../components/ProductsList';
import TopPicks from '../../components/TopPicks';
import rankListCounter from '../../lib/rankListCounter';
import { Post as PostType } from '../../types';

const PostDetails = ({ post }: { post: PostType }) => {
  const topCount = rankListCounter(post?.rankList?.length).toString();
  const postTitle = post.title;
  const updatedAt = post.updated_at;
  const rankList = post.rankList.slice(0, parseInt(topCount));

  return (
    <div>
      <PostHeading title={postTitle} count={topCount} updatedAt={updatedAt} />
      <TopPicks rankList={rankList} />
      <Container maxWidth="xl" sx={{ marginY: '2em' }}>
        <Typography variant="h5" align="center" py={2}>
          Top Picks
        </Typography>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ProductsList products={rankList} />
        </Box>
      </Container>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:1337/posts?slug=${params.slug}`);
  const posts = await res.json();

  return {
    props: {
      post: posts[0],
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/posts');
  const allPosts = await res.json();

  return {
    paths: allPosts.map((post) => `/${post?.categories[0]?.slug}/${post.slug}`),
    fallback: true,
  };
}

export default PostDetails;
