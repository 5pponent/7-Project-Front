import { Fab, Fade } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { useEffect } from "react";

export default function ScrollUpButton() {

  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.pageYOffset);
    if (scroll > 600) setShow(true);
    else setShow(false);
  };

  const handleClickButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScroll(205);
  };

  useEffect(() => {
    if (scroll > 600) setShow(true);
  }, [scroll]);

  const watch = () => window.addEventListener('scroll', handleScroll);
  useEffect(() => {
    watch();
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Fade in={show}>
      <Fab
        size='large'
        color='primary'
        sx={{ position: 'fixed', bottom: 50, right: 50 }}
        onClick={handleClickButton}>
        <KeyboardArrowUpIcon/>
      </Fab>
    </Fade>
  );
}