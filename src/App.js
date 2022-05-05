import FeedLineSelect from './components/Feedline/FeedLineSelect'
import Toolbar from '@mui/material/Toolbar';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/Header/HeaderAppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { Box } from '@mui/material';
import Setting from './components/SettingPage/Setting';

export default function App() {
  let name = "사용자명";
  let image = "https://placeimg.com/100/100/people/00";

  const [login, setLogin] = useState(false);
  const [mode, setMode] = useState('MAIN');
  const [user, setUser] = useState(null);
  let content = null;

  const getMode = (mode) => { setMode(mode); console.log(mode); };
  const getLogin = (stat) => { setLogin(stat); };
  const getUser = (usr) => { setUser(usr); console.log(usr); };

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
    />
  }
  else if ( mode === 'SETTING' ) {
    content = <Setting />
  }
  else { content = null; }

  if ( login ){
    return (
      <>
        <Toolbar id="back-to-top-anchor" />

        <HeaderAppBar 
          name={name} 
          image={image} 
          getMode={getMode} 
          getLogin={getLogin}
          getUser={getUser}
        />
        
        <Box sx={{ marginTop: 2 }}>
          {content}
        </Box>

        <ScrollTop><Fab size="large" color='primary'><KeyboardArrowUpIcon/></Fab></ScrollTop>
      </>
    );
  }
  else {
    return <Login getLogin={getLogin}></Login>
  }
}