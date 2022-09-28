import React, { useState } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Button, Dialog, DialogContent, Grid, Stack, TextField, Typography } from '@mui/material';
import Register from './Register';
import './anchorCss.css';
import axios from 'axios';

export default function Login(props) {

  const [open, setOpen] = useState(false);
  const [mailAuth, setMainAuth] = useState(false);
  const [loginInfo, setLoginInfo] = useState({uid: null, password: null});
  const [mail, setMail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [idErrorMessage, setIdErrorMessage] = useState(null);
  const [pwErrorMessage, setPwErrorMessage] = useState(null);
  const [codeErrorMessage, setCodeErrorMessage] = useState(null);

  const handleClickOpen = () => { setOpen(true) };
  const handleClickClose = () => { setOpen(false) };
  const handleClickLogin = (e) => {
    e.preventDefault();
    props.getLogin(true);
    console.log(loginInfo)
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
        <Stack sx={{
          width: 300, position: 'absolute', transform: 'translate(-50%, -50%)',
          left: '50%', top: '50%', borderRadius: '30px', padding: '60px', boxShadow: 6
        }}
               spacing={2} align='center'>
          <Grid align='center'>
            <MenuBookIcon color='primary' sx={{fontSize: 100}}/>
            <Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
          </Grid>

          <Box component="form">
            <Stack spacing={1}>
              <TextField label='ID' name="uid" onChange={handleValueChange}
                         helperText={idErrorMessage} error={!!idErrorMessage}
              />
              <TextField label='PW' type='password' name="password" onChange={handleValueChange}
                         helperText={pwErrorMessage} error={!!pwErrorMessage}
              />
              {mailAuth &&
                  <>
                    <TextField label='Email' type='mail' name="mail" onChange={handleValueChange}/>
                    <TextField label='인증코드' name="code" onChange={handleValueChange}
                               helperText={codeErrorMessage} error={!!codeErrorMessage}
                    />
                  </>
              }

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
