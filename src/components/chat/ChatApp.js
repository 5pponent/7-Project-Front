import {Box, Button, Stack, TextField} from "@mui/material";
import ChatUserList from './ChatUserList';
import ChatLog from './ChatLog';
import SmallProfile from '../SmallProfile';

export default function ChatApp(props) {

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
        <ChatLog />

        <Stack direction={"row"} width={"100%"} spacing={1}>
          <TextField size={"small"} fullWidth/>
          <Button variant={"contained"}>전송</Button>
        </Stack>

      </Stack>

    </Stack>
  );
}
