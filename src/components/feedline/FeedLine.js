import React, {useEffect} from 'react';
import {CircularProgress, Box} from '@mui/material';
import Feed from './Feed';

export default function FeedLine(props) {

  const {currentPage, feeds, totalElements, totalPages} = props.feed;

  return (
    <>
      <Box sx={{bgcolor: '#e7ebf0', minWidth: 800, width: 900, margin: '0 auto', paddingTop: '3px'}}>
        {
          feeds ? feeds.map(f => {
              return (
                <Feed
                  key={f.id}
                  feed={f}
                  image={f.writer.image ? f.writer.image.source : 'https://placeimg.com/100/100/people/00'}
                  getUser={props.getUser}
                  feedList={feeds}
                  getFeedList={props.getFeedList}
                />
              );
            }) :
            <Box display="flex" justifyContent="center" style={{padding: 50}}>
              <CircularProgress size={60}></CircularProgress>
            </Box>
        }
        <Box display="flex" justifyContent="center" style={{padding: 50}}>
          <CircularProgress size={60}></CircularProgress>
        </Box>
      </Box>
    </>
  );
}