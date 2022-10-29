import {Button, Stack, TextField} from "@mui/material";
import ChatUserList from './ChatUserList';
import SmallProfile from '../SmallProfile';
import React, {useContext, useEffect, useRef, useState} from 'react';
import * as StompJS from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import Chat from "./Chat";
import {store} from "../../store/store";

export default function ChatApp(props) {
  const [state, dispatch] = useContext(store);

  const [userId, setUserId] = useState(0);
  const [message, setMessage] = useState('');
  const handleChangeMessage = (e) => {setMessage(e.target.value)}
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    console.log(chatLog)
    publish(message);
    setMessage('');
  }
  const [chatLog, setChatLog] = useState([]);

  const client = useRef({});

  const conn = () => {
    client.current = new StompJS.Client({
      webSocketFactory: () => new SockJS("/ws/chat"),
      debug: function (str) {console.log(str)},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // 연결 성공 시 수행, 여기서 클라이언트에 대한 모든 구독 실행해야 함
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    client.current.activate();
  }
  const disconnect = () => {client.current.deactivate()}
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/0`, (data) => {
      let payload = JSON.parse(data.body);
      setChatLog(chatLog.concat(payload));
      console.log(payload);
    });
  }
  const publish = (message) => {
    if (client.current.connected) {
      client.current.publish({
        destination: `/pub/chat/0`,
        body: JSON.stringify({
          sender: userId,
          message: message,
        })
      });
      setChatLog(chatLog.concat({
        sender: userId,
        message: message
      }));
    }
    else return;
  }

  useEffect(() => {
    setUserId(state.user.id);
    console.log(state.user.id)
    conn();

    return () => disconnect();
  }, []);

  return (
    <Stack direction={"row"} justifyContent={"center"} spacing={1}>

      <Stack spacing={1}>
        <ChatUserList/>
      </Stack>

      <Stack spacing={1} alignItems={"center"}>

        <SmallProfile
          spacing={1}
          direction={"row"}
          name='대화 상대 이름'
          image=''
        />

        <Stack sx={{
          height: '70vh', width: 300, overflowY: 'auto',
          bgcolor: '#e7ebf0', wordBreak: 'break-all', border: '1px solid #e0e0e0'
        }}>
          <Chat direction='right' content="Hey man, What's up?" date="09:30" />
          {chatLog.map((it) => {
            return (
              <Chat
                direction={it.sender === userId ? 'right' : 'left'}
                content={it.message}
              />
            );
          })
          }
        </Stack>

        <Stack direction={"row"} width={"100%"} spacing={1} component={"form"}>
          <TextField size={"small"} fullWidth value={message} onChange={handleChangeMessage}/>
          <Button variant={"contained"} type={"submit"} onClick={handleSubmitMessage}>
            전송
          </Button>
        </Stack>

      </Stack>

    </Stack>
  );
}
