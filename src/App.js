import FeedLineSelect from './components/feedline/FeedLineSelect'
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/Header/HeaderAppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Login from './components/Login/Login';

export default function App() {
  let name = "사용자명";
  let image = "https://placeimg.com/100/100/people/0";

  const [login, setLogin] = useState(false);
  const [mode, setMode] = useState('MAIN');
  let content = null;

  const getMode = (mode) => { setMode(mode); console.log(mode); };
  const getLogin = (stat) => { setLogin(stat); };

  if ( mode === 'MAIN' ){ content = <FeedLineSelect></FeedLineSelect> }
  else { content = null; }
  

  if ( login ){
    return (
      <>
        <CssBaseline /><Toolbar id="back-to-top-anchor" />

        <HeaderAppBar name={name} image={image} getMode={getMode} bgcolor="#2c92ff"/>
        
        {content}

        <ScrollTop><Fab size="large" color='primary'><KeyboardArrowUpIcon/></Fab></ScrollTop>
      </>
    );
  }
  else {
    return <Login getLogin={getLogin}></Login>
  }
}