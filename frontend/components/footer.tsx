import Grid from '@mui/material/Grid';

const Footer = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        top: 'auto',
        bottom: 0,
        height: '100px',
        borderTop: '1px solid #eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#80ced6',
      }}
    >
      Footer
    </Grid>
  );
};

export default Footer;
