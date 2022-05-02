import React from 'react';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Button, Grid, Stack, TextField } from '@mui/material';

export default function Register() {

  return(
		<Stack spacing={2}>
			<Grid align='center'>
				<MenuBookIcon color='action' sx={{ fontSize: 130 }}/>
				<Typography variant='h4' color='primary' fontWeight='bold'>모두의 일기장</Typography>
			</Grid>

			<form>
				<Stack spacing={1}>
					<TextField fullWidth label='ID'/>
					<TextField fullWidth label='PW' type='password'/>
					<TextField fullWidth label='PW 확인' type='password'/>
					<TextField fullWidth label='Email'/>

					<Button type='submit' variant='contained' color='primary'>회원가입</Button>
				</Stack>
			</form>
		</Stack>
  )
}