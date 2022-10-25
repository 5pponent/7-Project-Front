import {useContext, useState} from 'react';
import {store} from "../../store/store";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Drawer,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import {alpha, styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
  },
}));
const Title = styled(Typography)(() => ({
  fontSize: '22px',
  fontWeight: 'bold',
  wordBreak: 'keep-all'
}));

export default function Header(props) {
  const [state, dispatch] = useContext(store);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [feedContent, setFeedContent] = useState('');
  const [feedImage, setFeedImage] = useState([]);
  const [feedDescription, setFeedDescription] = useState([]);

  const getOpen = (stat) => {setOpen(stat)};
  const handleClickDrawer = () => {setOpen(!open)};
  const handleClickLogo = () => {navigate('/')};
  const handleClickMyProfile = () => {navigate(`/profile?user=${state.user.id}`)};
  const handleChangeFeedContent = (e) => {setFeedContent(e.target.value)};
  const handleAddFeedImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setFeedImage([...feedImage, {file: e.target.files[i], originalName: e.target.files[i].name}]);
      setFeedDescription([...feedDescription, '']);
    }
  };
  const handleChangeDescription = (e, num) => {
    const newDescription = feedDescription.map((item, index) => index === num ? e.target.value : item);
    setFeedDescription(newDescription);
  };
  const handleDeleteFeedImage = (num) => {
    setFeedImage(feedImage.filter((item, index) => index !== num));
    setFeedDescription(feedDescription.filter((item, index) => index !== num));
  };
  const resetFeed = () => {
    setFeedContent('');
    setFeedImage([]);
    setFeedDescription([]);
  };

  return (
    <AppBar style={{userSelect: 'none', position: 'sticky'}}>
      <Toolbar
        sx={{bgcolor: '#2c92ff', color: '#FCFCFC'}}
        style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
      >

        {/* 검색 */}
        <Box width="200px">
          <Search>
            <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
            <StyledInputBase placeholder="유저 검색"/>
          </Search>
        </Box>

        {/* 타이틀 */}
        <Box width={"200px"}>
          <ButtonBase onClick={handleClickLogo}>
            <MenuBookIcon sx={{fontSize: 44}}/>&nbsp;
            <Title>모두의 일기장</Title>
          </ButtonBase>
        </Box>

        {/* 사용자 프로필, 더보기 메뉴 */}
        <Stack width='200px' direction={"row"} spacing={1}
               justifyContent={"flex-end"} alignItems={"center"}
        >

          <Tooltip title="피드 작성" placement="bottom" arrow>
            <IconButton onClick={handleClickDrawer}>
              <BorderColorIcon sx={{fontSize: 26, color: "#FCFCFC"}}/>
            </IconButton>
          </Tooltip>

          <Drawer anchor='left' open={open} onClose={handleClickDrawer}>
            <CreateFeed
              getOpen={getOpen}
              feedContent={feedContent}
              feedImage={feedImage}
              feedDescription={feedDescription}
              handleChangeFeedContent={handleChangeFeedContent}
              handleAddFeedImage={handleAddFeedImage}
              handleChangeDescription={handleChangeDescription}
              handleDeleteFeedImage={handleDeleteFeedImage}
              resetFeed={resetFeed}/>
          </Drawer>

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
      </Toolbar>
    </AppBar>
  );
}