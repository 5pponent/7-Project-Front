import React, {useEffect, useState} from 'react';
import {CircularProgress, Box} from '@mui/material';
import Feed from './Feed';

export default function FeedLine(props) {

  const {currentPage, feeds, totalElements, totalPages} = props.feed;

  return (
    <>
      <Box sx={{minWidth: 800, width: 800, margin: '0 auto'}}>
        {
          feeds ? feeds.map(f => {
              return (
                <Feed
                  key={f.id}
                  feed={f}
                  image={f.writer.image && f.writer.image.source}
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