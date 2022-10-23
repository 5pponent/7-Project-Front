import {Box, Button, Divider, List, ListItem, Stack, Typography} from "@mui/material";
import {useContext, useEffect, useState} from 'react';
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import SmallProfile from "../SmallProfile";
import CircularProgress from "@mui/material/CircularProgress";

export default function FollowList(props) {
  const [state, dispatch] = useContext(store);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [firstLoading, setFirstLoading] = useState(true);

  const handleClickUnfollow = (id, name) => {
    customAxios.delete(`/user/${id}/follow`)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: `${name}님을 더 이상 팔로우하지 않습니다.`});
        setUserList(userList.filter((user) => user.id !== id));
        props.reloadUser();
      })
      .catch(err => {console.log(err.response)});
  }

  const watch = () => window.addEventListener('scroll', handleScroll);
  useEffect(() => {
    watch();
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    const scroll = window.scrollY + document.documentElement.clientHeight + 300;
    if (scroll === document.documentElement.scrollHeight) {
      customAxios.get(`/user/${props.user}/${props.mode === 'FOLLOWERS' ? 'follower' : 'following'}?page=${currentPage + 1}`)
        .then(res => {
          setUserList(userList.concat(res.data.users));
          setCurrentPage(res.data.currentPage);
        })
        .catch(error => console.error(error.response))
    }
  };

  useEffect(() => {
    console.log(state.user.id);
    customAxios.get(`/user/${props.user}/${props.mode === 'FOLLOWERS' ? 'follower' : 'following'}`)
      .then(res => {
        setUserList(res.data.users);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setFirstLoading(false);
      })
      .catch(err => {console.log(err.response)})
      .finally(() => {});
  }, []);

  return (
    <Box mt={3} boxShadow={3} borderRadius={2}>
      <Stack p={3}>
        <Typography variant={"h6"}>
          {props.mode === 'FOLLOWERS' ? "팔로워 목록" : "팔로우 중인 유저 목록"}
        </Typography>
      </Stack>

      <Divider/>

      <Stack p={3} spacing={2}>
        {userList.length > 0 ?
          userList.map((it) => {
            return(
              <>
                <Stack
                  key={it.id}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <SmallProfile
                    direction={"row"}
                    spacing={1}
                    image={it.image && it.image.source}
                    name={it.name}
                  />
                  {(props.mode === 'FOLLOWING' && props.isMe) &&
                    <Button onClick={() => {handleClickUnfollow(it.id, it.name)}}>
                      팔로우 취소
                    </Button>
                  }
                </Stack>
                <Divider/>
              </>
            );
          })
          : firstLoading ?
            <Stack alignItems={"center"} p={30} spacing={3}>
              <CircularProgress size={50}/>
            </Stack>
            :
            <Stack alignItems={"center"} p={30} spacing={3}>
              <Typography variant={"h6"}>
                {props.mode === 'FOLLOWERS' ? "팔로워가 없습니다." : "팔로우중인 유저가 없습니다."}
              </Typography>
            </Stack>
        }
      </Stack>
    </Box>
  );
}