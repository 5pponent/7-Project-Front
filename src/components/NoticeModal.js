import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export default function NoticeModal (props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Typography>{props.content1}</Typography>
        <Typography>{props.content2}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onAccept}>네</Button>
        <Button onClick={props.onClose}>아니오</Button>
      </DialogActions>
    </Dialog>
  )
}