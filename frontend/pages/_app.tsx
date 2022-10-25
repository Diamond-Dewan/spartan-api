import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '../components/footer';
import Header from '../components/header';

const theme = createTheme();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
