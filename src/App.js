import FeedLineSelect from './components/feedline/FeedLineSelect'
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/Header/HeaderAppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';


export default function App() {
  const name = "사용자명";
  const image = "https://placeimg.com/100/100/people/0";

  const [mode, setMode] = useState('MAIN');
  let content = null;

  // 컨텐츠 페이지 제어를 위한 함수, 자식 컴포넌트에게 물려주어 mode의 변경을 체크
  const getMode = (mode) => { setMode(mode); }

  if ( mode === 'MAIN' ){ content = <FeedLineSelect></FeedLineSelect> }
  else { content = null; }
  
  return (
    <>
      <CssBaseline /><Toolbar id="back-to-top-anchor" />

      <HeaderAppBar name={name} image={image} getMode={getMode}/>
      
      {/* 컨텐츠 영역 */}
      {content}

      <ScrollTop><Fab size="large"><KeyboardArrowUpIcon/></Fab></ScrollTop>
    </>
  );
}