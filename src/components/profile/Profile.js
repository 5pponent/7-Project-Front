import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {store} from "../../store/store";
import {Avatar, Divider, IconButton, InputBase, Stack, Tooltip, Typography, Box} from "@mui/material";
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FeedLine from "../feedline/FeedLine";
import {useLocation} from "react-router-dom";
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    width: '100%'
  },
}));

function FeedCreateButton() {
  return (
    <Tooltip title="피드 작성" placement='left'>
      <IconButton color='primary' sx={{marginRight: '10px'}} size='medium'>
        <BorderColorIcon/>
      </IconButton>
    </Tooltip>
  );
}

export default function Profile(props) {
  const [state, dispatch] = useContext(store);

  let location = useLocation();

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

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search).get('user');
    customAxios.get(`/user/${searchParams}`)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(error => console.log(error.response));
    customAxios.get(`/feed?userid=${searchParams}`)
      .then(res => {
        console.log(res.data);
        setFeed(res.data);
      })
      .catch(error => console.log(error.response));
  }, []);

  return (
    <>
      <Stack p={1} alignItems='center' spacing={1}>
        <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
        <Typography sx={{fontSize: '18px', fontWeight: 'bold'}}>
          {user.name}
        </Typography>
        <Typography variant='subtitle2'>
          재직분야 : {user.occupation ? user.occupation : '직종을 선택해주세요.'}
        </Typography>
        <Typography variant='subtitle2'>이메일 : {user.email}</Typography>
        <Typography variant='subtitle2'>
          follower : {user.followerCount} / follow : {user.followingCount}
        </Typography>
      </Stack>
      <Divider/>
      <Stack direction='row' sx={{marginBottom: '10px', width: '800px', margin: '0 auto', padding: '10px'}}>
        <Search>
          <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
          <StyledInputBase placeholder="피드 검색"/>
        </Search>
      </Stack>

      <Box sx={{overflow: 'overlay'}}>
        <FeedLine feed={feed} getFeedList={getFeedList}/>
      </Box>
    </>
  );
}
