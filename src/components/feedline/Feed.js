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
  const [, dispatch] = useContext(store);
  const {commentCount, files, id, isLiked, likeCount, writer, content, createTime} = props.feed;
  const [feedDetail, setFeedDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [commentFocus, setCommentFocus] = useState(false);
  const [anchor, setAnchor] = useState(null);

<<<<<<< HEAD
  const getFeedDetail = (data) => {setFeedDetail(data)};
  const openContent = () => {
    customAxios.get(`/feed/${id}`)
=======
  const getFeedDetail = (data) => {setFeedDetail(data)}
  const openContent = async () => {
    await customAxios.get(`/feed/${id}`)
>>>>>>> 1a62d87008d15dcf383e051c35ff5d16b4def172
      .then(res => {
        setFeedDetail(res.data);
        setOpen(true);
      })
<<<<<<< HEAD
      .catch(error => console.error(error))
  };
  const closeContent = () => {
    setOpen(false);
    setCommentFocus(false);
=======
      .catch(error => {
        console.error(error);
      })
  }
  const closeContent = () => {setOpen(false)}
  const handleClickProfile = (e) => {setAnchor(e.currentTarget)}
  const handleCloseProfile = () => {setAnchor(null)}
  const handleClickProfileView = () => {
    navigate(`/profile?user=${writer.id}`)
>>>>>>> 1a62d87008d15dcf383e051c35ff5d16b4def172
  };
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
  const handleClickComment = () => {
    openContent();
    setCommentFocus(commentFocus => !commentFocus);
  };
  const getDate = () => {
    let today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const feedDate = createTime.split(' ');
    const hours = (today.getHours() * 60 + today.getMinutes()) - (parseInt(feedDate[1].split(':')[0] * 60) + parseInt(feedDate[1].split(':')[1]));
    if (feedDate[0] === date) {
      if (hours < 60) return `${hours}분 전`
      if (hours <= 360) return `${Math.round(hours / 60)}시간 전`
      return feedDate[1];
    } else return feedDate[0]
  };

  return (
    <>
      <Box sx={{boxShadow: 5, borderRadius: 1.5}} elevation={5}>

        {/*컨텐츠 + 더보기 버튼*/}
        <Stack sx={{cursor: 'pointer'}}>
          <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
            <Box p={3} width="100%" onClick={openContent}>
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

          <Stack direction='row' spacing={1} sx={{p: 3, pt: 0}} onClick={openContent}>
            {files.slice(0, 3).map(item => (
              <Box key={item.id} sx={{width: '25%', borderRadius: 3, overflow: 'hidden'}}>
                <img src={item.source} alt={item.originalName} width={'100%'} height={'100%'}/>
              </Box>
            ))}

            {files.length > 3 &&
              <Box sx={{width: '25%', bgcolor: 'rgba(0,0,0,0.35)', borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography sx={{fontSize: 'xx-large', fontWeight: 'bold', color: '#d8dbdc'}}>
                  +{files.length - 3}
                </Typography>
              </Box>
            }
          </Stack>
        </Stack>

        <Divider/>

        {/*좋아요, 댓글, 프로필*/}
        <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} m={1.5}>
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
            commentFocus={commentFocus}
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

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: 15,
    top: 35
  },
}));