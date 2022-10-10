import {useContext, useState} from 'react';
import {store} from "../../store/store";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Toolbar,
  Typography,
  AppBar,
  ButtonBase,
  InputBase
} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import HeaderMenu from './HeaderMenu';
import SmallProfile from '../SmallProfile';
import CreateFeed from '../feedline/CreateFeed';
import MuiSwitch from '../MUISwitch';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
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
  },
}));

const Title = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 'bold',
}));

export default function Header(props) {
  const [state, dispatch] = useContext(store);

  const [open, setOpen] = useState(false);
  const getOpen = (stat) => {setOpen(stat)};
  const handleClickDrawer = () => {setOpen(!open)};
  const handleClickLogo = () => {dispatch({type: 'ChangeMode', payload: 'MAIN'})};
  const handleClickMyProfile = () => {
    dispatch({type: 'ChangeMode', payload: 'PROFILE'});
    props.getUser([state.user.name, state.user.image ? state.user.image.source : 'https://placeimg.com/100/100/people/00']);
  };

  return (
    <AppBar>
      <Toolbar sx={{bgcolor: '#2c92ff', color: 'white'}}>
        {/* 검색 */}
        <Box sx={{width: "300px", float: 'left'}}>
          <Search>
            <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
            <StyledInputBase placeholder="프로필 검색"/>
          </Search>
        </Box>

        {/* 타이틀 */}
        <Stack onClick={handleClickLogo} alignItems='center' sx={{cursor: 'pointer', width: '100%'}}>
          <MenuBookIcon sx={{fontSize: 55}}/>
          <Title>모두의 일기장</Title>
        </Stack>

        {/* 우측 메뉴 */}
        <Box
          sx={{display: 'flex', justifyContent: "flex-end", float: 'right', width: '300px'}}> {/* 우측 사용자 프로필, 더보기 메뉴 */}

          <MuiSwitch/>

          <Tooltip title="피드 작성" placement="bottom" arrow>
            <IconButton onClick={handleClickDrawer} sx={{marginRight: '5px'}}>
              <EditIcon sx={{color: 'white'}}></EditIcon>
            </IconButton>
          </Tooltip>

          <Drawer
            anchor='left'
            open={open}
            onClose={handleClickDrawer}
          >
            <CreateFeed
              getOpen={getOpen}
            />
          </Drawer>
          <Tooltip title="프로필" placement="bottom" arrow>
            <ButtonBase onClick={handleClickMyProfile} sx={{margin: '0 5px'}}>
              <SmallProfile/>
            </ButtonBase>
          </Tooltip>
          <HeaderMenu
            toggleLoading={props.toggleLoading}
          />
        </Box>

      </Toolbar>
    </AppBar>
  );
}
