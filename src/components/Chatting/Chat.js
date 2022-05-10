import { Grid, ListItemText, Paper } from "@mui/material";


export default function Chat(props) {


  return (
    <Grid item xs={12} align={props.direction}>
      <Paper variant="outlined"
        sx={{ 
          maxWidth:'350px', padding: '15px', margin: '10px', 
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
      </Paper>
      
    </Grid>
  );
}