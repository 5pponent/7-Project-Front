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
import ModifyFeed from "./ModifyFeed";
import NoticeModal from "../NoticeModal";

export default function FeedDetail(props) {
  const [state, dispatch] = useContext(store);
  const [reply, setReply] = useState(false);
  const [load, setLoad] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyComment, setModifyComment] = useState(false);
  const [myComment, setMyComment] = useState({
    comments: [],
    currentPage: 0,
    totalElements: undefined,
    totalPages: undefined
  });
  const [comment, setComment] = useState({
    comments: [],
    currentPage: 0,
    totalElements: undefined,
    totalPages: undefined
  });
  const [commentContent, setCommentContent] = useState({content: ''});
  const [currentComment, setCurrentComment] = useState({id: 0, name: ''});
  const [commentErrorMessage, setCommentErrorMessage] = useState('');
  const {commentCount, content, createTime, files, id, isLiked, likeCount, writer} = props.feedDetail;
  const commentRef = useRef();

  useEffect(() => {
    customAxios.get(`/feed/${id}/comment?user=me&size=3`)
      .then(res => setMyComment(res.data))
      .catch(error => console.error(error.response))

    customAxios.get(`/feed/${id}/comment`)
      .then(res => setComment(res.data))
      .catch(error => console.error(error.response))

    props.commentFocus && commentRef.current.focus();
  }, []);

  const validate = () => {
    let valid = true;
    if (!commentContent.content) {
      setCommentErrorMessage('댓글을 입력해 주세요');
      valid = false;
    } else setCommentErrorMessage('')
    return valid
  };

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
  const handleChangeComment = (e) => setCommentContent({content: e.target.value});
  const handleChangeMyCommentPage = (index) => {
    customAxios.get(`/feed/${id}/comment?user=me&size=3&page=${index}`)
      .then(res => setMyComment(res.data))
      .catch(error => console.error(error.response))
  };
  const handleClickLike = (feedId, name) => {
    if (isLiked) {
      customAxios.delete(`/feed/${feedId}/like`)
        .then(res => {
          props.getFeedDetail(res.data);
          dispatch({type: 'OpenSnackbar', payload: `좋아요가 취소되었습니다.`});
        })
        .catch(error => console.error(error.response))
    } else {
      customAxios.post(`/feed/${feedId}/like`)
        .then(res => {
          props.getFeedDetail(res.data);
          dispatch({type: 'OpenSnackbar', payload: `${name}님의 피드를 좋아합니다.`});
        })
        .catch(error => console.error(error.response))
    }
  };
  const handleCreateComment = (feedId, content) => {
    if (validate()) {
      dispatch({type: 'OpenLoading', payload: '댓글을 작성중입니다..'});
      customAxios.post(`/feed/${feedId}/comment`, content)
        .then(() => {
          setCommentContent({content: ''});
          dispatch({type: 'OpenSnackbar', payload: `댓글이 입력되었습니다.`});
        })
        .catch(err => console.log(err.response))
        .finally(() => dispatch({type: 'CloseLoading'}))
    }
  };
  const handleClickReply = (feedId, commentId) => {
    dispatch({type: 'OpenLoading', payload: '답글을 전송중입니다..'});
    customAxios.post(`/feed/${feedId}/comment/${commentId}`, commentContent)
      .then(() => {
        setCommentContent({content: ''});
        setReply(false);
        dispatch({type: 'OpenSnackbar', payload: `${currentComment.name}님께 답글이 전송되었습니다.`});
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickModifyComment = (feedId, commentId, content) => {
    dispatch({type: 'OpenLoading', payload: '댓글을 수정중입니다..'});
    customAxios.put(`/feed/${feedId}/comment/${commentId}`, content)
      .then(() => {
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
  const handleClickCheckButton = () => {
    if (reply) return handleClickReply(id, currentComment.id)
    else if (modifyComment) return handleClickModifyComment(id, currentComment.id, commentContent)
    else return handleCreateComment(id, commentContent)
  };
  const loadCommentList = (feedId, page) => {
    setLoad(true);
    customAxios.get(`/feed/${feedId}/comment?page=${page + 1}`)
      .then(res => {
        setComment({
          ...comment,
          comments: comment.comments.concat(res.data.comments),
          currentPage: res.data.currentPage
        });
      })
      .catch(error => console.error(error.response))
      .finally(() => setLoad(false))
  };
  const openModify = () => setModifyOpen(true);
  const closeModify = () => setModifyOpen(false);
  const openDelete = () => setDeleteOpen(true);
  const closeDelete = () => setDeleteOpen(false);
  const handleClickDelete = () => {
    dispatch({type: 'OpenLoading', payload: '피드를 삭제중입니다..'});
    customAxios.delete(`/feed/${id}`)
      .then(res => {
        props.closeContent();
        props.getFeedList(props.feedList.filter(item => item.id !== id));
        dispatch({type: 'OpenSnackbar', payload: `피드가 삭제되었습니다.`});
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const getDate = () => {
    let today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const feedDate = createTime.split(' ');
    const hours = (today.getHours() * 60 + today.getMinutes()) - (parseInt(feedDate[1].split(':')[0] * 60) + parseInt(feedDate[1].split(':')[1]));
    if (feedDate[0] === date) {
      if (hours < 60) return `${hours}분 전`
      if (hours <= 12 * 60) return `${Math.round(hours / 60)}시간 전`
      return feedDate[1];
    } else return createTime
  };

  return (
    <>
      <Box sx={{display: modifyOpen ? 'none' : 'block'}}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <SmallProfile direction={"row"} spacing={2} getDate={getDate} image={writer.image && writer.image.source}
                        name={writer.name}/>

          <Stack>
            <IconButton onClick={props.closeContent}>
              <CloseIcon color='text.secondary'/>
            </IconButton>
            <MoreMenu
              writer={writer.id}
              openModify={openModify}
              openDelete={openDelete}
            />
          </Stack>
        </Stack>

        <Box mt={1}>
          <Typography sx={{whiteSpace: 'pre-wrap'}}>
            {content}
          </Typography>
          <ImageList cols={1}>
            {
              files.map(f => {
                return (
                  <ImageListItem key={f.id}>
                    <img src={f.source} alt={f.originalName}/>
                    <Typography>{f.description}</Typography>
                  </ImageListItem>
                );
              })
            }
          </ImageList>
        </Box>

        <Box>
          <IconButton onClick={() => handleClickLike(id, writer.name)}>
            <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
          </IconButton>{likeCount}
          <IconButton onClick={() => commentRef.current.focus()} sx={{marginLeft: "20px"}}>
            <AddCommentRoundedIcon sx={{fontSize: 30}}></AddCommentRoundedIcon>
          </IconButton>{commentCount}
        </Box>

        <Stack spacing={1}>
          <Stack spacing={1} sx={{display: myComment.comments.length !== 0 ? 'block' : 'none'}}>
            <Divider>내 댓글</Divider>

            {/*내 댓글 목록*/}
            <Stack p={1} spacing={3}>
              {myComment.comments.map((c) => {
                return (
                  <Comment
                    key={c.id}
                    commentList={myComment.comments}
                    comment={c}
                    feedId={id}
                    image={c.writer.image ? c.writer.image.source : ''}
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
                  commentList={comment.comments}
                  comment={c}
                  feedId={id}
                  image={c.writer.image ? c.writer.image.source : ''}
                  getMentionName={getMentionName}
                  getCommentContent={getCommentContent}
                />
              );
            }) : "댓글이 없습니다."
            }

            {comment.currentPage < comment.totalPages &&
              <>
                <Box display="flex" justifyContent="center" style={{padding: 20}}
                     sx={{display: load ? 'flex' : 'none'}}>
                  <CircularProgress size={30}/>
                </Box>
                <Button
                  onClick={() => loadCommentList(id, comment.currentPage)}>더보기({comment.totalElements - comment.comments.length})</Button>
              </>
            }
          </Stack>
        </Stack>

        {/* 댓글 작성 */}
        <Stack fullWidth sx={{p: 1, position: 'sticky', bottom: 0, bgcolor: '#ffffff'}}>
          <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
            <SmallProfile image={state.user.image && state.user.image.source} name={state.user.name}/>
            <TextField inputRef={commentRef} multiline size='small' fullWidth error={!!commentErrorMessage} helperText={commentErrorMessage}
                       value={commentContent.content} placeholder='댓글을 입력해 주세요.' onChange={handleChangeComment}/>
            <Button type='submit' variant='contained' onClick={handleClickCheckButton}>
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
      </Box>

      <Box style={{display: modifyOpen ? 'block' : 'none'}}>
        <ModifyFeed feedDetail={props.feedDetail}/>
        <Stack spacing={1} direction='row' sx={{justifyContent: 'center'}}>
          <Button variant='contained'>수정</Button>
          <Button variant='contained' onClick={closeModify}>취소</Button>
        </Stack>
      </Box>

      {/* 피드 삭제 다이얼로그 */}
      <NoticeModal
        open={deleteOpen}
        title={'피드 삭제'}
        content1={'삭제 시 복구할 수 없습니다.'}
        content2={'삭제하시겠습니까?'}
        onAccept={handleClickDelete}
        onClose={closeDelete}
      />
    </>
  );
}