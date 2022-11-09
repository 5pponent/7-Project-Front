import {Button, Stack, Typography} from "@mui/material";


export default function ServerError({error}) {

  return (
    <Stack alignItems={"center"} spacing={3} p={5}>
      <Typography variant={"h4"}>Server Error</Typography>
      <Button variant={"contained"} onClick={() => {window.location.replace(`/`)}}>메인으로</Button>
    </Stack>
  );
}