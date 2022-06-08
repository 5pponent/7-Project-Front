import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';

export default function ScheduleAdd(props) {

	const [date, setDate] = useState();
	const handleClickAdd = () => { props.getCalendar(true); };
    
    return(
		<Stack spacing={2}>
			<Grid align='center'>
			  <Typography variant='h5' color='primary' fontWeight='bold'>일정 추가</Typography>
			</Grid>

			<form> 
				<Stack spacing={1} alignItems='center'>
                    <TextField fullWidth type="date" onChange={setDate}/>
					<TextField fullWidth label='제목'/>
					<TextField fullWidth label='장소'/>
					<TextField fullWidth label='메모'/>

					<Button type='submit' variant='contained' color='primary'
						onClick={handleClickAdd}>일정추가</Button>
				</Stack>
			</form>
		</Stack>
    )

}