import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import {authApi} from "../../server/auth";

export default function Register(props) {
	const [mode, setMode] = useState('AUTH');
	const [auth, setAuth] = useState(false);
	const [authInfo, setAuthInfo] = useState({code: null, email: null})
	const [registInfo, setRegistInfo] = useState({
		uid: null,
		password: null,
		passwordCheck: null,
		name: null
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
			setMailErrorMessage('메일 주소를 올바르게 입력해 주세요.');
			valid = false;
		} else setMailErrorMessage('');
		return valid;
	};
	const authValidate = () => {
		let valid = true;
		let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		if (regEmail.test(authInfo.email) === false || !authInfo.email) {
			setMailErrorMessage('메일 주소를 올바르게 입력해 주세요.');
			valid = false;
		} else setMailErrorMessage('');
		if (!authInfo.code) {
			setCodeErrorMessage('인증 코드를 입력해 주세요.');
			valid = false;
		} else setCodeErrorMessage('');
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
	const handleClickCodeCheck = (e) => {
		e.preventDefault();
		authValidate() &&
		authApi.checkEmailAuthMail(authInfo)
			.then(res => setMode('REGIST'))
			.catch(error => setCodeErrorMessage('인증 코드가 일치하지 않습니다.'))
	};
	const handleSendMail = (e) => {
		e.preventDefault();
		mailValidate() && authApi.authenticationEmail(authInfo.email, setAuth(true))
	};
	const handleClickRegist = (e) => {
		e.preventDefault();
		props.getLogin(true);
	};

  return(
		<Stack spacing={2}>
			<Grid align='center'>
				<MenuBookIcon color='primary' sx={{ fontSize: 100 }}/>
				<Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
			</Grid>

			{mode === 'AUTH' &&
				<Box component="form">
					<Stack spacing={1}>
						<TextField fullWidth label='Email' onChange={handleAuthInfoChange} name="email"
											 error={!!mailErrorMessage} helperText={mailErrorMessage}
						/>
						<Box sx={{display: auth ? 'block' : 'none', textAlign: 'end'}}>
						<Button onClick={handleSendMail} size='small' sx={{width: 'max-content'}}>인증코드 재전송</Button>
						</Box>

						<TextField fullWidth label='인증코드' onChange={handleAuthInfoChange} name="code"
											 error={!!codeErrorMessage} helperText={codeErrorMessage}
											 sx={{display: auth ? 'block' : 'none'}}
						/>
						<Button type='submit' variant='contained' color='primary' onClick={auth ? handleClickCodeCheck : handleSendMail}>
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
