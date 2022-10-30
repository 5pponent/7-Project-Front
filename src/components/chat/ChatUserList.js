import {Stack, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useRef, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {store} from "../../store/store";
import ChatProfile from "./ChatProfile";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChatUserList(props) {
  const [state, dispatch] = useContext(store);

  const [firstLoading, setFirstLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const handleChangeValue = (e) => {setSearchValue(e.target.value)}
  const handleClickProfile = (e, userId) => {
    props.changeSession(userId);
  }

  useEffect(() => {
    state.user.id !== 0 &&
    customAxios.get(`/user/${state.user.id}/following?page=1`)
      .then(res => {
        setFollowing(res.data.users);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      })
      .catch(err => {console.log(err.response)})
      .finally(() => {setFirstLoading(false)});
  }, [state.user.id]);

  return (
    <>
      <TextField
        label="유저 검색"
        size={"small"}
        value={searchValue}
        onChange={handleChangeValue}
      />

      <Stack sx={{
        height: '70vh', overflowY: 'auto', border: '1px solid #e0e0e0',
        wordBreak: 'break-all', alignItems: 'center'
      }}>
        {
          following.length > 0 ? following.map((it) => {
            return (
              <ChatProfile
                key={it.id}
                image={it.image ? it.image.source : ''}
                name={it.name}
                onClick={(e) => {handleClickProfile(e, it.id)}}
              />
            )
          })
          :
          (firstLoading ?
            <CircularProgress sx={{my: 10}}/>
            :
            <Typography>팔로우 중인 사람이 없습니다.</Typography>
          )
        }
      </Stack>
    </>
  );
}
