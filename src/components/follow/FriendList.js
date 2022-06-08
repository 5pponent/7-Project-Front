import { List } from "@mui/material";
import { Avatar, ListItem, ListItemIcon, ListItemText, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { DialogContent } from '@mui/material';
import { Dialog } from '@material-ui/core';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';


export default function FriendList(props) {

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

        return (
          <ListItem secondaryAction={<IconButton aria-label="comment"><CommentIcon onClick={handleClickOpen}/>
           <Dialog open={open} onClick={handleClickClose} maxWidth='xs' fullWidth={true} >
              <DialogContent>
                <TextField autoFocus margin="dense" label="Send Message" type="email" fullWidth variant="standard"/>
                <Button type='submit' variant='contained' color='primary' onClick={handleClickStart}>Send</Button>
              </DialogContent>
            </Dialog>
          </IconButton>}>
            <ListItemIcon>
              <Avatar alt={name} src={image} />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        );
    }

    return ( 
        <List sx={{width:'100%', height: '79vh', overflow: 'auto', border: '1px solid #e0e0e0', wordBreak: 'break-all',position: 'static'}}>
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
            <FriendProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
            <FriendProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
            <FriendProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        </List>
    );
}