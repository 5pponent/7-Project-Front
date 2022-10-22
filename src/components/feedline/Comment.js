import {Button, Stack, Typography, styled} from "@mui/material";
import SmallProfile from "../SmallProfile";
import {useContext} from "react";
import {store} from "../../store/store";

export default function Comment(props) {
  const [state, dispatch] = useContext(store);
  const show = props.writer.id === state.user.id ? 'block' : 'none';

  const CommentBtn = styled(Button)(() => ({
    padding: 0,
    fontSize: "12px",
    minWidth: 'max-content'
  }));
  return (
    <Stack direction={"row"} spacing={2}>
      <SmallProfile image={props.image} name={props.writer.name}/>

      <Stack>
        <Typography sx={{
          fontSize: '14px', whiteSpace: 'pre-wrap', bgcolor: '#e7ebf0', padding: '10px',
          borderRadius: "10px"
        }}>
          {props.content}
          <Typography textAlign="right" color="textSecondary" fontSize="12px" style={{wordBreak: 'keep-all'}} mt={1}>
            {props.createTime}
          </Typography>
        </Typography>

        <Stack direction='row' spacing={1}>
          <CommentBtn>답글보기</CommentBtn>
          <CommentBtn>답글달기</CommentBtn>
          <CommentBtn sx={{display: show}}>수정</CommentBtn>
          <CommentBtn sx={{display: show}}>삭제</CommentBtn>
        </Stack>
      </Stack>
    </Stack>
  );
}