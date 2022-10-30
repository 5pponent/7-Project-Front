import {Button, Stack, TextField} from "@mui/material";
import ChatUserList from './ChatUserList';
import SmallProfile from '../SmallProfile';
import React, {useContext, useEffect, useRef, useState} from 'react';
import * as StompJS from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import Chat from "./Chat";
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChatApp(props) {
  const [state, dispatch] = useContext(store);

  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState(0);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [chatSessionList, setChatSessionList] = useState([]);
  const [currentSession, setCurrentSession] = useState(0);
  const handleChangeMessage = (e) => {setMessage(e.target.value)}
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    publish(currentSession, message);
    setMessage('');
  }
  const changeSession = (userId) => {
    customAxios.post(`/chat/session`, {targetUserId: userId})
      .then(res => {
        setCurrentSession(res.data.id);
        console.log(chatSessionList);
        console.log(res.data)
        if (!chatSessionList.map((it.id)).includes(res.data.id))
          subscribe(res.data.id);
      })
      .catch(err => {console.log(err.response)})
  }

  const client = useRef({});

  const conn = () => {
    client.current = new StompJS.Client({
      webSocketFactory: () => new SockJS("/ws/chat"),
      debug: function (str) {
        console.log(str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // 연결 성공 시 수행, 여기서 클라이언트에 대한 모든 구독 실행해야 함
        chatSessionList.forEach((it) => {
          subscribe(it.id);
        })
        setConnected(true);
      },
      onStompError: (frame) => {
        setConnected(false);
        console.error(frame);
      },
    });
    client.current.activate();
  }
  const subscribe = (sessionId) => {
    client.current.subscribe(`/sub/chat/${sessionId}`, (data) => {
      setChatLog(chatLog => [...chatLog, JSON.parse(data.body)])
    });
  }
  const publish = (sessionId, message) => {
    if (client.current.connected) {
      client.current.publish({
        destination: `/pub/chat/${sessionId}`,
        body: JSON.stringify({
          sender: userId,
          message: message,
        })
      });
    } else return;
  }

  useEffect(() => {
    conn();
    setUserId(state.user.id);
    customAxios.get(`/chat/session`)
      .then(res => {
        setChatSessionList(res.data)
      })
      .catch(err => {console.log(err.response)});
    return () => client.current.deactivate();
  }, [state.user.id]);

  useEffect(() => {
    customAxios.get(`/chat/session`)
      .then(res => {
        console.log(res.data)
        setChatSessionList(res.data);
      })
      .catch(err => {console.log(err.response)});
  }, [currentSession]);

  return (
    <Stack direction={"row"} justifyContent={"center"} spacing={1}>

      <Stack spacing={1}>
        {connected ?
          <ChatUserList
            changeSession={changeSession}
          />
          :
          <CircularProgress sx={{mt: 30, mx: 10}}/>
        }
      </Stack>

      <Stack spacing={1}>

        <SmallProfile
          spacing={1}
          direction={"row"}
          name='대화 상대 이름'
          image=''
        />

        <Stack sx={{
          height: '70vh', maxWidth: 350, overflowY: 'auto',
          bgcolor: '#e7ebf0', wordBreak: 'break-all', border: '1px solid #e0e0e0'
        }}>
          <Chat direction='right' content="Hey man, What's up?" date="09:30"/>
          {chatLog.map((it, index) => {
            return (
              <Chat
                key={index}
                direction={it.sender === userId ? 'right' : 'left'}
                content={it.message}
              />
            );
          })
          }
        </Stack>

        <Stack direction={"row"} width={"100%"} spacing={1} component={"form"}>
          <TextField
            size={"small"} fullWidth value={message}
            placeholder={connected ? '' : '연결중입니다..'}
            onChange={handleChangeMessage} disabled={!connected}
          />
          <Button
            disabled={!connected}
            variant={"contained"} type={"submit"} onClick={handleSubmitMessage}>
            전송
          </Button>
        </Stack>

      </Stack>

    </Stack>
  );
}
