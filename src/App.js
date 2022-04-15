import './App.css';
import FeedLine from './components/feedline/FeedLine';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ScrollTop from './components/ScrollTop';
import HeaderAppBar from './components/Header/HeaderAppBar';

export default function App() {
  const name = "사용자명";
  const image = "https://placeimg.com/100/100/people/0";

  return (
    <React.Fragment>
      <CssBaseline/>

      <HeaderAppBar name={name} image={image}/>
      <Toolbar id="back-to-top-anchor" />

      <Container> {/* 컨텐츠 영역 */}
        <FeedLine/>
      </Container>

      <ScrollTop></ScrollTop>
    </React.Fragment>
  );
}