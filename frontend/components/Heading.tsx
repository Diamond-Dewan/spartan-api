import Box from '@mui/material/Box';
import { amber } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getMonthYear } from '../lib/formaters';

const PostHeading = ({
  title,
  count,
  updatedAt,
}: {
  title: string;
  count: string;
  updatedAt: string;
}) => {
  const postTitle = title.replace(/(^\w{1})|(\s+\w{1})/g, (char) =>
    char.toUpperCase()
  );

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component={'h1'}
          sx={{ color: 'white', padding: '2% 5%', margin: '1% 5%' }}
        >
          <Typography
            component={'span'}
            sx={{
              display: 'block',
              fontSize: 30,
              fontWeight: 'bold',
              color: amber['A200'],
            }}
          >
            Top {count}
          </Typography>
          {postTitle}
          <Typography
            component={'span'}
            sx={{ display: 'block', fontSize: 20, fontWeight: 'bold' }}
          >
            on {getMonthYear(updatedAt)}
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default PostHeading;
