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
    customAxios(`/feed/${feedId}/comment`, content)
      .then(res => {
        setCommentContent({content: ''});
        dispatch({type: 'OpenSnackbar', payload: `댓글이 입력되었습니다.`});
      })
  };

  return (
    <>
      <Grid container paddingBottom={3} spacing={2}>
        <Grid item xs={1}>
          <SmallProfile image={writer.image && writer.image.source} name={writer.name}/>
        </Grid>

        <Grid item xs={10}>
          <Typography color="textSecondary" fontSize="12px">
            {createTime}
          </Typography>
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
        </Grid>

        <Grid item xs={1}>
          <Stack paddingLeft={2}>
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
        </Grid>
      </Grid>

      <Box>
        <IconButton onClick={() => handleClickLike(id)}>
          <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
        </IconButton>{likeCount}
        <IconButton sx={{marginLeft: "20px"}}>
          <AddCommentRoundedIcon sx={{fontSize: 30}}></AddCommentRoundedIcon>
        </IconButton>{commentCount}
      </Box>

      <Divider/>

      <Grid container marginTop='15px'>
        <Grid item xs={1}>
          <SmallProfile image={state.user.image && state.user.image.source} name={state.user.name}/>
        </Grid>
        {/* 댓글 작성 */}
        <Grid item xs={11}>
          <Stack direction='row' margin='10px' spacing={1}>
            <TextField multiline size='small' fullWidth value={commentContent.content}
                       placeholder='댓글을 입력해 주세요.' onChange={handleChangeComment}/>
            <Button type='submit' variant='contained' onClick={() => handleCreateComment(id, commentContent)}>
              입력
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Stack p={1}>
        {
          comments ? comments.map((c) => {
            return (
              <Comment
                key={c.id}
                name={c.name}
                image={c.writer.image}
                content={c.content}
              />
            );
          }) : "댓글이 없습니다."
        }
      </Stack>
    </>
  );
}