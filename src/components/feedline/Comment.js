import {useContext} from "react";
import customAxios from "../../AxiosProvider";
import {store} from "../../store/store";
import {Button, Stack, Typography, styled} from "@mui/material";
import SmallProfile from "../SmallProfile";

export default function Comment(props) {
  const [state, dispatch] = useContext(store);
  const show = props.writer.id === state.user.id ? 'block' : 'none';

  const CommentBtn = styled(Button)(() => ({
    padding: 0,
    fontSize: "12px",
    minWidth: 'max-content'
  }));

  const handleClickReplyButton = (name, commentId) => {
    props.getMentionName(name, commentId);
  };
  const handleModifyComment = () => {
    console.log('수정')
  };
  const handleDeleteComment = (feedId, commentId) => {
    customAxios.delete(`/feed/${feedId}/comment/${commentId}`)
      .then(res => dispatch({type: 'OpenSnackbar', payload: `댓글이 삭제되었습니다.`}))
      .catch(error => console.error(error))
  };
  
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
          <CommentBtn sx={{display: props.childCount === 0 ? 'none' : 'block'}}>답글보기 ({props.childCount})</CommentBtn>
          <CommentBtn onClick={() => handleClickReplyButton(props.writer.name, props.commentId)}>답글달기</CommentBtn>
          <CommentBtn onClick={handleModifyComment} sx={{display: show}}>수정</CommentBtn>
          <CommentBtn onClick={() => handleDeleteComment(props.feedId, props.commentId)} sx={{display: show}}>삭제</CommentBtn>
        </Stack>
      </Stack>
    </Stack>
  );
}