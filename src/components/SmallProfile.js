import React from "react";
import {Avatar, Stack, Typography} from "@mui/material";

export default React.memo(function SmallProfile(props) {
  return (
    <Stack
      direction={props.direction}
      spacing={props.spacing}
      sx={{cursor: 'pointer'}}
      onClick={props.onClick}
      alignItems={"center"}
    >
      <Avatar src={props.image ?? ''}/>
      <Stack>
        <Typography sx={{fontSize: '14px', wordBreak: 'keep-all'}}>{props.name}</Typography>
        {props.getDate &&
          <Typography color="textSecondary" fontSize="14px">{props.getDate()}</Typography>
        }
      </Stack>
    </Stack>
  );
})