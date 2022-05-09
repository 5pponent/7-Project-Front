import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import ChatUserList from './ChatUserList';

export default function Chat(props){

  // const ariaLabel = { 'aria-label': 'description' };

  return(
    <Grid container width='1000px' margin='auto' marginTop='25px'>
      <Grid item xs={3.5} paddingRight='5px'>
        <TextField label="Search" fullWidth/>
        <ChatUserList />
      </Grid>
      
      <Grid item xs={8.5}>
        <List sx={{height: '75vh', overflow: 'auto'}}>
          <ListItem key="1">
            {/* 채팅 내역 */}
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Divider />
        <Grid container marginTop={1}>
          <Grid item xs={11}><TextField fullWidth/></Grid>
          <Grid item xs={1} align='center'>
            <Fab color="primary"><SendIcon /></Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}