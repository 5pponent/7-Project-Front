import {useContext} from "react";
import {store} from "../store/store";
import {Avatar, Stack, Typography} from "@mui/material";

export default function SmallProfile(props) {
  const [state, dispatch] = useContext(store);

  return (
    <Stack alignItems='center' direction={props.direction} spacing={props.spacing}>
      <Avatar src={props.image ? props.image : 'https://placeimg.com/100/100/people/00'}/>
      <Typography sx={{fontSize: '14px'}}>{props.name}</Typography>
    </Stack>
  );
}