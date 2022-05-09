import { Avatar, ListItem, ListItemIcon, ListItemText } from "@mui/material";

// props / image : 유저 이미지, name : 유저 이름
export default function ChatListProfile(props) {

  const name = props.name;
  const image = props.image;

  return (
    <ListItem button>
      <ListItemIcon>
        <Avatar alt={name} src={image} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}