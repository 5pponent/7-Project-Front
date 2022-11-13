import HeaderAppBar from "./header/HeaderAppBar";
import React, {useContext, useEffect, useRef, useState} from "react";
import {store} from "../store/store";
import customAxios from "../AxiosProvider";
import {Alert, Avatar, Box, Button, Divider, Snackbar, Stack, styled, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {EventSourcePolyfill} from "event-source-polyfill"

const Content = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: small;
`

export default function Template({marginNum, element, lastMessage}) {
  const [state, dispatch] = useContext(store);

  const location = useLocation();
  const navigate = useNavigate();

  let eventSource = useRef({});
  const [lastStream, setLastStream] = useState({});
  const connectSse = () => {
    eventSource.current = new EventSourcePolyfill(`/notice/sub`, {
      headers: {
        Authorization: localStorage.getItem(`token`),
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
      },
      heartbeatTimeout: 120000,
      withCredentials: true,
    });
    eventSource.current.onopen = () => {
      console.log("SSE Connected status: ", eventSource.current.readyState);
    }
    eventSource.current.onmessage = (res) => {
      let data = JSON.parse(res.data);
      console.log("Stream onmessage: ", data);
      setLastStream(data);
    }
  }

  const [open, setOpen] = useState(false);
  const handleCloseSnackbar = (event, reason) => {reason !== 'clickaway' && setOpen(false)}
  const handleClickSnackbar = () => {navigate(`/chat?session=${lastMessage?.sessionId}`)}
  const loadUnreadChatCount = () => {
    customAxios.get(`/chat/session/unread-count`)
      .then(res => {
        dispatch({type: 'UnreadChatCount', payload: res.data.count});
      })
      .catch(err => {console.log(err)});
  }

  useEffect(() => {
    customAxios.get(`/user`)
      .then(res => {
        dispatch({type: 'User', payload: res.data});
        connectSse();
      })
      .catch(err => {console.log(err.response);});
    loadUnreadChatCount();
  }, []);

  useEffect(() => {
    loadUnreadChatCount();
    if (location.pathname !== `/chat` && lastMessage.hasOwnProperty('sender')) {
      if (lastMessage.sender.id !== state.user.id) {
        setOpen(true);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    console.log("lastStream: ", lastStream);
  }, [lastStream]);

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        style={{zIndex: 1000, cursor: "pointer"}}
        onClick={handleClickSnackbar}
      >
        <Alert severity={"info"} icon={false}>
          <Stack spacing={1} width={250}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Avatar sx={{width: 30, height: 30}} src={lastMessage?.sender?.image ? lastMessage.sender.image.source : ""}/>
              <Typography sx={{fontSize: '14px', fontWeight: 'bold', wordBreak: 'keep-all'}}>{lastMessage?.sender?.name}</Typography>
            </Stack>
            <Divider/>
            <Content>{lastMessage?.message}</Content>
          </Stack>
        </Alert>
      </Snackbar>

      <HeaderAppBar/>

      <Button onClick={() => {
        customAxios.get(`/notice/test`)
      }}>SSE Test</Button>

      <Box mt={marginNum}>{element}</Box>
    </>
  );
}