import FeedLineSelect from './components/feedline/FeedLineSelect'
import Toolbar from '@mui/material/Toolbar';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/header/HeaderAppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createContext, useEffect, useState } from 'react';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import { Box } from '@mui/material';
import Setting from './components/settingpage/Setting';
import ChatApp from './components/chatting/ChatApp';
import ScheduleApp from './components/schedule/ScheduleApp';
import LoadingProcess from './components/LoadingProcess';
import axios from 'axios';

export default function App() {

  useEffect(() => {
    axios.get("/user")
      .then((response) => {
        setLogin(true);
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        setLogin(false);
        console.log(error.response.data);
      })
  }, []);

  // 로그인한 유저 정보
  const [userInfo, setUserInfo] = useState({
    id: null,
    name: "",
    email: "",
    followerCount: "",
    followingCount: "",
    occupation: "",
    interests: [],
    image: null
  });

  // 어플리케이션 관련 정보
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(null);
  const [mode, setMode] = useState('MAIN');
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // 보여질 페이지
  let content = null;

  // 하위 컴포넌트로부터 변경된 state를 얻기 위한 메소드
  const toggleLoading = (bool) => { setLoading(bool); };
  const getLogin = (stat) => { setLogin(stat); };
  const getMode = (mode) => { setMode(mode); };
  const getUser = (usr) => { setUser(usr); console.log(usr); };
  const getDarkMode = (dm) => { setDarkMode(dm); console.log(dm); };

  if ( mode === 'MAIN' ) { 
    content = <FeedLineSelect 
      userName={userInfo.name} 
      userImg={userInfo.image} 
      getMode={getMode}
      getUser={getUser}
    />
  }
  else if ( mode === 'PROFILE' ) {
    content = <Profile 
      userName={userInfo.name}
      userImg={userInfo.image}
      userEmail={userInfo.email}
      getMode={getMode}
      getUser={getUser}
    />
  }
  else if ( mode === 'CHAT' ) {
    content = <ChatApp
      userName={userInfo.name}
      userImg={userInfo.image}
      getMode={getMode}
    />
  }
  else if ( mode === 'SCHEDULE' ) {
    content = <ScheduleApp

    />
  }
  else if ( mode === 'SETTING' ) {
    content = <Setting
      name={userInfo.name}
      email={userInfo.email}
      getDarkMode={getDarkMode}
    />
  }
  else { content = null; }

  if ( login ){
    return (
      <Box>
        <Toolbar id="back-to-top-anchor" />

        <HeaderAppBar 
          name={userInfo.name}
          image={userInfo.image}
          getMode={getMode}
          getLogin={getLogin}
          getUser={getUser}
          toggleLoading={toggleLoading}
        />
        
        <Box sx={{ marginTop: 2 }}>
          {content}
        </Box>

        <ScrollTop><Fab size="large" color='primary'><KeyboardArrowUpIcon/></Fab></ScrollTop>
        <LoadingProcess open={loading} />
      </Box>
    );
  }
  else {
    return (
      <>
        <Login 
          getLogin={getLogin} 
          toggleLoading={toggleLoading} 
        />
        <LoadingProcess open={loading} />
      </>
    );
  }
}

