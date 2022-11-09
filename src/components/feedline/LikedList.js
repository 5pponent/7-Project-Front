import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Grow, IconButton, Stack, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import SmallProfile from "../SmallProfile";
import {useNavigate} from "react-router-dom";

export default function LikedList(props) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(store);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    props.feedId &&
    customAxios.get(`/feed/${props.feedId}/like`)
      .then(res => setUserList(res.data))
      .catch(error => console.error(error.response))
  }, [props.feedId]);

  const handleClickProfileView = (userId) => {
    dispatch({type: 'CloseLikedList'});
    navigate(`/profile?user=${userId}`);
  };
  const changeFollow = (userId) => {
    const list = userList.map(item => (
      item.id === userId ? {...item, isFollowed: !item.isFollowed} : item
    ))
    setUserList(list)
  };
  const handleClickFollow = (userId, userName) => {
    customAxios.post(`/user/${userId}/follow`)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: `${userName}님을 팔로우합니다.`});
        changeFollow(userId);
      })
      .catch(err => console.log(err.response))
  };
  const handleClickUnfollow = (userId, userName) => {
    customAxios.delete(`/user/${userId}/follow`)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: `${userName}님을 더 이상 팔로우하지 않습니다.`});
        changeFollow(userId);
      })
      .catch(err => console.log(err.response))
  };

  return (
    <Grow in={state.likedList} sx={{minWidth: '300px', maxHeight: '400px', position: 'fixed', right: '10%', top: '10%', zIndex: 1200}}>
      <Card elevation={10}>
        <Stack direction='row' sx={{p: 2, pb: 0, justifyContent: 'space-between', alignItems: 'center'}}>
          <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
            <Typography variant='h6'>좋아요</Typography>
            <ThumbUpAltRoundedIcon color='primary'/>
          </Stack>

          <IconButton onClick={() => dispatch({type: 'CloseLikedList'})}>
            <CloseRoundedIcon sx={{color: '#817f7d'}}/>
          </IconButton>
        </Stack>

        <CardContent>
          <Stack spacing={1}>
            <Typography sx={{display: userList.length === 0 ? 'block' : 'none'}}>
              피드를 좋아하는 유저가 없습니다.
            </Typography>

            {userList.map(item => (
              <Stack direction='row' key={item.id} sx={{justifyContent: 'space-between'}}>
                <Box onClick={() => handleClickProfileView(item.id)}>
                  <SmallProfile
                    direction="row"
                    spacing={1}
                    image={item.image && item.image.source}
                    name={item.name}
                  />
                </Box>

                <Box sx={{display: state.user.id === item.id ? 'none' : 'inline'}}>
                  {item.isFollowed ?
                    <Button onClick={() => handleClickUnfollow(item.id, item.name)}> 팔로우 취소 </Button> :
                    <Button onClick={() => handleClickFollow(item.id, item.name)}> 팔로우 </Button>
                  }
                </Box>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grow>
  )
    ;
}