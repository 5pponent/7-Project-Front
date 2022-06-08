import React from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Button, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function NewFeedLine(props) {

	const [newFeed, setNewFeed] = useState();
	const handleClickAdd = () => { props.getFeed(true); };

    
    return(
		<Stack spacing={2}>
			<Grid align='center'>
			  <Typography variant='h5' color='primary' fontWeight='bold'>일정 추가</Typography>
			</Grid>

			<form> 
				<Stack spacing={1} alignItems='center' position='relative'>
                  <FormGroup inlineBlock >
                    <FormControlLabel control={<Checkbox />} label="Music" />
                    <FormControlLabel control={<Checkbox />} label="Game" />
                    <FormControlLabel control={<Checkbox />} label="Art" />
                    <FormControlLabel control={<Checkbox />} label="Novel" />
                    <FormControlLabel control={<Checkbox />} label="Movie" />
                    <FormControlLabel control={<Checkbox />} label="Hobby" />s
                    <FormControlLabel control={<Checkbox />} label="MBTI" />

                  </FormGroup>

					<Button type='submit' variant='contained' color='primary'
						onClick={handleClickAdd}>피드추가</Button>
				</Stack>
			</form>
		</Stack>
    )

}