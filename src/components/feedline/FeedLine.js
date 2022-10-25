import React, {useEffect} from 'react';
import {CircularProgress, Box, Stack} from '@mui/material';
import Feed from './Feed';

export default function FeedLine(props) {
  const {currentPage, feeds, totalElements, totalPages} = props.feed;

  const watch = () => window.addEventListener('scroll', props.handleScroll);
  useEffect(() => {
    watch();
    return () => window.removeEventListener('scroll', props.handleScroll);
  });

  return (
    <Stack spacing={3} sx={{width: "100%", maxWidth: 800}}>
      { feeds.map(f => {
        return (
          <Feed
            key={f.id}
            feed={f}
            image={f.writer.image && f.writer.image.source}
            feedList={feeds}
            updateFeedDetail={props.updateFeedDetail}
            getFeedList={props.getFeedList}
          />
        );
      })
      }
      { feeds.length === 0 &&
        <Box display="flex" justifyContent="center" style={{padding: 100}}>
          <CircularProgress size={60}></CircularProgress>
        </Box>
      }
      {currentPage < totalPages &&
        <Box display="flex" justifyContent="center" style={{padding: 100}}>
          <CircularProgress size={60}></CircularProgress>
        </Box>
      }
    </Stack>
  );
}