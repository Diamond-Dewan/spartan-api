import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { formatTitle, getMonthDayYear } from '../lib/formaters';
import { Product } from '../types';

const TopPicks = ({ rankList }: { rankList: Product[] }) => {
  const theme = useTheme();
  const items: React.ReactElement[] = [];
  for (let index = 0; index < 3; index++) {
    const product = rankList[index];
    items.push(
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
        <Card>
          <CardHeader
            subheader={getMonthDayYear(product.productInfo?.releaseDate)}
            action={
              <Chip
                label={`#top ${index + 1}`}
                component="a"
                size="medium"
                color="success"
                clickable={false}
              />
            }
          />
          <div style={{ position: 'relative' }}>
            <CardMedia
              component="img"
              image={product.images[0]?.Large?.URL}
              sx={{
                objectFit: 'contain',
                height: { xs: 180, sm: 200, md: 250, xl: 300 },
              }}
            />
            <div
              style={{
                position: 'absolute',
                backgroundColor: theme.palette.grey[900],
                opacity: '70%',
                width: '100%',
                height: '100%',
                bottom: 0,
                left: 0,
                display: 'flex',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  alignSelf: 'self-end',
                  color: 'white',
                  padding: '2% 2%',
                }}
              >
                {formatTitle(product.title)}
              </Typography>
            </div>
          </div>
        </Card>
      </Grid>
    );
  }

  return (
    <Paper elevation={0} sx={{ padding: '2% 5%', margin: '1% 5%' }}>
      <Typography variant="h5" align="center" py={2}>
        Top Picks
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {items}
      </Grid>
    </Paper>
  );
};

export default TopPicks;
