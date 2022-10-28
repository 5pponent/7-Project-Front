import { Box, Grid, ListItemText } from "@mui/material";


export default function Chat(props) {

  return (
    <Grid item xs={12} align={props.direction}>
      <Box
        bgcolor={props.direction === 'left' ? '#b9e7f6' : 'white'}
        sx={{ 
          maxWidth:'350px', padding: '15px', margin: '10px',
          display: 'inline-block', overflowY: 'visible', borderRadius: '25px'
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
