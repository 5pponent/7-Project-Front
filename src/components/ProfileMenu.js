import React from 'react';
import {Menu, MenuItem} from "@mui/material";

export default function ProfileMenu(props) {
  return (
    <Menu
      anchorEl={props.anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      onClose={props.onClose}
    >
      <MenuItem onClick={props.onClick}>프로필</MenuItem>
      <MenuItem>팔로우</MenuItem>
      <MenuItem>차단</MenuItem>
    </Menu>
  )
};