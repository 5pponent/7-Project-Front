import {useContext} from "react";
import {store} from "../../store/store";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import SmallProfile from "../SmallProfile";
import MoreMenu from './MoreMenu';
import Comment from './Comment';

export default function FeedDetail(props) {
  const [state, dispatch] = useContext(store);
  const {commentCount, content, createTime, files, id, isFollowed, isLiked, likeCount, writer} = props.feedDetail

  return (
    <>
      <Grid container paddingBottom={3} spacing={2}>
        <Grid item xs={1}>
          <SmallProfile image={writer.image ? writer.image.source : 'https://placeimg.com/100/100/people/00'} name={writer.name}/>
        </Grid>

        <Grid item xs={10}>
          <Typography color="textSecondary" fontSize="12px">
            {createTime.substring(0, 10)}
          </Typography>
          <Typography>{content}</Typography>
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
        <IconButton>
          <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
        </IconButton>{likeCount}
        <IconButton sx={{marginLeft: "20px"}}>
          <AddCommentRoundedIcon sx={{fontSize: 30}}></AddCommentRoundedIcon>
        </IconButton>{commentCount}
      </Box>

      <Divider/>

      <Grid container marginTop='15px'>
        <Grid item xs={1}>
          <SmallProfile image={writer.image ? writer.image.source : 'https://placeimg.com/100/100/people/00'} name={state.user.name}/>
        </Grid>
        {/* 댓글 작성 */}
        <Grid item xs={11}>
          <Stack direction='row' margin='10px' spacing={1}>
            <TextField multiline size='small' fullWidth/>
            <Button type='submit' variant='contained'>입력</Button>
          </Stack>
        </Grid>
      </Grid>

      <Stack p={1}>
        {
          props.comments ? props.comments.map((c) => {
            return (
              <Comment
                key={c.comment_idx}
                name={c.name}
                image={c.image}
                content={c.content}
              />
            );
          }) : "댓글이 없습니다."
        }
      </Stack>
    </>
  );
}