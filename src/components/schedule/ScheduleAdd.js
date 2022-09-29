import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import DialogContent from '@mui/material/DialogContent';


export default function ScheduleAdd(props) {

	const [date, setDate] = useState();
	const handleClickAdd = () => { props.getCalendar(true); };
    
    return(
		<Stack spacing={2}>
			<Grid align='center'>
			  <Typography variant='h5' color='primary' fontWeight='bold'>일정 추가</Typography>
			</Grid>

			<form> 
				<DialogContent>
                    <TextField fullWidth type="date" onChange={setDate}/>
					<TextField fullWidth label='일정'/>
					<TextField fullWidth label='장소'/>
					<TextField fullWidth label='시간'/>
					<TextField fullWidth label='메모'/>

					<Grid align='center'>
					<Button type='submit'  variant='contained'  color='primary' 
						onClick={handleClickAdd}>일정추가</Button>
					</Grid>
				</DialogContent>
			</form>
		</Stack>
    )

}







