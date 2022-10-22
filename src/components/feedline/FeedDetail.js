import {useContext, useEffect, useState} from "react";
import customAxios from '../../AxiosProvider';
import {store} from '../../store/store';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton, ImageList, ImageListItem,
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
import LoadingProcess from "../LoadingProcess";

export default function FeedDetail(props) {
  const [state, dispatch] = useContext(store);
  const [comment, setComment] = useState({
    comments: [],
    currentPage: undefined,
    totalElements: undefined,
    totalPages: undefined
  });
  const [commentContent, setCommentContent] = useState({content: ''});
  const {comments} = comment;
  const {commentCount, content, createTime, files, id, isFollowed, isLiked, likeCount, writer} = props.feedDetail

  useEffect(() => {
    customAxios.get(`/feed/${id}/comment`)
      .then(res => setComment(res.data))
  }, []);

  const handleChangeComment = (e) => {setCommentContent({content: e.target.value})};
  const handleClickLike = (feedId) => {
    if (isLiked) {
      customAxios.delete(`/feed/${feedId}/like`)
        .then(res => props.getFeedDetail(res.data))
    } else {
      customAxios.post(`/feed/${feedId}/like`)
        .then(res => props.getFeedDetail(res.data))
    }
  };
  const handleCreateComment = (feedId, content) => {
    dispatch({type: 'OpenLoading', message: '댓글을 작성중입니다..'});
    console.log(content)
    customAxios.post(`/feed/${feedId}/comment`, content)
      .then(res => {
        setCommentContent({content: ''});
        dispatch({type: 'OpenSnackbar', payload: `댓글이 입력되었습니다.`});
      })
      .catch(err => console.log(err.response))
      .finally(() => {dispatch({type: 'CloseLoading'})})
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
        <Typography sx={{whiteSpace:'pre-wrap'}}>
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
          <TextField multiline size='small' fullWidth value={commentContent.content}
                     placeholder='댓글을 입력해 주세요.' onChange={handleChangeComment}/>
          <Button type='submit' variant='contained' onClick={() => handleCreateComment(id, commentContent)}>
            입력
          </Button>
        </Stack>
      </Stack>

      {/*댓글 목록*/}
      <Stack p={1} spacing={3}>
      { comments ? comments.map((c) => {
          return (
            <Comment
              key={c.id}
              name={c.writer.name}
              image={c.writer.image ? c.writer.image.source : ''}
              content={c.content}
              createTime={c.createTime}
            />
          );
        }) : "댓글이 없습니다."
      }
      </Stack>
    </>
  );
}