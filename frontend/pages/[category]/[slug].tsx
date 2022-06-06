import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { amber } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import getMonthYear from '../../lib/getMonthYear';
import rankListCounter from '../../lib/rankListCounter';
import { Post as PostType, RankList } from '../../types';

const topPicks = (rankList: RankList) => {
  const items: React.ReactElement[] = [];
  for (let index = 0; index < 3; index++) {
    const product = rankList[index];
    const title = product.title.replace(
      /([,().–]|[•]|(\|)|(\bwith\b|\bTo\b)|(\s-\s)|).*/i,
      () => ''
    );
    items.push(
      <Grid item xs={12} md={12} lg={4} xl={4} key={index}>
        <Card sx={{ position: 'relative' }}>
          <CardHeader
            title={title}
            subheader={'Jun 14, 2022'}
            action={
              <Chip
                label={`#top ${index + 1}`}
                component="a"
                href="#top_1"
                size="medium"
                color="success"
                clickable
              />
            }
          />
          <CardMedia
            component="img"
            height={'5%'}
            image={product.images[0]?.Large?.URL}
          />
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            SteelSeries Apex 3 RGB Gaming Mouse
          </Typography>
        </Card>
      </Grid>
    );
  }

  return (
    <Paper elevation={0} sx={{ padding: '2% 5%', margin: '1% 5%' }}>
      <Typography variant="h5" align="center" py={2}>
        Top Picks
      </Typography>
      <Grid container spacing={3}>
        {items}
      </Grid>
    </Paper>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const topCount = rankListCounter(post?.rankList?.length);
  const postTitle = post.title.replace(/(^\w{1})|(\s+\w{1})/g, (char) =>
    char.toUpperCase()
  );

  // const handleChange = (panel: string) => (e: SyntheticEvent, isExpanded: false) => {
  //   setExpanded(isExpanded ? panel : false)
  // });

  return (
    <div>
      <Box sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" component={'h1'} sx={{ color: 'white' }}>
            <Typography
              component={'span'}
              sx={{
                display: 'block',
                fontSize: 30,
                fontWeight: 'bold',
                color: amber['A200'],
              }}
            >
              Top {topCount}
            </Typography>
            {postTitle}
            <Typography
              component={'span'}
              sx={{ display: 'block', fontSize: 20, fontWeight: 'bold' }}
            >
              on {getMonthYear(post.updated_at)}
            </Typography>
          </Typography>
        </Container>
      </Box>
      {topPicks(post.rankList)}
      <Container maxWidth="xl" sx={{ marginY: '2em' }}>
        <Typography variant="h5" align="center" py={2}>
          Top Picks
        </Typography>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <List>
            {post?.rankList?.map((product) => (
              <ListItem disablePadding key={product.detailPageURL}>
                <ListItemButton href={product.detailPageURL}>
                  <ListItemAvatar>
                    <Avatar
                      alt={product.title}
                      src={product.images[0]?.Large?.URL}
                      variant="square"
                      sx={{ height: 300, width: 300 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.title}
                    secondary={
                      <div>
                        <Typography></Typography>
                      </div>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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

export default Post;
