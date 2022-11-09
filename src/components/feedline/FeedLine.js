import React, {useEffect, useState} from 'react';
import {CircularProgress, Box, Stack} from '@mui/material';
import Feed from './Feed';

export default function FeedLine(props) {
  const {currentPage, feeds, totalPages} = props.feed;
  const [target, setTarget] = useState(null);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await props.handleScroll();
        observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target);
    }
    return () => observer && observer.unobserve(target);
  }, [target]);

  return (
    <Stack spacing={3} sx={{width: "100%", maxWidth: 800}} mb={3}>
      {feeds.map(f => {
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
      })}

      {currentPage < totalPages &&
        <Box ref={setTarget} sx={{position: 'absolute', bottom: 0, height: '100vh'}}></Box>
      }

      {feeds.length === 0 &&
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