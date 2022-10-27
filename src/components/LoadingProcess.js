import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Stack, Typography} from "@mui/material";

function LoadingProcess(props) {
  return (
    <>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 301}}
        open={props.open}
      >
        <Stack alignItems={'center'} spacing={3}>
          <CircularProgress color="inherit"/>
          <Typography style={{userSelect: 'none', msUserSelect: 'none'}}>
            {props.message}
          </Typography>
        </Stack>
      </Backdrop>
    </>
  );
}

export default React.memo(LoadingProcess)