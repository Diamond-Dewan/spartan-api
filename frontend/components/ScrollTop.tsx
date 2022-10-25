import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import { MouseEvent } from "react";

const ScrollTop = () => {
  // const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true, 
  });
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color='secondary' size='small' aria-lebel='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  )
}

export default ScrollTop;
