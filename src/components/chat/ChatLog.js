import { Stack } from "@mui/material";
import Chat from "./Chat";


export default function ChatLog(props) {

  return (
    <Stack sx={{
      height: '70vh', overflowY: 'auto', bgcolor: '#e7ebf0', wordBreak: 'break-all',
      border: '1px solid #e0e0e0'
    }}>
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='left' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="Hey man, What's up?" date="09:30" />
      <Chat direction='right' content="wlsaldasijgiosdhjgoilasjvenjrmhuvuyjnheusfkuvmjnhguesfjhmvklsdfmjhvulksimhfvimisee" date="09:30" />
      <Chat direction='left' content="wlsaldasijgiosdhjgoilasjvenjrmhuvuyjnheusfkuvmjnhguesfjhmvklsdfmjhvulksimhfvimisee,o'ae,wci;lm,jvlim,dsvilsnm" date="09:30" />
      <Chat direction='left' content="Hey man, What's up?" date="09:30" />
    </Stack>
  );
}
