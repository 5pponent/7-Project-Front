import {Stack, TextField} from "@mui/material";
import React from 'react';
import ChatProfile from "./ChatProfile";

export default function ChatUserList(props) {

  return (
    <>
      <TextField label="유저 검색" fullWidth size={"small"}/>
      <Stack sx={{
        height: '70vh', overflowY: 'auto', border: '1px solid #e0e0e0', wordBreak: 'break-all'
      }}>
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <ChatProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <ChatProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <ChatProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <ChatProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <ChatProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
        <ChatProfile name='Cindy Baker' image="https://material-ui.com/static/images/avatar/3.jpg" />
        <ChatProfile name='Remy Sharp' image="https://material-ui.com/static/images/avatar/1.jpg" />
        <ChatProfile name='Alice' image="https://material-ui.com/static/images/avatar/2.jpg" />
      </Stack>
    </>
  );
}
