import {Box, Grid, ListItemText, Stack, Typography} from "@mui/material";
import React from 'react';

export default function Chat(props) {

  const getDate = () => {
    const feedDate = props.createTime.split(' ');
    const todayDate = feedDate[0].split('-');
    const todayTime = feedDate[1].split(':');
    let today = new Date();
    const todayHour = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      hour: today.getHours(),
      minute: today.getMinutes()
    }
    const date = {
      year: todayDate[0],
      month: todayDate[1],
      date: todayDate[2],
      hour: todayTime[0],
      minute: todayTime[1]
    }
    const date1 = new Date(date.year, date.month, date.date, date.hour, date.minute).getTime();
    const date2 = new Date(todayHour.year, todayHour.month, todayHour.date, todayHour.hour, todayHour.minute).getTime();
    const beforeHours = (date2 - date1) / 1000 / 60;

    if (beforeHours < 60) return `${beforeHours}분 전`
    if (beforeHours <= 12 * 60) return `${Math.round(beforeHours / 60)}시간 전`
    return feedDate[0];
  }

  return (
    <Stack
      direction={props.direction === 'left' ? "row" : "row-reverse"}
      justifyContent={"flex-start"}
      alignItems={"flex-end"}
    >
      <Box
        bgcolor={props.direction === 'left' ? '#b9e7f6' : 'white'}
        sx={{
          borderRadius: 3, p: 1.0, m: 1, maxWidth: 200,
          display: 'inline-block', overflowY: 'visible'
        }}>
        <Typography
          whiteSpace={"pre-wrap"}
          align='left' fontSize={14}
        >{props.content}</Typography>
        <Typography
          variant={"caption"} sx={{color: "gray"}}
        >{getDate()}</Typography>
      </Box>
      <Typography variant={"caption"} color={"gray"}>
        {/*{!props.hasRead && '안읽음'}*/}
      </Typography>
    </Stack>
  );
}
