import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingProcess(props) {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 301 }}
        open={props.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}