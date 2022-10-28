import React, {useContext, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {store} from "../../store/store";
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
  styled, DialogActions, Button
} from '@mui/material';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import FeedDetail from './FeedDetail';
import MoreMenu from './MoreMenu';
import ProfileMenu from "../ProfileMenu";
import ModifyFeed from "./ModifyFeed";
import NoticeModal from "../NoticeModal";

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
  const [, dispatch] = useContext(store);
  const {commentCount, files, id, isLiked, likeCount, writer, content, createTime} = props.feed;
  const [feedDetail, setFeedDetail] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [commentFocus, setCommentFocus] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const getFeedDetail = (data) => {setFeedDetail(data)}
  const openContent = async () => {
    await customAxios.get(`/feed/${id}`)
      .then(res => {
        setFeedDetail(res.data);
        setDetailOpen(true);
      })
      .catch(error => console.error(error))
  };
  const closeContent = () => {
    setDetailOpen(false);
    setCommentFocus(false);
  };
  const openModify = async () => {
    await customAxios.get(`/feed/${id}`)
      .then(res => {
        setFeedDetail(res.data);
        setModifyOpen(true);
      })
      .catch(error => console.error(error))
  };
  const closeModify = () => setModifyOpen(false);
  const openDelete = () => setDeleteOpen(true);
  const closeDelete = () => setDeleteOpen(false);
  const handleClickProfile = (e) => setAnchor(e.currentTarget);
  const handleCloseProfile = () => setAnchor(null);
  const handleClickProfileView = () => navigate(`/profile?user=${writer.id}`);
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
  const handleClickComment = () => {
    openContent();
    setCommentFocus(commentFocus => !commentFocus);
  };
  const handleClickDelete = () => {
    dispatch({type: 'OpenLoading', payload: '피드를 삭제중입니다..'});
    customAxios.delete(`/feed/${id}`)
      .then(() => {
        props.getFeedList(props.feedList.filter(item => item.id !== id));
        dispatch({type: 'OpenSnackbar', payload: `피드가 삭제되었습니다.`});
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}))
  };
  const handleClickImage = (image) => dispatch({type: 'OpenImageView', payload: image});
  const getDate = () => {
    const feedDate = createTime.split(' ');
    const todayDate = feedDate[0].split('-');
    const todayTime = feedDate[1].split(':');
    let today = new Date();
    const todayHour = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      hour: today.getHours(),
      minute: today.getMinutes()
    }
    const date = {
      year: todayDate[0],
      month: todayDate[1],
      date: todayDate[2],
      hour: todayTime[0],
      minute: todayTime[1]
    }
    const date1 = new Date(date.year, date.month, date.date, date.hour, date.minute).getTime();
    const date2 = new Date(todayHour.year, todayHour.month, todayHour.date, todayHour.hour, todayHour.minute).getTime();
    const beforeHours = (date2 - date1) / 1000 / 60;

    if (beforeHours < 60) return `${beforeHours}분 전`
    if (beforeHours <= 12 * 60) return `${Math.round(beforeHours / 60)}시간 전`
    return feedDate[0];
  };

  return (
    <>
      <Box sx={{boxShadow: 5, borderRadius: 1.5}} elevation={5}>

        {/*컨텐츠 + 더보기 버튼*/}
        <Stack>
          <Stack direction='row' sx={{cursor: 'pointer', justifyContent:'space-between', alignItems:'flex-start'}}>
            <Box p={3} width="100%" onClick={openContent}>
              <Content>{content}</Content>
            </Box>

            <Box p={1}>
              <MoreMenu
                writer={writer.id}
                openModify={openModify}
                openDelete={openDelete}
              />
            </Box>
          </Stack>
          
          <Box sx={{textAlign: 'end', pr: 3}}>
            <Button onClick={openContent}>상세보기</Button>
          </Box>

          <Stack direction='row' spacing={1} sx={{p: 3, pt: 0}}>
            {files.slice(0, 3).map(item => (
              <Box
                key={item.id}
                onClick={() => handleClickImage(item.source)}
                sx={{
                  width: '25%',
                  height: '180px',
                  borderRadius: 3,
                  cursor: 'pointer'
                }}>
                <img src={item.source} alt={item.originalName} style={{objectFit: 'cover', borderRadius: '10px'}}
                     width='100%' height='100%'/>
              </Box>
            ))}

            {files.length > 3 &&
              <Box sx={{
                width: '25%',
                opacity: 0.5,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `linear-gradient(
                  rgba(0, 0, 0, 0.4),
                  rgba(0, 0, 0, 0.4)
                ), url(${files[3].source})`
              }}>
                  <Typography sx={{fontSize: 'xx-large', fontWeight: 'bold', color: '#ffffff'}}>
                    + {files.length - 3}
                  </Typography>
              </Box>
            }
          </Stack>
        </Stack>

        <Divider/>

        {/*좋아요, 댓글, 프로필*/}
        <Stack direction='row' justifyContent='space-between' alignItems='center' m={1.5}>
          <Stack direction='row' spacing={3}>
            <IconButton onClick={() => handleClickLike(id, writer.name)}>
              <StyledBadge badgeContent={likeCount} bgcolor={''} showZero>
                <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
              </StyledBadge>
            </IconButton>
            <IconButton onClick={handleClickComment}>
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
                <Typography variant='body2' color="textSecondary">{getDate()}</Typography>
              </Grid>
            </Grid>

            <ProfileMenu
              anchor={anchor}
              open={Boolean(anchor)}
              isFollowed={writer.isFollowed}
              userId={writer.id}
              userName={writer.name}
              onClose={handleCloseProfile}
              onClick={handleClickProfileView}/>
          </Box>
        </Stack>
      </Box>

      {/* 컨텐츠 상세보기 다이얼로그 */}
      <Dialog open={detailOpen} onClose={closeContent} fullWidth maxWidth='md'>
        <DialogContent sx={{pb: 0, pt: 0}}>
          <FeedDetail
            feedDetail={feedDetail}
            commentFocus={commentFocus}
            feedList={props.feedList}
            getFeedList={props.getFeedList}
            getFeedDetail={getFeedDetail}
            closeContent={closeContent}
          />
        </DialogContent>
      </Dialog>

      {/* 컨텐츠 수정하기 다이얼로그 */}
      <Dialog open={modifyOpen} onClose={closeModify} fullWidth maxWidth='md'>
        <DialogContent>
          <ModifyFeed
            feedDetail={feedDetail}
            closeContent={closeModify}
          />
        </DialogContent>
      </Dialog>

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

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: 15,
    top: 35
  }
}));