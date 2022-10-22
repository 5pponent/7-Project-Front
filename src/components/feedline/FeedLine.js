import React, {useEffect, useState} from 'react';
import {CircularProgress, Box, Stack, Typography} from '@mui/material';
import Feed from './Feed';
import customAxios from "../../AxiosProvider";

export default function FeedLine(props) {
  const {currentPage, feeds, totalElements, totalPages} = props.feed;

  const watch = () => window.addEventListener('scroll', props.handleScroll);
  useEffect(() => {
    watch();
    return () => window.removeEventListener('scroll', props.handleScroll);
  });

  return (
    <Stack spacing={3} py={3}>
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