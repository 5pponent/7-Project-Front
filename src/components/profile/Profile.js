import React, {useContext, useEffect, useState} from "react";
import {store} from "../../store/store";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card, Chip,
  Dialog,
  Fade,
  Grid,
  IconButton,
  InputBase,
  Popper,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import FeedLine from "../feedline/FeedLine";
import {useLocation} from "react-router-dom";
import customAxios from "../../AxiosProvider";
import ProfileUpdateDialog from "./ProfileUpdateDialog";
import "./message.css";
import "../../css/fonts.css";
import FollowList from "./FollowList";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  border: '1px solid lightgray',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    width: '100%'
  },
}));

export default function Profile(props) {
  const [state, dispatch] = useContext(store);

  let location = useLocation();
  let searchParams = new URLSearchParams(location.search).get('user');

  const [user, setUser] = useState({
    email: '',
    followerCount: 0,
    followingCount: 0,
    id: 0,
    image: null,
    interests: [],
    name: '',
    message: '',
    occupation: null,
    isFollowed: false
  });
  const [feed, setFeed] = useState({
    currentPage: 0,
    feeds: [],
    totalElements: 0,
    totalPages: 0
  });
  const [updateProfile, setUpdateProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(true);
  const [open, setOpen] = useState(false);
  const [todayComment, setTodayComment] = useState(true);
  const [mode, setMode] = useState('FEED');

  const getFeedList = (data) => {
    setFeed({...feed, feeds: data})
  };
  const loadFeedList = (data) => {
    setFeed({...feed, currentPage: data.currentPage, feeds: feed.feeds.concat(data.feeds)})
  };
  const updateFeedDetail = (data) => {
    setFeed({
      ...feed,
      feeds: feed.feeds.map(item => {
        if (item.id === data.id) return data
        return item
      })
    })
  };
  const handleScroll = () => {
    const scroll = window.scrollY + document.documentElement.clientHeight;
    if (scroll === document.documentElement.scrollHeight) {
      customAxios.get(`/feed?userid=${searchParams}&page=${feed.currentPage + 1}`)
        .then(res => loadFeedList(res.data))
    }
  };
  const handleCloseDialog = (stat) => {
    setUpdateProfile(stat)
  }
  const reloadUser = () => {
    customAxios.get(`/user/${searchParams}`)
      .then(res => setUser(res.data))
      .catch(error => {
        console.log(error.response);
      });
  }
  const openPopper = () => {
    setAnchorEl(document.getElementById("avatar"));
    setOpen(true);
  };
  const hidePopper = () => {
    setTodayComment(false);
    dispatch({type: 'OpenSnackbar', payload: `조용히할게요..`});
  };
  const handleClickFollow = () => {
    customAxios.post(`/user/${searchParams}/follow`)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: `${user.name}님을 팔로우합니다.`});
        reloadUser();
      })
      .catch(err => {console.log(err.response)})
      .finally(() => {});
  }
  const handleClickUnfollow = () => {
    customAxios.delete(`/user/${searchParams}/follow`)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: `${user.name}님을 더 이상 팔로우하지 않습니다.`});
        reloadUser();
      })
      .catch(err => {console.log(err.response)})
      .finally(() => {});
  }

  useEffect(() => {
    customAxios.get(`/user/${searchParams}`)
      .then(res => setUser(res.data))
      .catch(error => {
        console.log(error.response);
      });
    customAxios.get(`/feed?userid=${searchParams}`)
      .then(res => setFeed(res.data))
      .catch(error => console.log(error.response));
    openPopper();
  }, [searchParams]);

  return (
    <Stack alignItems={"center"}>

      {user.message.length !== 0 &&
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={"top"}
          transition
        >
          {({TransitionProps}) => (
            <Fade {...TransitionProps} timeout={2000}>
              <Box className={"message"} minWidth={"100px"} minHeight={"50px"} maxWidth={"280px"}
                   boxShadow={2}>
                <Typography p={2} fontSize={14} color={'#14325e'} fontFamily={"HSYuji-Regular"}
                            style={{wordBreak: 'break-word', wordWrap: 'pre-wrap'}}
                >
                  {todayComment ? user.message : '...'}
                </Typography>
                <Box sx={{textAlign: 'end'}}>
                  <Button onClick={hidePopper} sx={{width: 'max-content', pt: 0, display: todayComment ? 'inline' : 'none'}}>쉿!</Button>
                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
      }
      <Grid container direction={"row"} sx={{width: "1100px"}}>

        <Grid item xs={3} py={3}>

          <Stack spacing={2} style={{position: "fixed"}} height={"100%"}>
            <Card sx={{width: 250}}>
              <Stack alignItems={"center"} mt={20}>
                <IconButton id="avatar" itemID="avatar" onMouseOver={openPopper}
                            onClick={() => {
                              if (user.image !== null)
                                dispatch({type: 'OpenImageView', payload: user.image.source})
                            }}
                >
                  <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
                </IconButton>
                {user.id === 0 ?
                  <Skeleton animation="wave" width={100} height={50}/>
                  :
                  <Typography sx={{fontSize: '18px', fontWeight: 'bold'}}>
                    {user.name}
                  </Typography>
                }
              </Stack>

              <Stack sx={{userSelect: 'none'}} p={2} spacing={1.5}>
                {user.id === 0 ?
                  <>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton variant="rectangular" width={220} height={30}/>
                  </>
                  :
                  <>
                    <Typography variant='subtitle2'>
                      이메일 : {user.email}
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Typography variant='subtitle2'>직종</Typography>
                      { user.occupation &&
                        <Chip size={"small"} style={{backgroundColor: '#e3f2fd'}} label={user.occupation && user.occupation}/>
                      }
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 57}}>
                        <Typography variant='subtitle2'>관심분야</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center'}}>
                        {user.interests.length > 0 && user.interests.map((it) => {
                          return(<Chip key={it} label={it} size={"small"}/>);
                        })}
                      </Box>
                    </Stack>
                    <Button fullWidth onClick={() => {setMode('FEED')}}>
                      피드({feed.feeds.length})
                    </Button>
                    <Stack direction={"row"} justifyContent={"space-around"}>
                      <Button size={"small"} onClick={() => {setMode('FOLLOWERS')}}>
                        followers<br/>{user.followerCount}
                      </Button>
                      <Button size={"small"} onClick={() => {setMode('FOLLOWING')}}>
                        following<br/>{user.followingCount}
                      </Button>
                    </Stack>
                    {state.user.id === user.id ?
                      <Stack direction={"row"} justifyContent={"center"}>
                        <ButtonBase onClick={() => setUpdateProfile(true)}
                                    style={{
                                      backgroundColor: 'lightgray', borderRadius: 8,
                                      padding: 6
                                    }}>
                          <CreateRoundedIcon sx={{fontSize: 14}}/>&nbsp;
                          <Typography fontSize={14}>프로필 수정</Typography>
                        </ButtonBase>
                      </Stack>
                      : user.isFollowed ?
                        <Button
                          size={"small"}
                          variant={"outlined"}
                          onClick={handleClickUnfollow}
                        >
                          팔로우 취소
                        </Button>
                        :
                        <Button
                          size={"small"}
                          variant={"contained"}
                          onClick={handleClickFollow}
                        >
                          팔로우
                        </Button>
                    }
                  </>
                }
              </Stack>
            </Card>
            {mode === 'FEED' &&
              <Search>
                <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
                <StyledInputBase placeholder="피드 검색"/>
              </Search>
            }
          </Stack>

        </Grid>

        <Grid item xs={9}>
          {mode === 'FEED' &&
            <FeedLine
              feed={feed}
              handleScroll={handleScroll}
              getFeedList={getFeedList}
              loadFeedList={loadFeedList}
              updateFeedDetail={updateFeedDetail}
            />
          }
          {mode === 'FOLLOWERS' &&
            <FollowList mode={mode} user={searchParams} reloadUser={reloadUser}/>
          }
          {mode === 'FOLLOWING' &&
            <FollowList mode={mode} user={searchParams} reloadUser={reloadUser}/>
          }
        </Grid>

      </Grid>

      <Dialog
        open={updateProfile}
        onClose={() => {setUpdateProfile(false)}}
      >
        <ProfileUpdateDialog
          handleCloseDialog={handleCloseDialog}
          reloadUser={reloadUser}
        />
      </Dialog>
    </Stack>
  );
}