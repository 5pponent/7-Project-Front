import React, {useContext, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {useNavigate} from "react-router-dom";
import {
  Divider,
  Typography,
  Box,
  Avatar,
  IconButton,
  Grid,
  Stack,
  Badge,
  Dialog,
  DialogContent,
  styled
} from '@mui/material';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import FeedDetail from './FeedDetail';
import MoreMenu from './MoreMenu';
import ProfileMenu from "../ProfileMenu";
import {store} from "../../store/store";

// 컨텐츠 글 5줄까지만 표시, 이후엔 ...으로 생략
const Content = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`

export default function Feed(props) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(store);
  const {commentCount, id, isLiked, likeCount, writer, content, createTime} = props.feed;
  const [feedDetail, setFeedDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const getFeedDetail = (data) => {setFeedDetail(data)}
  const openContent = async () => {
    await customAxios.get(`/feed/${id}`)
      .then(res => {
        setFeedDetail(res.data);
        setOpen(true);
      })
      .catch(error => {console.error(error);})
  };
  const closeContent = () => {setOpen(false)};
  const handleClickProfile = (e) => {setAnchor(e.currentTarget)};
  const handleCloseProfile = () => {setAnchor(null)};
  const handleClickProfileView = () => {navigate(`/profile?user=${writer.id}`)};
  const handleClickLike = (feedId, name) => {
    if (isLiked) {
      customAxios.delete(`/feed/${feedId}/like`)
        .then(res => {
          props.updateFeedDetail(res.data);
          dispatch({type: 'OpenSnackbar', payload: `좋아요가 취소되었습니다.`});
        })
        .catch(error => console.error(error.response))
    } else {
      customAxios.post(`/feed/${feedId}/like`)
        .then(res => {
          props.updateFeedDetail(res.data);
          dispatch({type: 'OpenSnackbar', payload: `${name}님의 피드를 좋아합니다.`});
        })
        .catch(error => console.error(error.response))
    }
  };

  return (
    <>
      <Box sx={{boxShadow: 5, borderRadius: 1.5}} elevation={5}>

        {/*컨텐츠 + 더보기 버튼*/}
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
          <Box p={3} sx={{cursor: 'pointer'}} width={"100%"} onClick={openContent}>
            <Content>{content}</Content>
          </Box>

          <Box p={1}>
            <MoreMenu
              feedId={id}
              writer={writer.id}
              feedList={props.feedList}
              getFeedList={props.getFeedList}
            />
          </Box>
        </Stack>

        <Divider/>

        {/*좋아요, 댓글, 프로필*/}
        <Stack
          direction={"row"} justifyContent={"space-between"}
          alignItems={"center"} m={1.5}
        >
          <Stack direction={'row'} spacing={3}>
            <IconButton onClick={() => handleClickLike(id, writer.name)}>
              <StyledBadge badgeContent={likeCount} bgcolor={''} showZero>
                <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
              </StyledBadge>
            </IconButton>
            <IconButton>
              <StyledBadge badgeContent={commentCount} bgcolor={''} showZero>
                <AddCommentRoundedIcon sx={{fontSize: 30}}/>
              </StyledBadge>
            </IconButton>
          </Stack>

          <Box>
            <Grid container spacing={1} sx={{cursor: 'pointer'}} onClick={handleClickProfile}>
              <Grid item>
                <Avatar src={props.image}/>
              </Grid>
              <Grid item>
                <Typography>{writer.name}</Typography>
                <Typography variant="body2" color="textSecondary">{createTime.substring(0, 10)}</Typography>
              </Grid>
            </Grid>

            <ProfileMenu
              anchor={anchor}
              open={Boolean(anchor)}
              onClose={handleCloseProfile}
              onClick={handleClickProfileView}/>
          </Box>
        </Stack>
      </Box>

      {/* 컨텐츠 상세보기 다이얼로그 */}
      <Dialog open={open} onClose={closeContent} fullWidth maxWidth='md'>
        <DialogContent>
          <FeedDetail
            feedDetail={feedDetail}
            feedList={props.feedList}
            getFeedList={props.getFeedList}
            getFeedDetail={getFeedDetail}
            closeContent={closeContent}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 15,
    top: 35
  },
}));