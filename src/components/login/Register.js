import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';

export default function Register(props) {

	const [registInfo, setRegistInfo] = useState({
		uid: "",
		password: "",
		passwordCheck: "",
		name: "",
		email: ""
	});
	const [idErrorMessage, setIdErrorMessage] = useState(null);
	const [pwErrorMessage, setPwErrorMessage] = useState(null);
	const [pwchkErrorMessage, setPwchkErrorMessage] = useState(null);
	const [nameErrorMessage, setNameErrorMessage] = useState(null);
	const [emailErrorMessage, setEmailErrorMessage] = useState(null);

	const clearErrorMessage = () => {
		setIdErrorMessage(null);
		setPwErrorMessage(null);
		setPwchkErrorMessage(null);
		setNameErrorMessage(null);
		setEmailErrorMessage(null);
	}

	const handleValueChange = (e) => {
    const {name, value} = e.target;
    setRegistInfo({
      ...registInfo,
      [name]: value
    });
  }

	const handleClickRegist = (e) => {
		e.preventDefault();
		clearErrorMessage();
		props.toggleLoading(true);

		axios.post("/auth/join", registInfo)
		.then((response) => {
			console.log(response.data);
			props.setLogin(true)
		})
		.catch((err) => {
			var error = err.response.data;
			console.log(error);
			if (Array.isArray(error)) {
				for (const err of error) {
					if (err.cause === "uid") setIdErrorMessage(err.message)
					else if (err.cause === "password") setPwErrorMessage(err.message)
					else if (err.cause === "passwordCheck") setPwchkErrorMessage(err.message)
					else if (err.cause === "name") setNameErrorMessage(err.message)
					else if (err.cause === "email") setEmailErrorMessage(err.message)
				}
			} else {
				if (error.message === "비밀번호가 일치하지 않습니다.") setPwchkErrorMessage(error.message)
				else setIdErrorMessage(error.message)
			}
		})
		.finally(() => { props.toggleLoading(false); })
	};

  return(
		<Stack spacing={2}>
			<Grid align='center'>
				<MenuBookIcon color='primary' sx={{ fontSize: 100 }}/>
				<Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
			</Grid>

			<Box component="form">
				<Stack spacing={1}>
					<TextField fullWidth label='ID' onChange={handleValueChange} name="uid"
						error={idErrorMessage ? true : false} helperText={idErrorMessage} />

					<TextField fullWidth label='PW' type='password' onChange={handleValueChange} name="password"
						error={pwErrorMessage ? true : false} helperText={pwErrorMessage} />

					<TextField fullWidth label='PW 확인' type='password' onChange={handleValueChange} name="passwordCheck"
						error={pwchkErrorMessage ? true : false} helperText={pwchkErrorMessage} />

					<TextField fullWidth label='이름' onChange={handleValueChange} name="name"
						error={nameErrorMessage ? true : false} helperText={nameErrorMessage} />

					<TextField fullWidth label='Email' onChange={handleValueChange} name="email"
						error={emailErrorMessage ? true : false} helperText={emailErrorMessage} />

					<Button type='submit' variant='contained' color='primary'
						onClick={handleClickRegist}>회원가입</Button>
				</Stack>
			</Box>
		</Stack>
  )
}
