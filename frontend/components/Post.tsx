import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import rankListCounter from '../lib/rankListCounter';
import { Post as PostType } from '../types';

export default function Post({
  categoryName,
  post,
}: {
  categoryName: string;
  post: PostType;
}) {
  // const theme = useTheme();
  const count = rankListCounter(post?.rankList?.length);

  return (
    <Link href={`/${categoryName}/${post.slug}`}>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component={'img'}
          sx={{ width: 151, height: 151, flex: '1 0 auto' }}
          image={post?.rankList[0]?.images[0]?.Large?.URL}
          alt={post.title}
        />
        {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
        <CardContent sx={{ flex: '4 0 auto' }}>
          <Typography variant="h6" noWrap={true} sx={{ p: 2 }}>
            Top {count} {post.title}
          </Typography>
        </CardContent>
        {/* </Box> */}
      </Card>
    </Link>
  );
}
