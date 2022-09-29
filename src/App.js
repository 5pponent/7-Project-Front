import FeedLineSelect from './components/feedline/FeedLineSelect'
import Toolbar from '@mui/material/Toolbar';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/header/HeaderAppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import { Box } from '@mui/material';
import Setting from './components/settingpage/Setting';
import ChatApp from './components/chatting/ChatApp';
import ScheduleApp from './components/schedule/ScheduleApp';
import LoadingProcess from './components/LoadingProcess';
import FriendApp from './components/friend/FriendApp';

export default function App() {
  // 로그인한 유저 정보
  const [name, setName] = useState("사용자명");
  const [image, setImage] = useState("https://placeimg.com/100/100/people/00");
  const [email, setEmail] = useState("ahdwjdtprtm@gmail.com");
  const [id, setId] = useState("ahdwjdtprtm");
  const [job, setJob] = useState("직업");

  // 어플리케이션 관련 정보
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [mode, setMode] = useState('MAIN');
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  let content = null;

  // 하위 컴포넌트로부터 변경된 state를 얻기 위한 메소드
  const toggleLoading = (bool) => { setLoading(bool); };
  const getLogin = (stat) => { setLogin(stat); };
  const getMode = (mode) => { setMode(mode); };
  const getUser = (usr) => { setUser(usr); console.log(usr); };
  const getDarkMode = (dm) => { setDarkMode(dm); console.log(dm); };

  if ( mode === 'MAIN' ){ 
    content = <FeedLineSelect 
      userName={name} 
      userImg={image} 
      getMode={getMode}
      getUser={getUser}
    />
  }
  else if ( mode === 'PROFILE' ) {
    content = <Profile 
      userName={user[0]}
      userImg={user[1]}
      userEmail={user[2]}
      getMode={getMode}
      getUser={getUser}
    />
  }
  else if ( mode === 'CHAT' ) {
    content = <ChatApp
      userName={name}
      userImg={image}
      getMode={getMode}
    />
  }
  else if ( mode === 'SCHEDULE' ) {
    content = <ScheduleApp

    />
  }
  else if ( mode === 'FRIEND' ) {
    content = <FriendApp

    />
  }
  else if ( mode === 'SETTING' ) {
    content = <Setting
      name={name}
      id={id}
      email={email}
      getDarkMode={getDarkMode}
    />
  }
  else { content = null; }

  if ( login ){
    return (
      <Box>
        <Toolbar id="back-to-top-anchor" />

        <HeaderAppBar 
          name={name}
          image={image}
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
          setName={setName}
          setEmail={setEmail}
          setId={setId}
        />
        <LoadingProcess open={loading} />
      </>
    );
  }
}

