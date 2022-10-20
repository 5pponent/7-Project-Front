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
  InputBase, Avatar
} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import HeaderMenu from './HeaderMenu';
import CreateFeed from '../feedline/CreateFeed';
import {useNavigate} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const Title = styled(Typography)(() => ({
  fontSize: '24px',
  fontWeight: 'bold',
}));

export default function Header(props) {
  const [state, dispatch] = useContext(store);

  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const getOpen = (stat) => {setOpen(stat)};
  const handleClickDrawer = () => {setOpen(!open)};
  const handleClickLogo = () => {
    navigate('/');
  };
  const handleClickMyProfile = () => {
    navigate(`/profile?user=${state.user.id}`);
  };

  return (
    <AppBar style={{userSelect: 'none', position: 'sticky'}}>
      <Toolbar
        sx={{bgcolor: '#2c92ff', color: 'white'}}
        style={{display: 'flex', justifyContent: 'space-between'}}
        disableGutters
      >

        {/* 검색 */}
        <FlexItem>
          <Search>
            <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
            <StyledInputBase placeholder="프로필 검색"/>
          </Search>
        </FlexItem>

        {/* 타이틀 */}
        <FlexItem>
          <ButtonBase onClick={handleClickLogo}>
            <MenuBookIcon sx={{fontSize: 50}}/>
            &nbsp;&nbsp;&nbsp;
            <Title>모두의 일기장</Title>
          </ButtonBase>
        </FlexItem>

        {/* 우측 메뉴 */}
        <FlexItem> {/* 우측 사용자 프로필, 더보기 메뉴 */}
          <Tooltip title="피드 작성" placement="bottom" arrow>
            <IconButton onClick={handleClickDrawer} sx={{marginRight: '5px'}}>
              <EditIcon sx={{color: 'white'}}></EditIcon>
            </IconButton>
          </Tooltip>

          <Drawer anchor='left' open={open} onClose={handleClickDrawer}>
            <CreateFeed getOpen={getOpen}/>
          </Drawer>

          <Tooltip title="프로필" placement="bottom" arrow>
            <ButtonBase onClick={handleClickMyProfile} sx={{margin: '0 5px'}}>
              <Avatar src={state.user.image ? state.user.image.source : ''}/>
            </ButtonBase>
          </Tooltip>

          <HeaderMenu/>
        </FlexItem>

      </Toolbar>
    </AppBar>
  );
}

const FlexItem = styled("div")(() => ({
  width: '250px',
  textAlign: 'center'
}));