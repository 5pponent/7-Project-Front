import {useContext, useState} from 'react';
import {store} from "./store/store";
import {Box, Toolbar, Fab} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FeedLineSelect from './components/feedline/FeedLineSelect'
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/header/HeaderAppBar';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Setting from './components/settingpage/Setting';
import ChatApp from './components/chatting/ChatApp';
import ScheduleApp from './components/schedule/ScheduleApp';
import LoadingProcess from './components/LoadingProcess';
import FriendApp from './components/friend/FriendApp';

export default function App() {
  // 로그인한 유저 정보
  const [state, dispatch] = useContext(store);

  // 어플리케이션 관련 정보
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  let content;

  // 하위 컴포넌트로부터 변경된 state를 얻기 위한 메소드
  const toggleLoading = (bool) => {
    setLoading(bool);
  };
  const getUser = (usr) => {
    setUser(usr);
    console.log(usr);
  };
  const getDarkMode = (dm) => {
    setDarkMode(dm);
    console.log(dm);
  };

  if (state.mode === 'MAIN') {
    content = <FeedLineSelect
      getUser={getUser}
    />
  } else if (state.mode === 'PROFILE') {
    content = <Profile
      getUser={getUser}
    />
  } else if (state.mode === 'CHAT') {
    content = <ChatApp/>
  } else if (state.mode === 'SCHEDULE') {
    content = <ScheduleApp/>
  } else if (state.mode === 'FRIEND') {
    content = <FriendApp/>
  } else if (state.mode === 'SETTING') {
    content = <Setting getDarkMode={getDarkMode}/>
  } else {
    content = null;
  }

  if (state.login) {
    return (
      <Box>
        <Toolbar id="back-to-top-anchor"/>

        <HeaderAppBar
          getUser={getUser}
          toggleLoading={toggleLoading}
        />

        <Box sx={{marginTop: 2}}>
          {content}
        </Box>

        <ScrollTop>
          <Fab size="large" color='primary'>
            <KeyboardArrowUpIcon/>
          </Fab>
        </ScrollTop>
        <LoadingProcess open={loading}/>
      </Box>
    );
  } else {
    return (
      <>
        <Login toggleLoading={toggleLoading}/>
        <LoadingProcess open={loading}/>
      </>
    );
  }
}

