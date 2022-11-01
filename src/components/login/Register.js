import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Box, Button, Grid, List, ListItem, Stack, TextField, Typography} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {useNavigate} from "react-router-dom";
import {store} from "../../store/store";

export default function Register(props) {
  const [state, dispatch] = useContext(store);
  let navigate = useNavigate();

  const [mode, setMode] = useState('AUTH');
  const [auth, setAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState({code: '', email: ''})
  const [registInfo, setRegistInfo] = useState({
    name: '',
    password: '',
    passwordCheck: ''
  });
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [pwchkErrorMessage, setPwchkErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [mailErrorMessage, setMailErrorMessage] = useState('');
  const [codeErrorMessage, setCodeErrorMessage] = useState('');

  const showForm = mode === 'REGIST' ? 'block' : 'none';

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
    let regPassword = /^(?=.[a-zA-Z0-9])(?=.[a-zA-Z!@#$%^&])(?=.[0-9!@#$%^&*]).{6,20}$/;
    if (!registInfo.password) {
      setPwErrorMessage('비밀번호가 형식에 맞지 않습니다.');
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
    dispatch({type: 'OpenLoading', payload: '인증 코드를 확인중입니다..'});
    (mailValidate() & codeValidate()) &&
    await axios.post(`/auth/mail-auth-check`, authInfo)
      .then(res => {
        setMode('REGIST');
        setAuth(false);
      })
      .catch(error => {
        setCodeErrorMessage(error.response.data.message);
        console.log(error.response);
      })
      .finally(() => dispatch({type: 'CloseLoading'}));
    dispatch({type: 'CloseLoading'});
  };
  const handleClickSendMail = async (e) => {
    e.preventDefault();
    dispatch({type: 'OpenLoading', payload: '인증 메일을 보내는 중입니다..'});
    mailValidate() &&
    await axios.post(`/auth/mail-auth`, {email: authInfo.email})
      .then(res => setAuth(true))
      .catch(error => setMailErrorMessage(error.response.data.message))
      .finally(() => dispatch({type: 'CloseLoading'}));
    dispatch({type: 'CloseLoading'});
  };
  const handleClickRegist = async (e) => {
    e.preventDefault();
    dispatch({type: 'OpenLoading', payload: '회원가입을 진행 중입니다..'});
    registValidate() && await axios.post(`/auth/join`, {email: authInfo.email, ...registInfo})
      .then(res => {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch(error => {console.log(error.response);})
      .finally(() => dispatch({type: 'CloseLoading'}))
    dispatch({type: 'CloseLoading'});
  };

  useEffect(() => {
    if (authInfo.code.length === 6) handleClickCodeCheck()
  }, [authInfo.code]);

  return (
    <Stack spacing={2}>
      <Grid align='center'>
        <MenuBookIcon color='primary' sx={{fontSize: 100}}/>
        <Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
      </Grid>

        <Box component="form">
          <Stack spacing={1}>
            <TextField fullWidth label='Email' name="email" onChange={handleAuthInfoChange}
                       error={!!mailErrorMessage} helperText={mailErrorMessage} disabled={mode === 'REGIST'}
            />
            <Box sx={{display: auth ? 'block' : 'none', textAlign: 'end'}}>
              <Button type={"button"} onClick={handleClickSendMail} size='small' sx={{width: 'max-content'}}>인증코드 재전송</Button>
            </Box>

            <TextField fullWidth label='인증코드' name="code" onChange={handleAuthInfoChange}
                       error={!!codeErrorMessage} helperText={codeErrorMessage}
                       inputProps={{maxLength: 6, autocomplete: 'off'}}
                       sx={{display: auth ? 'block' : 'none'}}
            />

            <Button type='button' variant='contained' color='primary' onClick={auth ? handleClickCodeCheck : handleClickSendMail}
                    sx={{display: mode === 'AUTH' ? 'block' : 'none'}}>
              {auth ? "확인" : "인증코드 발송"}
            </Button>

            <TextField fullWidth label='PW' type='password' onChange={handleValueChange} name="password"
                       error={!!pwErrorMessage} helperText={pwErrorMessage} sx={{display: showForm}}
            />
            <TextField fullWidth label='PW 확인' type='password' onChange={handleValueChange} name="passwordCheck"
                       error={!!pwchkErrorMessage} helperText={pwchkErrorMessage} sx={{display: showForm}}
            />
            <TextField fullWidth label='이름' onChange={handleValueChange} name="name"
                       error={!!nameErrorMessage} helperText={nameErrorMessage} sx={{display: showForm}}
            />

            <List sx={{display: showForm}}>
              <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>
                ※ 비밀번호는 대소문자, 숫자, 특수문자 중 2가지 이상을 포함하여 6~20자리로 설정해주세요.
              </ListItem>
            </List>

            <Button type='submit' variant='contained' color='primary' onClick={handleClickRegist} sx={{display: showForm}}>
              회원가입
            </Button>

          </Stack>
        </Box>
    </Stack>
  )
}
