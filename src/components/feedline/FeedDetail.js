import React, {useContext, useEffect, useRef, useState} from "react";
import customAxios from '../../AxiosProvider';
import {store} from '../../store/store';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Pagination,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import SmallProfile from '../SmallProfile';
import MoreMenu from './MoreMenu';
import Comment from './Comment';

export default function FeedDetail(props) {
  const [state, dispatch] = useContext(store);
  const [reply, setReply] = useState(false);
  const [modifyComment, setModifyComment] = useState(false);
  const [myComment, setMyComment] = useState({
    comments: [],
    currentPage: 1,
    totalElements: undefined,
    totalPages: undefined
  });
  const [comment, setComment] = useState({
    comments: [],
    currentPage: undefined,
    totalElements: undefined,
    totalPages: undefined
  });
  const [commentContent, setCommentContent] = useState({content: ''});
  const [currentComment, setCurrentComment] = useState({id: 0, name: ''});
  const {commentCount, content, createTime, files, id, isFollowed, isLiked, likeCount, writer} = props.feedDetail;
  const commentRef = useRef();

  useEffect(() => {
    customAxios.get(`/feed/${id}/comment?user=me&size=3`)
      .then(res => setMyComment(res.data))
      .catch(error => console.error(error.response))

    customAxios.get(`/feed/${id}/comment`)
      .then(res => setComment(res.data))
      .catch(error => console.error(error.response))
  }, []);

  const getMentionName = (name, commentId) => {
    setCommentContent({content: `@${name} `});
    setCurrentComment({id: commentId, name: name});
    setReply(true);
    commentRef.current.focus();
  };
  const getCommentContent = (comment, commentId, name) => {
    setModifyComment(true);
    setCommentContent({content: comment});
    setCurrentComment({id: commentId, name: name});
    commentRef.current.focus();
  };
  const handleChangeComment = (e) => {
    setCommentContent({content: e.target.value});
  };
  const handleChangeMyCommentPage = (index) => {
    customAxios.get(`/feed/${id}/comment?user=me&size=3&page=${index}`)
      .then(res => setMyComment(res.data))
      .catch(error => console.error(error.response))
  };
  const handleClickLike = (feedId) => {
    if (isLiked) {
      customAxios.delete(`/feed/${feedId}/like`)
        .then(res => props.getFeedDetail(res.data))
        .catch(error => console.error(error.response))
    } else {
      customAxios.post(`/feed/${feedId}/like`)
        .then(res => props.getFeedDetail(res.data))
        .catch(error => console.error(error.response))
    }
  };
  const handleCreateComment = (feedId, content) => {
    dispatch({type: 'OpenLoading', message: '댓글을 작성중입니다..'});
    customAxios.post(`/feed/${feedId}/comment`, content)
      .then(res => {
        setCommentContent({content: ''});
        dispatch({type: 'OpenSnackbar', payload: `댓글이 입력되었습니다.`});
      })
      .catch(err => console.log(err.response))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickReplay = (feedId, commentId) => {
    dispatch({type: 'OpenLoading', message: '답글을 전송중입니다..'});
    customAxios.post(`/feed/${feedId}/comment/${commentId}`, commentContent)
      .then(res => {
        setCommentContent({content: ''});
        setReply(false);
        dispatch({type: 'OpenSnackbar', payload: `${currentComment.name}님께 답글이 전송되었습니다.`});
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickModifyComment = (feedId, commentId, content) => {
    dispatch({type: 'OpenLoading', message: '댓글을 수정중입니다..'});
    customAxios.put(`/feed/${feedId}/comment/${commentId}`, content)
      .then(res => {
        setCommentContent({content: ''});
        setModifyComment(false);
        dispatch({type: 'OpenSnackbar', payload: `댓글이 수정되었습니다.`});
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickCancelReplay = () => {
    setCommentContent({content: ``});
    setReply(false);
  };
  const handleClickCancelModify = () => {
    setCommentContent({content: ``});
    setModifyComment(false);
  };
  const handleClickButton = () => {
    if (reply) return handleClickReplay(id, currentComment.id)
    else if (modifyComment) return handleClickModifyComment(id, currentComment.id, commentContent)
    else return handleCreateComment(id, commentContent)
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack spacing={1}>
          <SmallProfile direction={"row"} spacing={2}
                        image={writer.image && writer.image.source} name={writer.name}/>
          <Typography color="textSecondary" fontSize="14px">
            {createTime}
          </Typography>
        </Stack>

        <Stack>
          <IconButton onClick={props.closeContent}>
            <CloseIcon color='text.secondary'/>
          </IconButton>
          <MoreMenu
            feedId={id}
            writer={writer.id}
            closeContent={props.closeContent}
            feedList={props.feedList}
            getFeedList={props.getFeedList}
          />
        </Stack>
      </Stack>

      <Box mt={1}>
        <Typography sx={{whiteSpace: 'pre-wrap'}}>
          {content}
        </Typography>
        <ImageList cols={1}>
          {
            props.feedDetail.files.map(f => {
              return (
                <ImageListItem key={f.id}>
                  <img src={f.source}/>
                  <Typography>{f.description}</Typography>
                </ImageListItem>
              );
            })
          }
        </ImageList>
      </Box>

      <Box>
        <IconButton onClick={() => handleClickLike(id)}>
          <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
        </IconButton>{likeCount}
        <IconButton sx={{marginLeft: "20px"}}>
          <AddCommentRoundedIcon sx={{fontSize: 30}}></AddCommentRoundedIcon>
        </IconButton>{commentCount}
      </Box>

      <Divider/>

      {/* 댓글 작성 */}
      <Stack p={1}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-start"} spacing={2}>
          <SmallProfile image={state.user.image && state.user.image.source} name={state.user.name}/>
          <TextField inputRef={commentRef} multiline size='small' fullWidth value={commentContent.content}
                     placeholder='댓글을 입력해 주세요.' onChange={handleChangeComment}/>
          <Button type='submit' variant='contained' onClick={handleClickButton}>
            {modifyComment ? '수정' : '입력'}
          </Button>
        </Stack>

        <Button onClick={handleClickCancelReplay} sx={{width: 'max-content', display: reply ? 'block' : 'none'}}>
          답글취소
        </Button>
        <Button onClick={handleClickCancelModify}
                sx={{width: 'max-content', display: modifyComment ? 'block' : 'none'}}>
          수정취소
        </Button>
      </Stack>

      <Stack spacing={1}>
        <Stack spacing={1} sx={{display: myComment.comments.length !== 0 ? 'block' : 'none'}}>
          <Divider>내 댓글</Divider>

          {/*내 댓글 목록*/}
          <Stack p={1} spacing={3}>
            {myComment.comments.map((c) => {
              return (
                <Comment
                  key={c.id}
                  feedId={id}
                  commentId={c.id}
                  childCount={c.childCount}
                  writer={c.writer}
                  image={c.writer.image ? c.writer.image.source : ''}
                  content={c.content}
                  createTime={c.createTime}
                  getMentionName={getMentionName}
                  getCommentContent={getCommentContent}
                />
              );
            })}
            <Box sx={{display: 'flex', justifyContent: 'center'}} style={{margin: 0}}>
              <Pagination
                onChange={(e, value) => handleChangeMyCommentPage(value)}
                count={myComment.totalPages}
                page={myComment.currentPage}
                size="small"
                variant="outlined"
                color="primary"
                showFirstButton
                showLastButton/>
            </Box>
          </Stack>
        </Stack>

        <Divider>전체 댓글</Divider>

        {/*댓글 목록*/}
        <Stack p={1} spacing={3}>
          {comment.comments.length !== 0 ? comment.comments.map((c) => {
            return (
              <Comment
                key={c.id}
                commentId={c.id}
                childCount={c.childCount}
                writer={c.writer}
                image={c.writer.image ? c.writer.image.source : ''}
                content={c.content}
                createTime={c.createTime}
                getMentionName={getMentionName}
                getCommentContent={getCommentContent}
              />
            );
          }) : "댓글이 없습니다."
          }

          {comment.currentPage < comment.totalPages &&
            <Box display="flex" justifyContent="center" style={{padding: 20}}>
              <CircularProgress size={30}></CircularProgress>
            </Box>
          }
        </Stack>
      </Stack>
    </>
  );
}