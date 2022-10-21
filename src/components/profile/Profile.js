import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {store} from "../../store/store";
import {Avatar, Divider, IconButton, InputBase, Stack, Tooltip, Typography, Box, Button, Card} from "@mui/material";
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FeedLine from "../feedline/FeedLine";
import {useLocation, useNavigate} from "react-router-dom";
import customAxios from "../../AxiosProvider";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  border: '1px solid lightgray',
  borderRadius: theme.shape.borderRadius,
  width: '200px',
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

  const [isMe, setIsMe] = useState(false);
  const [user, setUser] = useState({
    email: '',
    followerCount: 0,
    followingCount: 0,
    id: 0,
    image: null,
    interests: [],
    name: '',
    occupation: null
  });
  const [feed, setFeed] = useState({
    currentPage: 0,
    feeds: [],
    totalElements: 0,
    totalPages: 0
  });

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
      customAxios.get(`/feed?userid=${searchParams}&pageNumber=${feed.currentPage + 1}`)
        .then(res => loadFeedList(res.data))
    }
  };
  const onImageChange = (e) => {
    console.log("이미지 변경");
  };

  useEffect(() => {
    customAxios.get(`/user/${searchParams}`)
      .then(res => {
        if (res.data.id === state.user.id) setIsMe(true);
        setUser(res.data);
      })
      .catch(error => {console.log(error.response);});
    customAxios.get(`/feed?userid=${searchParams}`)
      .then(res => {
        setFeed(res.data);
      })
      .catch(error => console.log(error.response));
  }, [searchParams]);

  return (
    <>
      <Stack py={5} alignItems='center' bgcolor={'#e7ebf0'}>
        <Card>
          <Stack alignItems={"center"}>
            {
              isMe ?
                <IconButton aria-label="update profile image" component="label">
                  <input hidden accept="image/*" type="file" onChange={onImageChange} />
                  <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
                </IconButton>
                :
                <IconButton aria-label="update profile image" component="label"
                  onClick={() => {
                    if (user.image !== null)
                      dispatch({type: 'OpenImageView', payload: user.image.source})
                    else return
                  }}
                >
                  <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
                </IconButton>
            }
            <Typography sx={{fontSize: '18px', fontWeight: 'bold'}}>
              {user.name}
            </Typography>
          </Stack>
          <Divider/>
          <Stack sx={{userSelect: 'none'}} p={2} spacing={1}>
            <Typography variant='subtitle2'>
              이메일 : {user.email}
            </Typography>
            <Typography variant='subtitle2'>
              재직분야 : {user.occupation && user.occupation}
            </Typography>
            <Typography variant={'subtitle2'}>
              follower : {user.followerCount}
            </Typography>
            <Typography variant='subtitle2'>
              follow : {user.followingCount}
            </Typography>
            {
              !isMe && <Button size={"small"} variant={"contained"}>팔로우</Button>
            }
          </Stack>
        </Card>
      </Stack>

      <Divider/>

      <Stack direction='row' sx={{width: '800px', margin: '0 auto', padding: '10px'}}>
        <Search>
          <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
          <StyledInputBase placeholder="피드 검색"/>
        </Search>
      </Stack>

      <Box sx={{overflow: 'overlay'}}>
        <FeedLine
          feed={feed}
          handleScroll={handleScroll}
          getFeedList={getFeedList}
          loadFeedList={loadFeedList}
          updateFeedDetail={updateFeedDetail}/>
      </Box>
    </>
  );
}
