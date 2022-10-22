import React, {useContext, useEffect, useState} from "react";
import {store} from "../../store/store";
import {
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Typography,
  Button,
  Card,
  Skeleton, Grid, Box, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow
} from "@mui/material";
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FeedLine from "../feedline/FeedLine";
import {useLocation} from "react-router-dom";
import customAxios from "../../AxiosProvider";

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
  const onImageChange = (e) => {
    console.log(e.target.files[0]);
  }

  useEffect(() => {
    console.log(searchParams)
    customAxios.get(`/user/${searchParams}`)
      .then(res => setUser(res.data))
      .catch(error => {console.log(error.response);});
    customAxios.get(`/feed?userid=${searchParams}`)
      .then(res => setFeed(res.data))
      .catch(error => console.log(error.response));
  }, [searchParams]);

  return (
    <Stack alignItems={"center"}>

{/*      <IconButton aria-label="update profile image" component="label">
        <input hidden accept="image/*" type="file" onChange={onImageChange} />
        <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
      </IconButton>*/}

      <Grid container direction={"row"} sx={{width: "1100px"}}>

        <Grid item xs={3} py={3}>

          <Stack spacing={2} style={{position: "fixed"}}>
            <Card>
              <Stack alignItems={"center"}>
                <IconButton onClick={() => {
                  if (user.image !== null)
                    dispatch({type: 'OpenImageView', payload: user.image.source})
                }}>
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
                      재직분야 : {user.occupation && user.occupation}
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
                      <Button
                        size={"small"}
                        variant={"contained"}
                        onClick={() => setUpdateProfile(true)}
                      >
                        프로필 변경
                      </Button>
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
        maxWidth={"sm"} fullWidth
        open={updateProfile}
        onClose={() => {setUpdateProfile(false)}}
      >
        <ProfileUpdateDialog user={user}/>
      </Dialog>
    </Stack>
  );
}

function ProfileUpdateDialog(props) {

  const [state, dispatch] = useContext(store);
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

  useEffect(() => {
    customAxios.get(`/user`)
      .then(res => {setUser(res.data); console.log(res.data)})
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <DialogTitle>내 프로필 변경하기</DialogTitle>
      <DialogContent>
        <Table><TableBody>
          <TableRow>
            <TableCell></TableCell><TableCell></TableCell>
          </TableRow>
        </TableBody></Table>
      </DialogContent>
    </>
  );
}
