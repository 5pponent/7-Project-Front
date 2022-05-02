import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Button, Dialog, DialogContent, Grid, Stack, TextField } from '@mui/material';
import Register from './Register';
import './anchorCss.css';

export default function Login(props) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  const handleClickLogin = () => {
    props.getLogin(true);
  }

  return (
    <>
      <Stack sx={{ width: 300, position: 'fixed', transform:'translate(-50%, -50%)', left: '50%', top: '50%' }} 
        spacing={2} align='center'>
        <Grid align='center'>
          <MenuBookIcon color='action' sx={{ fontSize: 130 }}/>
          <Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
        </Grid>
        <form>
          <Stack spacing={1}>
            <TextField label='ID'/>
            <TextField label='PW' type='password'/>
           <Button type='submit' variant='contained' color='success' onClick={handleClickLogin}>로그인</Button>
          </Stack>
        </form>
        <a href="/">아이디,비밀번호를 잊어버렸어요</a>
        <Typography variant='subtitle2' color="text.secondary">또는</Typography>
        <Button onClick={handleClickOpen} variant='contained'>회원가입</Button>  
      </Stack>
      <Dialog open={open} onClose={handleClickClose} maxWidth='xs' fullWidth={true}>
        <DialogContent>
          <Register></Register>
        </DialogContent>
      </Dialog>
    </>
  );
}