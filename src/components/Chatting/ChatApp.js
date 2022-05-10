import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import ChatUserList from './ChatUserList';
import ChatLog from './ChatLog';
import SmallProfile from '../SmallProfile';

export default function Chat(props) {

  // const ariaLabel = { 'aria-label': 'description' };

  return (
    <Grid container width='1000px' margin='auto' marginTop='25px'>
      <Grid item xs={3.5}>
        <TextField label="Search" fullWidth/>
      </Grid>
      <Grid item xs={0.2} />
      <Grid item xs={8.3}>
        <SmallProfile name='대화 상대 이름' image='' />
      </Grid>

      <Grid item xs={3.5}>
        <ChatUserList />
      </Grid>
      <Grid item xs={0.2} />
      <Grid item xs={8.3} border='1px solid #e0e0e0'>
        <ChatLog />
        <Grid container marginTop={1} p={1}>
          <Grid item xs={10.5}>
            <TextField fullWidth/>
          </Grid>
          <Grid item xs={1.5} align='center'>
            <Fab color="primary"><SendIcon /></Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}