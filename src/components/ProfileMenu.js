import React, {useContext} from 'react';
import {Menu, MenuItem} from "@mui/material";
import customAxios from "../AxiosProvider";
import {store} from "../store/store";

export default function ProfileMenu(props) {
  const [, dispatch] = useContext(store);

  const handleClickFollow = (userId, userName) => {
    customAxios.post(`/user/${userId}/follow`)
      .then(res => dispatch({type: 'OpenSnackbar', payload: `${userName}님을 팔로우합니다.`}))
      .catch(err => {console.log(err.response)})
      .finally(() => {});
  };
  const handleClickUnfollow = (userId, userName) => {
    customAxios.delete(`/user/${userId}/follow`)
      .then(res => dispatch({type: 'OpenSnackbar', payload: `${userName}님을 더 이상 팔로우하지 않습니다.`}))
      .catch(err => {console.log(err.response)})
      .finally(() => {});
  };
  const handleClickFollowButton = (isFollowed, userId, userName) => {
    if (isFollowed) return handleClickUnfollow(userId, userName)
    else return handleClickFollow(userId, userName)
  };

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
      <MenuItem onClick={() => handleClickFollowButton(props.isFollowed, props.userId, props.userName)}>
        {props.isFollowed ? '팔로우 취소' : '팔로우'}
      </MenuItem>
      <MenuItem>차단</MenuItem>
    </Menu>
  )
};