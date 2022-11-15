import React, {useContext, useEffect, useState} from 'react';
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
  Dialog,
  DialogContent,
  styled
  , Button, Chip
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
  word-break: break-all;
`

export default function Feed(props) {
  const navigate = useNavigate();
  const [, dispatch] = useContext(store);
  const {commentCount, files, id, isLiked, likeCount, writer,  content, createTime} = props.feed;
  const [commentNum, setCommentNum] = useState(0);
  const [feedDetail, setFeedDetail] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [commentFocus, setCommentFocus] = useState(false);
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    setCommentNum(commentCount);
  }, []);

  const closeModify = () => setModifyOpen(false);
  const openDelete = () => setDeleteOpen(true);
  const closeDelete = () => setDeleteOpen(false);
  const handleClickProfile = (e) => setAnchor(e.currentTarget);
  const handleCloseProfile = () => setAnchor(null);
  const handleClickProfileView = () => navigate(`/profile?user=${writer.id}`);
  const handleAddComment = () => setCommentNum(prev => prev + 1);
  const handleDeleteComment = () => setCommentNum(prev => prev - 1);
  const modifyFeedDetail = (data) => {
    props.updateFeedDetail(data);
    setFeedDetail(data);
  }
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
    dispatch({type: 'CloseLikedList'});
  };
  const openModify = async () => {
    await customAxios.get(`/feed/${id}`)
      .then(res => {
        setFeedDetail(res.data);
        setModifyOpen(true);
      })
      .catch(error => console.error(error))
  };
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
  const handleClickComment = async () => {
    await openContent();
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
  const handleShowLikedList = () => {
    dispatch({type: 'OpenLikedList'});
    props.handleShowLikedList(id);
  }
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
    return feedDate[0];
  };

  return (
    <>
      <Box sx={{boxShadow: 5, borderRadius: 1.5}} elevation={5}>

        {/*컨텐츠 + 더보기 버튼*/}
        <Stack>
          <Stack direction='row' sx={{cursor: 'pointer', justifyContent: 'space-between', alignItems: 'flex-start'}}>
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
              <Box
                onClick={openContent}
                sx={{
                  cursor: 'pointer',
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

          <Box sx={{textAlign: 'end', pr: 3}}>
            <Button onClick={openContent}>상세보기</Button>
          </Box>
        </Stack>

        <Divider/>

        {/*좋아요, 댓글, 프로필*/}
        <Stack direction='row' justifyContent='space-between' alignItems='center' m={1.5}>
          <Stack direction='row' spacing={2} sx={{alignItems: 'center'}}>
            <Box>
              <IconButton onClick={() => handleClickLike(id, writer.name)}>
                <ThumbUpAltRoundedIcon color={isLiked ? 'primary' : 'action'} sx={{fontSize: 30}}/>
              </IconButton>
              <Chip
                onClick={handleShowLikedList}
                label={likeCount < 99 ? likeCount : '99+'}
                sx={{
                  fontSize: 'medium',
                  bgcolor: 'unset',
                  cursor: 'pointer',
                  '& .MuiChip-label': {
                    p: '3px'
                  },
                  '&:hover': {
                    bgcolor: 'rgba(236,236,236,0.49)'
                  }
                }}/>
            </Box>

            <Box>
              <IconButton onClick={handleClickComment}>
                <AddCommentRoundedIcon sx={{fontSize: 30}}></AddCommentRoundedIcon>
              </IconButton>
              <Chip
                label={commentNum}
                sx={{
                  fontSize: 'medium',
                  bgcolor: 'unset',
                  userSelect: 'none',
                  '& .MuiChip-label': {
                    p: '3px'
                  }
                }}/>
            </Box>
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
      <Dialog open={detailOpen} onClose={closeContent} fullWidth maxWidth='md' sx={{zIndex: 1100}}>
        <DialogContent sx={{pb: 0, pt: 0}}>
          <FeedDetail
            feedDetail={feedDetail}
            commentFocus={commentFocus}
            feedList={props.feedList}
            getFeedList={props.getFeedList}
            handleShowLikedList={props.handleShowLikedList}
            modifyFeedDetail={modifyFeedDetail}
            closeContent={closeContent}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
          />
        </DialogContent>
      </Dialog>

      {/* 컨텐츠 수정하기 다이얼로그 */}
      <Dialog open={modifyOpen} onClose={closeModify} fullWidth maxWidth='md'>
        <DialogContent>
          <ModifyFeed
            feedDetail={feedDetail}
            closeModify={closeModify}
            modifyFeedDetail={modifyFeedDetail}
          />
        </DialogContent>
      </Dialog>

      {/* 피드 삭제 다이얼로그 */
      }
      <NoticeModal
        open={deleteOpen}
        title={'피드 삭제'}
        content1={'삭제 시 복구할 수 없습니다.'}
        content2={'삭제하시겠습니까?'}
        onAccept={handleClickDelete}
        onClose={closeDelete}
      />
    </>
  )
}