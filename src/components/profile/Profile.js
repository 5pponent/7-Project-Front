import React, {useContext, useEffect, useState} from "react";
import {store} from "../../store/store";
import {
  Avatar, Box,
  Button,
  ButtonBase,
  Card,
  Dialog, Fade,
  Grid,
  IconButton,
  InputBase, Paper, Popper,
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
    occupation: null
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

  const getFeedList = (data) => {setFeed({...feed, feeds: data})};
  const loadFeedList = (data) => {setFeed({...feed, currentPage: data.currentPage, feeds: feed.feeds.concat(data.feeds)})};
  const updateFeedDetail = (data) => {
    setFeed({
      ...feed,
      feeds: feed.feeds.map(item => {
        if (item.id === data.id) return data
        return item
      })})
  };
  const handleScroll = () => {
    const scroll = window.scrollY + document.documentElement.clientHeight;
    if (scroll === document.documentElement.scrollHeight) {
      customAxios.get(`/feed?userid=${searchParams}&page=${feed.currentPage + 1}`)
        .then(res => loadFeedList(res.data))
    }
  };
  const handleCloseDialog = (stat) => {setUpdateProfile(stat)}
  const reloadUser = () => {
    customAxios.get(`/user/${searchParams}`)
      .then(res => setUser(res.data))
      .catch(error => {console.log(error.response);});
  }
  const openPopper = () => {
    setAnchorEl(document.getElementById("avatar"));
    setOpen(true);
  };

  useEffect(() => {
    customAxios.get(`/user/${searchParams}`)
      .then(res => setUser(res.data))
      .catch(error => {console.log(error.response);});
    customAxios.get(`/feed?userid=${searchParams}`)
      .then(res => setFeed(res.data))
      .catch(error => console.log(error.response));
    openPopper();
  }, [searchParams]);

  return (
    <Stack alignItems={"center"}>

      { user.message.length !== 0 &&
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={"top"}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={2000}>
              <Box className={"message"} minWidth={"100px"} minHeight={"50px"} maxWidth={"300px"}
                   boxShadow={2}>
                <Typography p={2} fontSize={14} color={"darkgray"} fontFamily={"HSYuji-Regular"}
                            style={{wordBreak: 'break-all', wordWrap: 'pre-wrap'}}
                >
                  {user.message}
                </Typography>
              </Box>
            </Fade>
          )}
        </Popper>

      }
      <Grid container direction={"row"} sx={{width: "1100px"}}>

        <Grid item xs={3} py={3}>

          <Stack spacing={2} style={{position: "fixed"}} height={"100%"}>
            <Card>
              <Stack alignItems={"center"} mt={20}>
                <IconButton id="avatar" itemID="avatar" onMouseOver={openPopper}
                  onClick={() => {
                  if (user.image !== null)
                    dispatch({type: 'OpenImageView', payload: user.image.source})
                  }}
                >
                  <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
                </IconButton>
                { user.id === 0 ?
                  <Skeleton animation="wave" width={100} height={40}/>
                  :
                  <Typography sx={{fontSize: '18px', fontWeight: 'bold'}}>
                    {user.name}
                  </Typography>
                }
              </Stack>

              <Stack sx={{userSelect: 'none'}} p={2} spacing={1}>
                { user.id === 0 ?
                  <>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton variant="rectangular" width={210} height={50}/>
                  </>
                  :
                  <>
                    <Typography variant='subtitle2'>
                      이메일 : {user.email}
                    </Typography>
                    <Typography variant='subtitle2'>
                      직종 : {user.occupation && user.occupation}
                    </Typography>
                    <Stack direction={"row"} display={"flex"} justifyContent={"space-evenly"}>
                      <Typography variant={'subtitle2'}>
                        follower : {user.followerCount}
                      </Typography>
                      <Typography variant='subtitle2'>
                        follow : {user.followingCount}
                      </Typography>
                    </Stack>
                    { state.user.id === user.id ?
                      <Stack direction={"row"} justifyContent={"center"}>
                        <ButtonBase onClick={() => setUpdateProfile(true)}
                          style={{
                            backgroundColor: 'lightgray', borderRadius: 4, padding: 4
                        }}>
                          <CreateRoundedIcon sx={{fontSize: 14}}/>&nbsp;
                          <Typography fontSize={12}>프로필 수정</Typography>
                        </ButtonBase>
                      </Stack>
                      :
                      <Button size={"small"} variant={"contained"}>팔로우</Button>
                    }
                  </>
                }
              </Stack>
            </Card>
            <Search>
              <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
              <StyledInputBase placeholder="피드 검색"/>
            </Search>
          </Stack>

        </Grid>

        <Grid item xs={9}>
          <FeedLine
            feed={feed}
            handleScroll={handleScroll}
            getFeedList={getFeedList}
            loadFeedList={loadFeedList}
            updateFeedDetail={updateFeedDetail}
          />
        </Grid>

      </Grid>

      <Dialog
        open={updateProfile}
        onClose={() => {setUpdateProfile(false)}}
      >
        <ProfileUpdateDialog
          user={user}
          handleCloseDialog={handleCloseDialog}
          reloadUser={reloadUser}
        />
      </Dialog>
    </Stack>
  );
}