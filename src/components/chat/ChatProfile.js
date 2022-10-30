import {Avatar, ListItem, ListItemIcon, ListItemText, styled, Typography} from "@mui/material";
import React from 'react';

const Content = styled(ListItemText)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`

// props / image : 유저 이미지, name : 유저 이름
export default function ChatProfile(props) {

  const name = props.name;
  const image = props.image;

  return (
    <ListItem button onClick={props.onClick}>
      <ListItemIcon>
        <Avatar alt={name} src={image} />
      </ListItemIcon>
      <Content primary={name} />
    </ListItem>
  );
}
