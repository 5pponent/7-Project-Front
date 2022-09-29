import { Grid, List } from "@mui/material";
import { Avatar, ListItem, ListItemIcon, ListItemText, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { DialogContent } from '@mui/material';
import { Dialog } from '@material-ui/core';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';


export default function FriendApp(props){


  function FriendProfile(props) {

    let content = null;

    const name = props.name;
    const image = props.image;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    }
    const handleClickClose = () => {
        setOpen(false);
    }

    const handleClickStart = () => {
      props.getChatStart(true);
    }


    //클릭 시 프로필로 이동가능
    const event=[];
    
    return (
      <ListItem secondaryAction={<IconButton edge="end" ><CommentIcon onClick={handleClickOpen} />
       <Dialog open={open} onClick={handleClickClose} maxWidth='xs' fullWidth={true} >
          <DialogContent>
            <TextField autoFocus margin="dense" label="Send Message" type="email" fullWidth variant="standard"/>
            <Button type='submit' variant='contained' color='primary' onClick={handleClickStart}>Send</Button>
          </DialogContent>
        </Dialog>
      </IconButton>}>
        {/* 프로필 이동이벤트 */}
          <ListItemIcon >
            <Avatar alt={name} src={image} />
          </ListItemIcon>
          <ListItemText primary={name}/>
        
      </ListItem>
    );
}



return ( 
  <Grid container width='1000px' margin='auto' marginTop='25px'>
    <Grid>
      <List sx={{width:'100%s', height: '79vh', overflow: 'auto', border: '1px solid #e0e0e0'}} >
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
        <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <FriendProfile name='Cordelai Owen' image="https://material-ui.com/static/images/avatar/4.jpg" />
      </List>
    </Grid>
    <Grid>
      {/* 클릭 시 프로필 */}
    </Grid>
  </Grid>
);

};