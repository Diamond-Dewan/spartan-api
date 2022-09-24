import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import rankListCounter from '../lib/rankListCounter';
import { Post } from '../types';

// const useStyles = makeStyles(({}) => {});

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <Grid
        container
        spacing={{ sm: 2 }}
        columns={{ xs: 4, sm: 12, md: 12, lg: 12, xl: 10 }}
        rowSpacing={2}
        my={2}
      >
        {posts.map((post) => (
          <Grid item xs={12} sm={4} md={3} xl={2} key={post.id}>
            <Card variant="outlined">
              <CardActionArea
                href={`/${post?.categories?.[0]?.slug}/${post.slug}`}
              >
                <CardMedia
                  component={'img'}
                  height="250"
                  image={post?.rankList[0]?.images[0]?.Large?.URL}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {new Date(post.published_at).toDateString()}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Top {rankListCounter(post?.rankList?.length)} {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      '-webkit-box-orient': 'vertical',
                      '-webkit-line-clamp': '4',
                      overflow: 'hidden',
                    }}
                  >
                    {post.body ? post.body : post.rankList?.[0].contents}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
