import './App.css';
import FeedLineSelect from './components/feedline/FeedLineSelect'
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/Header/HeaderAppBar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function App() {
  const name = "사용자명";
  const image = "https://placeimg.com/100/100/people/0";
  
  return (
    <React.Fragment>
      <CssBaseline/>

      <HeaderAppBar name={name} image={image}/>
      <Toolbar id="back-to-top-anchor" />

      <Container> {/* 컨텐츠 영역 */}
        <FeedLineSelect></FeedLineSelect>
      </Container>

      <ScrollTop>
        <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}