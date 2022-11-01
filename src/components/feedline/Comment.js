import React, {useContext, useEffect, useState} from "react";
import customAxios from "../../AxiosProvider";
import {useNavigate} from "react-router-dom";
import {store} from "../../store/store";
import {Button, Stack, Typography, styled, Box, Avatar} from "@mui/material";
import ProfileMenu from "../ProfileMenu";

export default function Comment(props) {
  const navigate = useNavigate();
  const {childCount, content, createTime, id, layer, writer} = props.comment;
  const [state, dispatch] = useContext(store);
  const [count, setCount] = useState(0);
  const [anchor, setAnchor] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
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

  useEffect(() => {
    setCount(childCount);
  }, []);

  useEffect(() => {
    if (props.newReply && id === props.newReply.parentId) {
      if (props.modifyComment) {
        const newReply = replyComment.comments.map(item => (
          item.id === props.newReply.id ? props.newReply : item
        ))
        setReplyComment({...replyComment, comments: newReply})
        props.handleClickCancelModify();
      } else {
        const newReply = replyComment.comments.concat(props.newReply);
        setReplyComment({...replyComment, comments: newReply});
        setCount(count + 1);
      }
    }
  }, [props.newReply]);

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
  const showDeleteButton = () => setDeleteShow(true);
  const hideDeleteButton = () => setDeleteShow(false);
  const deleteCommentList = (commentId) => {
    const newCommentList = props.commentList.comments.filter(item => item.id !== commentId);
    props.setCommentList({...props.commentList, comments: newCommentList});
  };
  const handleDeleteComment = (feedId, commentId) => {
    dispatch({type: 'OpenLoading', payload: '댓글을 삭제중입니다..'});
    customAxios.delete(`/feed/${feedId}/comment/${commentId}`)
      .then(() => {
        deleteCommentList(id);
        dispatch({type: 'OpenSnackbar', payload: `댓글이 삭제되었습니다.`});
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickProfile = (e) => setAnchor(e.currentTarget);
  const handleCloseProfile = () => setAnchor(null);
  const handleClickProfileView = () => navigate(`/profile?user=${writer.id}`);
  const getDate = () => {
    const feedDate = createTime.split(' ');
    const createDate = feedDate[0].split('-');
    const createDateTime = feedDate[1].split(':');
    let today = new Date();

    const todayHour = new Date(`${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:00`);
    const date = new Date(`${createDate[0]}-${createDate[1]}-${createDate[2]} ${createDateTime[0]}:${createDateTime[1]}:00`);
    const beforeHours = (todayHour - date) / 1000 / 60;

    if (beforeHours < 60) return `${beforeHours}분 전`
    if (beforeHours <= 12 * 60) return `${Math.round(beforeHours / 60)}시간 전`
    return createTime;
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{pl: layerPadding(layer)}}>
        <Box>
          <Stack sx={{cursor: 'pointer'}} onClick={handleClickProfile}>
            <Avatar src={props.image ?? ''}/>
          </Stack>

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
          <Stack sx={{bgcolor: '#e7ebf0', padding: '10px', borderRadius: "10px"}}>
            <Typography sx={{fontSize: '14px', fontWeight: 'bold', wordBreak: 'keep-all'}}>
              {writer.name}</Typography>
            <Typography sx={{fontSize: '14px', whiteSpace: 'pre-wrap'}}>
              {content}
            </Typography>
            <Typography textAlign="right" color="textSecondary" fontSize="12px" style={{wordBreak: 'keep-all'}} mt={1}>
              {getDate()}
            </Typography>
          </Stack>

          <Stack direction='row' spacing={1} sx={{display: deleteShow ? 'none' : 'bock'}}>
            <CommentBtn
              onClick={() => handleShowReply(props.feedId, id, replyComment.currentPage)}
              disabled={replyComment.currentPage === replyComment.totalPages}
              sx={{display: count === 0 ? 'none' : 'block'}}>
              답글보기 ({count})
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
              onClick={showDeleteButton}
              sx={{display: show}}>
              삭제
            </CommentBtn>
          </Stack>

          <Stack direction='row' spacing={1} sx={{display: deleteShow ? 'bock' : 'none'}}>
            <Typography fontSize='small' sx={{color: '#b22e2e'}}>삭제하시겠습니까?</Typography>
            <CommentBtn
              onClick={() => handleDeleteComment(props.feedId, id)}>
              삭제
            </CommentBtn>
            <CommentBtn
              onClick={hideDeleteButton}>
              취소
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
              commentList={replyComment}
              setCommentList={setReplyComment}
              feedId={props.feedId}
              image={c.writer.image ? c.writer.image.source : ''}
              newReply={props.newReply}
              addReply={props.addReply}
              modifyComment={props.modifyComment}
              handleClickCancelModify={props.handleClickCancelModify}
              currentPage={replyComment.currentPage}
              getMentionName={props.getMentionName}
              getCommentContent={props.getCommentContent}
            />
          )
        })}
    </>
  );
}