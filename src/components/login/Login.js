import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Button, Dialog, DialogContent, Grid, Stack, TextField } from '@mui/material';
import Register from './Register';
import './anchorCss.css';
import axios from 'axios';

export default function Login(props) {

  const [open, setOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({id: null, password: null});
  const [errorMessage, setErrorMessage] = useState(null);
  const [idErrorMessage, setIdErrorMessage] = useState(null);
  const [pwErrorMessage, setPwErrorMessage] = useState(null);

  const handleClickOpen = () => { setOpen(true); }
  const handleClickClose = () => { setOpen(false); }
  const handleClickLogin = (e) => {
    props.toggleLoading(true);
    e.preventDefault();
    axios.post("./login", loginInfo)
    .then((response) => {
      // 검증 결과 받아서 출력
      var result = response.data;
      console.log(result);
      if (result.hasOwnProperty("errors")) {
        var errors = result.errors;
        errors.hasOwnProperty("id") ? setIdErrorMessage(errors.id) : setIdErrorMessage(null);
        errors.hasOwnProperty("password") ? setPwErrorMessage(errors.password) : setPwErrorMessage(null);
        errors.hasOwnProperty("global") ? setErrorMessage(errors.global) : setErrorMessage(null);
        props.toggleLoading(false);
        return;
      }
      // 로그인 성공 로직
      props.setName(result.name);
      props.setEmail(result.email);
      props.setId(result.id);
      props.toggleLoading(false);
      setErrorMessage(null);
      props.getLogin(true);
    })
    .catch(err => console.log(err));
  }
  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  }

  return (
    <>
      <Stack sx={{ width: 300, position: 'absolute', transform:'translate(-50%, -50%)', 
        left: '50%', top: '50%', borderRadius: '30px', padding: '60px', boxShadow: 6 }} 
        spacing={2} align='center'>
        <Grid align='center'>
          <MenuBookIcon color='primary' sx={{ fontSize: 100 }}/>
          <Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
        </Grid>
        <Box component="form">
          <Stack spacing={1}>
            <TextField label='ID' name="id" onChange={handleValueChange}
              helperText={idErrorMessage} error={idErrorMessage ? true : false}
            />
            <TextField label='PW' type='password' name="password" onChange={handleValueChange}
              helperText={pwErrorMessage} error={pwErrorMessage ? true : false}
            />
           <Button type='submit' variant='contained' color='success' onClick={handleClickLogin}>로그인</Button>
           <Typography color='red' fontSize={12}>{errorMessage}</Typography>
          </Stack>
        </Box>
        <a href="/">아이디/비밀번호를 잊어버렸어요</a>
        <Typography variant='subtitle2' color="text.secondary">또는</Typography>
        <Button onClick={handleClickOpen} variant='contained'>회원가입</Button>  
      </Stack>
      <Dialog open={open} onClose={handleClickClose} maxWidth='xs' fullWidth={true}>
        <DialogContent>
          <Register 
            getLogin={props.getLogin} 
            toggleLoading={props.toggleLoading}
            setName={props.setName}
            setEmail={props.setEmail}
            setId={props.setId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
