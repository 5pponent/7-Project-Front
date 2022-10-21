import React, {useContext, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {useNavigate} from "react-router-dom";
import {store} from "../../store/store";
import {
  Divider,
  Typography,
  Box, Paper,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Stack,
  Badge, Dialog, DialogContent
} from '@mui/material';
import {styled} from '@mui/material/styles';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import FeedDetail from './FeedDetail';
import MoreMenu from './MoreMenu';

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

  const comments = [
    {
      "comment_idx": 1,
      "name": "유저1",
      "image": "https://placeimg.com/100/100/people/1",
      "content": "그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서.그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서.그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서."
    },
    {
      "comment_idx": 2,
      "name": "유저2",
      "image": "https://placeimg.com/100/100/people/2",
      "content": "그들의 있는 불어 산야에 뜨거운지라, 피가 있는 구할 속잎나고, 사막이다. 끓는 고동을 내는 우리 황금시대의 위하여서. 이상은 눈이 청춘의 사막이다. 그들의 기쁘며, 얼마나 불어 광야에서 그들에게 있을 말이다. 그 말을 듣는 것 조차 하지 못할 것인 사람이다."
    }
  ];
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
  const handleClickLike = (feedId) => {
    if (isLiked) {
      customAxios.delete(`/feed/${feedId}/like`)
        .then(res => props.updateFeedDetail(res.data))
    } else {
      customAxios.post(`/feed/${feedId}/like`)
        .then(res => props.updateFeedDetail(res.data))
    }
  };

  return (
    <>
      <Paper sx={{marginY: '30px'}} elevation={8}>
        <Grid container>
          <Grid item xs={11} sx={{cursor: 'pointer'}} onClick={openContent}> {/* 컨텐츠 */}
            <Box p={4}>
              <Content>
                {content}
              </Content>
            </Box>
          </Grid>

          <Grid item xs={1} p={2}> {/* 더보기 버튼 */}
            <MoreMenu
              feedId={id}
              writer={writer.id}
              feedList={props.feedList}
              getFeedList={props.getFeedList}/>
          </Grid>
        </Grid>

        <Divider/>

        <Grid container p={2}>
          <Grid item xs={10}> {/* 좋아요, 댓글 */}
            <Stack direction={'row'} spacing={3}>
              <IconButton onClick={() => handleClickLike(id)}>
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
          </Grid>

          <Grid item xs={2}> {/* 프로필 */}
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

              <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleCloseProfile}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
              >
                <MenuItem onClick={handleClickProfileView}>프로필</MenuItem>
                <MenuItem>팔로우</MenuItem>
                <MenuItem>차단</MenuItem>
              </Menu>
            </Box>
          </Grid>

        </Grid>
      </Paper>

      {/* 컨텐츠 상세보기 다이얼로그 */}
      <Dialog open={open} onClose={closeContent} fullWidth maxWidth='md'>
        <DialogContent>
          <FeedDetail
            feedDetail={feedDetail}
            comments={comments}
            feedList={props.feedList}
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
    top: 40
  },
}));