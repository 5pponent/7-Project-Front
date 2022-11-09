import React from 'react';
import {Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, Stack, Typography} from "@mui/material";

export default function NewFeedLine(props) {
  const handleSelectOccupation = (name) => {
    if (props.selectedOccupation.includes(name)) {
      const newList = props.selectedOccupation.filter(item => item !== name);
      props.handleGetOccupation(newList)
    } else {
      props.handleGetOccupation([...props.selectedOccupation, name]);
    }
  };

  if (props.feedLoading) {
    return (
      <Box display="flex" justifyContent="center" style={{padding: 100}}>
        <CircularProgress size={60}></CircularProgress>
      </Box>
    )
  } else {
    return (
      <Stack spacing={1} sx={{m: 'auto', width: '100%', maxWidth: 800, boxShadow: 5, borderRadius: 1.5}}>
        <Typography variant={'h6'} sx={{textAlign: 'center', m: 2}}>관심사를 선택해 주세요</Typography>

        <Grid container sx={{p: 3}}>
          {props.occupationList.map((item) => (
            <Grid item key={item.id} xs={3}>
              <FormControlLabel
                label={item.name}
                control={<Checkbox checked={props.selectedOccupation.includes(item.name)} onChange={() => handleSelectOccupation(item.name)}/>}
              />
            </Grid>
          ))}
        </Grid>
        
        <Button sx={{width: '100%'}}>확인</Button>
      </Stack>
    )
  }
}

