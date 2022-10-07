import {useContext} from "react";
import {store} from "../store/store";
import {Avatar, Stack, Typography} from "@mui/material";

export default function SmallProfile(props) {
  const [state, dispatch] = useContext(store);

  return (
    <Stack alignItems='center' direction={props.direction} spacing={props.spacing}>
      <Avatar src={state.user.image.savedName}/>
      <Typography sx={{fontSize: '14px'}}>{props.name}</Typography>
    </Stack>
  );
}