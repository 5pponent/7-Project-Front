import { Box, Grid, ListItemText } from "@mui/material";
import React from 'react';

export default function Chat(props) {

  return (
    <Grid item xs={12} align={props.direction}>
      <Box
        bgcolor={props.direction === 'left' ? '#b9e7f6' : 'white'}
        sx={{
          borderRadius: 3, p: 1, m: 1,
          display: 'inline-block', overflowY: 'visible'
      }}>
        <ListItemText 
          align='left'
          primary={props.content} 
        />
        <ListItemText 
          align={props.direction === 'left' ? 'right' : 'left'}
          secondary={props.date}
        />
      </Box>
    </Grid>
  );
}
