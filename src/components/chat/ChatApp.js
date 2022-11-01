import {Button, Stack, TextField, Typography} from "@mui/material";
import ChatUserList from './ChatUserList';
import SmallProfile from '../SmallProfile';
import React, {useContext, useEffect, useRef, useState} from 'react';
import * as StompJS from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import Chat from "./Chat";
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import CircularProgress from "@mui/material/CircularProgress";
import {useLocation, useNavigate} from "react-router-dom";

export default function ChatApp(props) {
  const [state, dispatch] = useContext(store);

  const client = useRef({});
  const scrollRef = useRef();

  let navigate = useNavigate();
  let location = useLocation();
  let session = new URLSearchParams(location.search).get('session');

  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState(0);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [chatSessionList, setChatSessionList] = useState([]);
  const [targetUser, setTargetUser] = useState({});
  const [chatLogLoading, setChatLogLoading] = useState(false);
  const [sessionList, setSessionList] = useState([]);

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
  const handleChangeMessage = (e) => {setMessage(e.target.value)}
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    message !== '' && publish(session, message);
    setMessage('');
  }
  const changeSession = (userId) => {
    customAxios.post(`/chat/session`, {targetUserId: userId})
      .then(res => {
        navigate(`/chat?session=${res.data.id}`);
        setTargetUser(res.data.users[0]);
        if (!chatSessionList.includes(res.data.id))
          subscribe(res.data.id);
      })
      .catch(err => {console.log(err.response)})
  }

  const conn = () => {
    client.current = new StompJS.Client({
      webSocketFactory: () => new SockJS("/ws/chat"),
      debug: function (str) {console.log(str)},
      onConnect: () => {
        // 연결 성공 시 수행, 여기서 클라이언트에 대한 모든 구독 실행해야 함
        customAxios.get(`/chat/session`)
          .then(res => {
            setChatSessionList(res.data.map(it => it.id));
            res.data.forEach((it) => {subscribe(it.id);});
          })
          .catch(err => {console.log(err.response)});
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
      setChatLog(chatLog => [...chatLog, JSON.parse(data.body)]);
      loadSessionList();
    });
  }
  const publish = (sessionId, message) => {
    if (client.current.connected) {
      client.current.publish({
        destination: `/pub/chat/${sessionId}`,
        body: JSON.stringify({
          sessionId: session,
          sender: userId,
          message: message,
        })
      });
    }
    else return;
    scrollToBottom();
  }
  const loadCurrentSession = () => {
    customAxios.get(`/chat/session/${session}`)
      .then(res => {setTargetUser(res.data.users[0])});
  }
  const loadSessionList = () => {
    customAxios.get(`/chat/session`)
      .then(res => {
        setSessionList(res.data);
        setChatSessionList(res.data.map(it => it.id));
      })
      .catch(err => {console.log(err.response)});
  }
  const loadChatLog = () => {
    setChatLogLoading(true);
    session &&
    customAxios.get(`/chat/session/${session}/chat`)
      .then(res => {
        setChatLog(res.data.chats);
      })
      .catch(err => {console.log(err.response)})
      .finally(() => {
        setChatLogLoading(false);
      });
  }
  const readChat = (chatId) => {
    customAxios.get(`/chat/session/${session}/chat/${chatId}`).then(r => {})
  }

  useEffect(() => {
    loadCurrentSession();
    loadSessionList();
    conn();
    return () => client.current.deactivate();
  }, []);

  useEffect(() => {setUserId(state.user.id)}, [state.user.id]);
  useEffect(() => {
    loadChatLog();
    loadSessionList();
    scrollToBottom();
  }, [session]);

  useEffect(() => {
    client.current.connected ? setConnected(true) : setConnected(false)
  }, [client.current.connected]);

  useEffect(() => {
    loadSessionList();
    scrollToBottom();
  }, [chatLog]);

  return (
    <Stack direction={"row"} justifyContent={"center"} spacing={1}>

      <Stack spacing={1} maxWidth={180}>
        {connected ?
          <ChatUserList
            changeSession={changeSession}
            sessionList={sessionList}
          />
          :
          <Stack alignItems={"center"} spacing={2} border={"1px solid #e0e0e0"}
                 justifyContent={"center"} height={"100%"} px={3}>
            <CircularProgress/>
            <Typography variant={"caption"} color={"gray"}>소켓에 연결 중입니다..</Typography>
          </Stack>
        }
      </Stack>

      <Stack spacing={1} width={400}>

        <Stack>
          <SmallProfile
            spacing={1}
            direction={"row"}
            name={targetUser.name}
            image={targetUser.image ? targetUser.image.source : ''}
          />
        </Stack>

        <Stack sx={{
          height: '70vh', width: '100%', overflowY: 'auto',
          bgcolor: '#e7ebf0', wordBreak: 'break-all', border: '1px solid #e0e0e0'
        }} ref={scrollRef}>
          {!targetUser.name ?
            <Stack alignItems={"center"} height={"100%"} justifyContent={"center"}>
              <Typography>채팅할 유저를 선택해주세요.</Typography>
            </Stack>
            :
            chatLogLoading ?
              <Stack alignItems={"center"} height={"100%"} justifyContent={"center"}>
                <CircularProgress/>
              </Stack>
              :
              (chatLog.length > 0 ?
                chatLog.map((it) => {
                  if (it.sessionId === parseInt(session)) {
                    // 마지막으로 올라온 채팅의 목적지 세션이 내 현재 세션과 같을 경우 읽음 처리
                    if (it.id === chatLog.at(-1).id) readChat(it.id);
                    return (
                      <Chat
                        key={it.id}
                        direction={it.sender.id === userId ? 'right' : 'left'}
                        content={it.message}
                        createTime={it.createTime}
                        // hasRead={it.readUsers.includes(targetUser.id)}
                      />
                    );
                  }
                })
                :
                <Stack alignItems={"center"} height={"100%"} justifyContent={"center"}>
                  <Typography>채팅 내역이 없습니다.</Typography>
                </Stack>
              )
          }
        </Stack>

        <Stack direction={"row"} width={"100%"} spacing={1} component={"form"}>
          <TextField
            inputProps={{ autoComplete: "off" }}
            size={"small"} fullWidth value={message}
            placeholder={connected || !targetUser.name ? '' : '연결중입니다..'}
            onChange={handleChangeMessage} disabled={!connected || !targetUser.name}
          />
          <Button
            disabled={!connected || !targetUser.name}
            variant={"contained"} type={"submit"} onClick={handleSubmitMessage}>
            전송
          </Button>
        </Stack>

      </Stack>

    </Stack>
  );
}