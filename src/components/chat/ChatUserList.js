import {Button, Dialog, DialogTitle, Divider, Stack, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useRef, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {store} from "../../store/store";
import ChatProfile from "./ChatProfile";
import CircularProgress from "@mui/material/CircularProgress";
import SmallProfile from "../SmallProfile";
import {useNavigate} from "react-router-dom";

export default function ChatUserList(props) {
  const [state, dispatch] = useContext(store);

  const [following, setFollowing] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const handleChangeValue = (e) => {setSearchValue(e.target.value)}
  const handleClickProfile = (e, userId) => {
    props.changeSession(userId);
    customAxios.get(`/chat/session`)
      .then(res => {
        setSessionList(res.data);
        handleCloseDialog();
      })
      .catch(err => {console.log(err.response)});
  }
  const handleOpenDialog = () => {
    setOpen(true);
    customAxios.get(`/user/${state.user.id}/following?page=1`)
      .then(res => {
        setFollowing(res.data.users);
      })
      .catch(err => {console.log(err.response)});
  }
  const handleCloseDialog = () => {setOpen(false)}

  return (
    <>
      <TextField
        label="유저 검색"
        size={"small"}
        value={searchValue}
        onChange={handleChangeValue}
      />

      <Stack sx={{
        height: '70vh', overflowY: 'auto', border: '1px solid #e0e0e0',
        wordBreak: 'break-all', alignItems: 'center'
      }}>
        <Stack spacing={1} py={1}>
          <Button variant={"outlined"} onClick={handleOpenDialog} sx={{mx: 1}}>
            채팅 상대 추가
          </Button>
          {
            props.sessionList.length > 0 ? props.sessionList.map((it) => {
              return (
                <ChatProfile
                  key={it.id}
                  image={it.users[0].image ? it.users[0].image.source : ''}
                  name={it.users[0].name}
                  lastChat={it.lastChat}
                  unreadCount={it.unreadCount}
                  onClick={(e) => {handleClickProfile(e, it.users[0].id)}}
                />
              )
            })
            :
            <Stack alignItems={"center"} height={"100%"} justifyContent={"center"}>
              <Typography>채팅 세션이 없습니다.</Typography>
            </Stack>
          }
        </Stack>
      </Stack>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>채팅 상대 추가</DialogTitle>
        <Divider/>
        <Stack spacing={2} p={3}>
          <Typography variant={"subtitle2"}>팔로우 한 유저와 채팅할 수 있습니다.</Typography>
          {
            following.map((it) => {
              return (
                <SmallProfile
                  key={it.id}
                  direction={"row"}
                  spacing={1}
                  name={it.name}
                  image={it.image ? it.image.source : ''}
                  onClick={(e) => handleClickProfile(e, it.id)}
                />
              )
            })
          }
        </Stack>
      </Dialog>
    </>
  );
}
