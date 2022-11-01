import {Avatar, Badge, ListItem, ListItemIcon, ListItemText, Stack, styled, Typography} from "@mui/material";
import React, {useEffect} from 'react';

const Content = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`

export default function ChatProfile(props) {

  const name = props.name;
  const image = props.image;
  const lastChat = props.lastChat;
  const unreadCount = props.unreadCount;

  return (
    <ListItem button onClick={props.onClick}>
      <Badge color={"error"} badgeContent={unreadCount} invisible={unreadCount === 0}>
        <Avatar alt={name} src={image}/>
      </Badge>
      <Stack pl={1}>
        <Content sx={{fontSize: 14, fontWeight: 'bold'}}>{name}</Content>
        <Content sx={{fontSize: 12}}>{lastChat}</Content>
      </Stack>
    </ListItem>
  );
}
