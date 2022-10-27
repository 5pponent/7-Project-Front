import React, {useContext, useEffect, useState} from 'react';
import {store} from "../../store/store";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Drawer,
  Grow,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import HeaderMenu from './HeaderMenu';
import CreateFeed from '../feedline/CreateFeed';
import {useNavigate} from "react-router-dom";
import customAxios from "../../AxiosProvider";
import SmallProfile from "../SmallProfile";

const Title = styled(Typography)(() => ({
  fontSize: '22px',
  fontWeight: 'bold',
  wordBreak: 'keep-all'
}));

export default function Header (props) {
  const [state, dispatch] = useContext(store);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState({
    currentPage: 0, totalPages: 0, totalElements: 0, users: []
  });
  const [searchUsers, setSearchUsers] = useState([]);

  const getOpen = (stat) => {setOpen(stat)};
  const handleClickDrawer = () => {setOpen(!open)};
  const handleClickLogo = () => {navigate('/')};
  const handleClickMyProfile = () => {navigate(`/profile?user=${state.user.id}`)};
  const handleClickProfile = (id) => {navigate(`/profile?user=${id}`)}
  const handleChangeSearchValue = (e) => {setSearchValue(e.target.value)}
  const handleClickClear = () => {setSearchValue('')}

  useEffect(() => {
    setAnchorEl(document.getElementById("search"));
    const lateSearch = setTimeout(function() {
      setSearchOpen(true);
      if (searchValue !== '') {
        setSearchLoading(true);
        customAxios.get(`/user?keyword=${searchValue}`)
          .then(res => {
            setSearchUsers(res.data.users);
            setSearchResult(res.data);
          })
          .catch(error => console.log(error.response))
          .finally(() => {setSearchLoading(false)});
      } else {
        setSearchOpen(false);
        setSearchUsers([]);
      }
    }, 1000);
    if (lateSearch > 0) clearTimeout(lateSearch - 1);
  }, [searchValue]);

  return (
    <AppBar style={{userSelect: 'none', position: 'sticky'}}>
      <Toolbar
        sx={{bgcolor: '#2c92ff', color: '#FCFCFC'}}
        style={{justifyContent: "space-evenly", alignItems: "center"}}
      >

        {/* 타이틀 */}
        <Box width={"200px"}>
          <ButtonBase onClick={handleClickLogo}>
            <MenuBookIcon sx={{fontSize: 44}}/>&nbsp;
            <Title>모두의 일기장</Title>
          </ButtonBase>
        </Box>

        <Stack direction={"row"} alignItems={"center"}>
          {/* 검색 */}
          <Box width="200px" id={"search"}>
            <OutlinedInput
              size={"small"}
              inputProps={{autoComplete: 'off'}}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)", color: "white", borderRadius: 30
              }}
              placeholder={"유저 검색"}
              value={searchValue}
              onChange={handleChangeSearchValue}
              startAdornment={<SearchIcon sx={{pr: 1}}/>}
              endAdornment={
                searchValue !== '' ?
                  <IconButton onClick={handleClickClear} sx={{color: "white"}}>
                    <CloseIcon/>
                  </IconButton> : ""
              }
            />
          </Box>

          {/* 사용자 프로필, 더보기 메뉴 */}
          <Stack width='200px' direction={"row"} spacing={1}
                 justifyContent={"flex-end"} alignItems={"center"}>

            <Tooltip title="피드 작성" placement="bottom" arrow>
              <IconButton onClick={handleClickDrawer}>
                <BorderColorIcon sx={{fontSize: 26, color: "#FCFCFC"}}/>
              </IconButton>
            </Tooltip>

            <Tooltip title="알림" placement="bottom" arrow>
              <IconButton>
                <NotificationsIcon sx={{fontSize: 26, color: "#FCFCFC"}} />
              </IconButton>
            </Tooltip>

            <Tooltip title="내 프로필" placement="bottom" arrow>
              <ButtonBase onClick={handleClickMyProfile}>
                <Avatar src={state.user.image ? state.user.image.source : ''}/>
              </ButtonBase>
            </Tooltip>

            <HeaderMenu/>

          </Stack>
        </Stack>

        <Drawer anchor='left' open={open} onClose={handleClickDrawer}>
          <CreateFeed getOpen={getOpen}/>
        </Drawer>

        {/*검색 결과*/}
        <Popper
          open={searchOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{borderRadius: 2}}>
                <Stack spacing={1} py={1} width={200}>
                  {searchLoading ?
                    <Typography variant={"subtitle2"} px={2}>검색 중입니다..</Typography>
                    :
                    (searchUsers.length > 0 ?
                      searchUsers.map((it) => {
                        return (
                          <MenuItem key={it.id} onClick={() => handleClickProfile(it.id)}>
                            <SmallProfile
                              direction={"row"}
                              spacing={2}
                              image={it.image ? it.image.source : ''}
                              name={it.name}
                            />
                          </MenuItem>
                        );
                      })
                      :
                      <Typography variant={"subtitle2"} px={2}>검색 결과가 없습니다.</Typography>
                    )
                  }
                </Stack>
              </Paper>
            </Grow>
          )}
        </Popper>

      </Toolbar>
    </AppBar>
  );
}