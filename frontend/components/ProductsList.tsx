import ExpandMoreSharp from '@mui/icons-material/ExpandMoreSharp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled, Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { formatTitle } from '../lib/formaters';
import { Product } from '../types';

interface ExpandMoreButtonProps extends IconButtonProps {
  expand: boolean | string;
}

const ExpandMore = styled((props: ExpandMoreButtonProps) => {
  const { expand, ...others } = props;
  return <IconButton {...others} />;
})(({ theme, expand }: { theme: Theme; expand: boolean | string }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductsList = ({ products }: { products: Product[] }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<false | string>(false);

  const handleExpandClick = (item: string) => {
    setExpanded(expanded === item ? false : item);
  };

  return (
    <Stack direction={'column'} spacing={2}>
      {products.map((product, index) => (
        <Card key={index}>
          <CardMedia
            component={'img'}
            image={product.images[0]?.Large?.URL}
            sx={{
              objectFit: 'contain',
              height: { xs: 180, sm: 200, md: 250, xl: 300 },
            }}
          />
          <CardContent>
            <Typography variant="h6">{formatTitle(product.title)}</Typography>
            <ListItemText primary={'Features:'} />
            <List dense>
              {/* List items */}
              {product.contents?.map((content, index) => {
                if (index < 1) {
                  return (
                    <ListItem key={index}>
                      <ListItemText primary={content} />
                    </ListItem>
                  );
                }
                return (
                  <Collapse
                    key={product.title}
                    in={expanded === product.title}
                    timeout="auto"
                    unmountOnExit
                  >
                    <ListItem key={index}>
                      <ListItemText primary={content} />
                    </ListItem>
                  </Collapse>
                );
              })}
              {/* List items End*/}

              {/* List Actions */}
              <ListItem>
                <ExpandMore
                  expand={expanded === product.title}
                  onClick={() => handleExpandClick(product.title)}
                  aria-expanded={expanded === product.title}
                  aria-label={'show more'}
                  theme={theme}
                >
                  <ExpandMoreSharp />
                </ExpandMore>
              </ListItem>
              {/* List Actions End */}
            </List>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ProductsList;
