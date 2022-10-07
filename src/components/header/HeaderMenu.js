import React, {useContext} from "react";
import {store} from "../../store/store";
import axios from 'axios';
import {IconButton, Menu, MenuItem, Tooltip} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '10px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 30,
        margin: '8px 0',
        color: theme.palette.text.secondary,
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const [state, dispatch] = useContext(store);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickChat = () => {
    dispatch({type: 'ChangeMode', payload: 'CHAT'})
  };
  const handleClickSchedule = () => {
    dispatch({type: 'ChangeMode', payload: 'SCHEDULE'})
  };
  const handleClickMessanger = () => {
    dispatch({type: 'ChangeMode', payload: 'MESSANGER'})
  };
  const handleClickSetting = () => {
    dispatch({type: 'ChangeMode', payload: 'SETTING'})
  };
  const handleClickLogout = () => {
    props.toggleLoading(true);
    axios.get("/auth/logout")
      .then(res => {
        dispatch({type: 'Logout'});
        dispatch({type: 'ChangeMode', payload: 'MAIN'})
        props.toggleLoading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {/* 메뉴 아이콘 */}
      <Tooltip title="메뉴" placement="bottom" arrow>
        <IconButton
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          variant="contained"
          color="inherit"
          disableElevation
          onClick={handleClick}
        >
          <MoreVertIcon sx={{fontSize: 30}}/>
        </IconButton>
      </Tooltip>

      {/* 메뉴, 리스트 */}
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Tooltip title="채팅" placement="left" arrow>
          <MenuItem onClick={handleClickChat} disableRipple><ChatIcon/></MenuItem>
        </Tooltip>

        <Tooltip title="스케쥴" placement="left" arrow>
          <MenuItem onClick={handleClickSchedule} disableRipple>
            <CalendarTodayIcon/>
          </MenuItem>
        </Tooltip>

        <Tooltip title="팔로우 / 팔로워" placement="left" arrow>
          <MenuItem onClick={handleClickMessanger} disableRipple>
            <PeopleAltIcon/>
          </MenuItem>
        </Tooltip>

        <Tooltip title="설정" placement="left" arrow>
          <MenuItem onClick={handleClickSetting} disableRipple>
            <SettingsIcon/>
          </MenuItem>
        </Tooltip>

        <Tooltip title="로그아웃" placement="left" arrow>
          <MenuItem onClick={handleClickLogout}>
            <LogoutIcon/>
          </MenuItem>
        </Tooltip>

        <Tooltip title="메뉴 닫기" placement="left" arrow>
          <MenuItem onClick={handleClose} disableRipple>
            <CloseIcon/>
          </MenuItem>
        </Tooltip>
      </StyledMenu>
    </>
  );
}
