import React, {useContext, useState} from 'react';
import {store} from "../../store/store";
import axios from "axios";
import {Box, Button, Grid, Stack, TextField, Typography} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Register(props) {
  const [state, dispatch] = useContext(store);

  const [mode, setMode] = useState('AUTH');
  const [auth, setAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState({code: '', email: ''})
  const [registInfo, setRegistInfo] = useState({
    name: '',
    password: '',
    passwordCheck: '',
    uid: ''
  });
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [pwchkErrorMessage, setPwchkErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [mailErrorMessage, setMailErrorMessage] = useState('');
  const [codeErrorMessage, setCodeErrorMessage] = useState('');

  const mailValidate = () => {
    let valid = true;
    let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (regEmail.test(authInfo.email) === false || !authInfo.email) {
      setMailErrorMessage('메일 주소를 바르게 입력해 주세요.');
      valid = false;
    } else setMailErrorMessage('');
    return valid;
  };
  const codeValidate = () => {
    let valid = true;
    if (!authInfo.code) {
      setCodeErrorMessage('인증 코드를 입력해 주세요.');
      valid = false;
    } else setCodeErrorMessage('');
    return valid;
  };
  const registValidate = () => {
    let valid = true;
    if (!registInfo.uid) {
      setIdErrorMessage('아이디를 입력해 주세요.');
      valid = false;
    } else setIdErrorMessage('');
    if (!registInfo.password) {
      setPwErrorMessage('비밀번호를 입력해 주세요.');
      valid = false;
    } else setPwErrorMessage('');
    if (registInfo.password !== registInfo.passwordCheck) {
      setPwchkErrorMessage('비밀번호가 일치하지 않습니다.');
      valid = false;
    } else setPwchkErrorMessage('');
    if (!registInfo.name) {
      setNameErrorMessage('이름을 입력해 주세요.');
      valid = false;
    } else setNameErrorMessage('');
    return valid;
  };

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setRegistInfo({
      ...registInfo,
      [name]: value
    });
  };
  const handleAuthInfoChange = (e) => {
    const {name, value} = e.target;
    setAuthInfo({
      ...authInfo,
      [name]: value
    });
  };
  const handleClickCodeCheck = async (e) => {
    e.preventDefault();
    (mailValidate() & codeValidate()) &&
    await axios.post(`/auth/mail-auth-check`, authInfo)
      .then(res => setMode('REGIST'))
      .catch(error => {
        setCodeErrorMessage(error.response.data.message);
        console.log(error.response);
      })
  };
  const handleClickSendMail = async (e) => {
    e.preventDefault();
    mailValidate() &&
    await axios.post(`/auth/mail-auth`, {email: authInfo.email})
      .then(res => setAuth(true))
      .catch(error => setMailErrorMessage(error.response.data.message))
  };
  const handleClickRegist = async (e) => {
    e.preventDefault();
    registValidate() && await axios.post(`/auth/join`, {email: authInfo.email, ...registInfo})
      .then(res => {
        dispatch({type: 'Login'});
        dispatch({type: 'User', payload: res});
      })
      .catch(error => {
        setIdErrorMessage(error.response.data.message);
        console.log(error.response);
      })
  };

  return (
    <Stack spacing={2}>
      <Grid align='center'>
        <MenuBookIcon color='primary' sx={{fontSize: 100}}/>
        <Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
      </Grid>

      {mode === 'AUTH' &&
        <Box component="form">
          <Stack spacing={1}>
            <TextField fullWidth label='Email' name="email" onChange={handleAuthInfoChange}
                       error={!!mailErrorMessage} helperText={mailErrorMessage}
            />
            <Box sx={{display: auth ? 'block' : 'none', textAlign: 'end'}}>
              <Button onClick={handleClickSendMail} size='small' sx={{width: 'max-content'}}>인증코드 재전송</Button>
            </Box>

            <TextField fullWidth label='인증코드' name="code" onChange={handleAuthInfoChange}
                       error={!!codeErrorMessage} helperText={codeErrorMessage}
                       sx={{display: auth ? 'block' : 'none'}}
            />
            <Button type='submit' variant='contained' color='primary'
                    onClick={auth ? handleClickCodeCheck : handleClickSendMail}>
              {auth ? "확인" : "인증코드 발송"}
            </Button>
          </Stack>
        </Box>
      }

      {mode === 'REGIST' &&
        <Box component="form">
          <Stack spacing={1}>
            <TextField fullWidth label='ID' onChange={handleValueChange} name="uid"
                       error={!!idErrorMessage} helperText={idErrorMessage}
            />
            <TextField fullWidth label='PW' type='password' onChange={handleValueChange} name="password"
                       error={!!pwErrorMessage} helperText={pwErrorMessage}
            />
            <TextField fullWidth label='PW 확인' type='password' onChange={handleValueChange} name="passwordCheck"
                       error={!!pwchkErrorMessage} helperText={pwchkErrorMessage}
            />
            <TextField fullWidth label='이름' onChange={handleValueChange} name="name"
                       error={!!nameErrorMessage} helperText={nameErrorMessage}
            />

            <Button type='submit' variant='contained' color='primary'
                    onClick={handleClickRegist}>회원가입</Button>
          </Stack>
        </Box>
      }
    </Stack>
  )
}
