import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';

export default function Register(props) {

	const [registInfo, setRegistInfo] = useState({
		id: null,
		password: null,
		passwordCheck: null,
		name: null,
		email: null
	});
	const [idErrorMessage, setIdErrorMessage] = useState(null);
	const [pwErrorMessage, setPwErrorMessage] = useState(null);
	const [pwchkErrorMessage, setPwchkErrorMessage] = useState(null);
	const [nameErrorMessage, setNameErrorMessage] = useState(null);
	const [emailErrorMessage, setEmailErrorMessage] = useState(null);
	const handleValueChange = (e) => {
    const {name, value} = e.target;
    setRegistInfo({
      ...registInfo,
      [name]: value
    });
  }
	const handleClickRegist = (e) => {
		props.toggleLoading(true);
		e.preventDefault();
		axios.post("./join", registInfo)
		.then((response) => {
			props.toggleLoading(true);
			var result = response.data;
			console.log(result);
			axios.post("./login", {"id": result.id, "password": result.password})
			.then((response) => {
				result = response.data;
				props.setName(result.name);
				props.setEmail(result.email);
				props.setId(result.id);
				props.toggleLoading(false);
				props.getLogin(true);
			})
			.catch(err => console.log(err));
		})
		.catch((err) => {
			var errors = err.response.data.errors;
			console.log(errors);
			errors.hasOwnProperty("id") ? setIdErrorMessage(errors.id) : setIdErrorMessage(null);
			errors.hasOwnProperty("password") ? setPwErrorMessage(errors.password) : setPwErrorMessage(null);
			errors.hasOwnProperty("passwordCheck") ? setPwchkErrorMessage(errors.passwordCheck) : setPwchkErrorMessage(null);
			errors.hasOwnProperty("name") ? setNameErrorMessage(errors.name) : setNameErrorMessage(null);
			errors.hasOwnProperty("email") ? setEmailErrorMessage(errors.email) : setEmailErrorMessage(null);
			props.toggleLoading(false);
		});
	};

  return(
		<Stack spacing={2}>
			<Grid align='center'>
				<MenuBookIcon color='primary' sx={{ fontSize: 100 }}/>
				<Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
			</Grid>

			<Box component="form">
				<Stack spacing={1}>
					<TextField fullWidth label='ID' onChange={handleValueChange} name="id"
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
