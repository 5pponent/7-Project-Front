import React, {useContext, useEffect, useState} from "react";
import customAxios from "../../AxiosProvider";
import {useNavigate} from "react-router-dom";
import {store} from "../../store/store";
import {Button, Stack, Typography, styled, Box} from "@mui/material";
import SmallProfile from "../SmallProfile";
import ProfileMenu from "../ProfileMenu";

export default function Comment(props) {
  const navigate = useNavigate();
  const {childCount, content, createTime, id, layer, writer} = props.comment;
  const [state, dispatch] = useContext(store);
  const [anchor, setAnchor] = useState(null);
  const [replyComment, setReplyComment] = useState({
    comments: [],
    currentPage: 0,
    totalElements: undefined,
    totalPages: undefined
  });
  const show = writer.id === state.user.id ? 'block' : 'none';

  const CommentBtn = styled(Button)(() => ({
    padding: 0,
    fontSize: "12px",
    minWidth: 'max-content'
  }));

  const layerPadding = (num) => {
    switch (num) {
      case 1:
        return 0
      case 2:
        return 5
      default:
        return 10
    }
  };
  const handleShowReply = (feedId, commentId, page) => {
    customAxios.get(`/feed/${feedId}/comment/${commentId}?size=5&page=${page + 1}`)
      .then(res => setReplyComment({
          ...replyComment,
          comments: replyComment.comments.concat(res.data.comments),
          currentPage: res.data.currentPage,
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages
        }))
      .catch(error => console.error(error))
  };
  const handleDeleteComment = (feedId, commentId) => {
    dispatch({type: 'OpenLoading', payload: '댓글을 삭제중입니다..'});
    customAxios.delete(`/feed/${feedId}/comment/${commentId}`)
      .then(res => dispatch({type: 'OpenSnackbar', payload: `댓글이 삭제되었습니다.`}))
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickProfile = (e) => {
    setAnchor(e.currentTarget)
  };
  const handleCloseProfile = () => {
    setAnchor(null)
  };
  const handleClickProfileView = () => {
    navigate(`/profile?user=${writer.id}`)
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{pl: layerPadding(layer)}}>
        <Box>
          <SmallProfile image={props.image} name={writer.name} onClick={handleClickProfile}/>

          <ProfileMenu
            anchor={anchor}
            open={Boolean(anchor)}
            isFollowed={writer.isFollowed}
            userId={writer.id}
            userName={writer.name}
            onClose={handleCloseProfile}
            onClick={handleClickProfileView}/>
        </Box>

        <Stack>
          <Typography sx={{
            fontSize: '14px', whiteSpace: 'pre-wrap', bgcolor: '#e7ebf0', padding: '10px',
            borderRadius: "10px"
          }}>
            {content}
            <Typography textAlign="right" color="textSecondary" fontSize="12px" style={{wordBreak: 'keep-all'}} mt={1}>
              {createTime}
            </Typography>
          </Typography>

          <Stack direction='row' spacing={1}>
            <CommentBtn
              onClick={() => handleShowReply(props.feedId, id, replyComment.currentPage)}
              disabled={replyComment.currentPage === replyComment.totalPages}
              sx={{display: childCount === 0 ? 'none' : 'block'}}>
              답글보기 ({childCount})
            </CommentBtn>
            <CommentBtn onClick={() => props.getMentionName(writer.name, id)}>
              답글달기
            </CommentBtn>
            <CommentBtn
              onClick={() => props.getCommentContent(content, id, writer.name)}
              sx={{display: show}}>
              수정
            </CommentBtn>
            <CommentBtn
              onClick={() => handleDeleteComment(props.feedId, id)}
              sx={{display: show}}>
              삭제
            </CommentBtn>
          </Stack>
        </Stack>
      </Stack>

      {replyComment.comments.length !== 0 &&
        replyComment.comments.map(c => {
            return (
              <Comment
                key={c.id}
                comment={c}
                feedId={props.feedId}
                image={c.writer.image ? c.writer.image.source : ''}
                currentPage={replyComment.currentPage}
                getMentionName={props.getMentionName}
                getCommentContent={props.getCommentContent}
              />
            )
        })}
    </>
  );
}