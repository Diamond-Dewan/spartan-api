import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles/';
import Head from 'next/head';
import Post from '../../components/Post';

const theme = createTheme();

export default function Index({ category }: { category: any }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Head>
          <title>Category | {category?.name}</title>
        </Head>
        <main>
          Category: {category?.name}
          <br />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {category?.posts?.map((post) => (
              <Grid item xs={2} sm={4} md={4} key={post.id}>
                <Post categoryName={category?.name} post={post} />
              </Grid>
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export async function getStaticProps({
  params,
}: {
  params: { category: string };
}) {
  const slug = encodeURIComponent(params.category);
  const res = await fetch(`http://localhost:1337/categories?slug=${slug}`);
  console.log('res: ', res);

  const category = await res.json();

  return {
    props: {
      category: category[0],
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/categories');
  const allCategories = await res.json();

  return {
    paths: allCategories.map((category) => `/${category.slug}`),
    fallback: true,
  };
}
