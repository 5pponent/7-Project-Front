import React, {useEffect, useState} from 'react';
import {Stack} from '@mui/material';
import FeedLine from './FeedLine';
import customAxios from "../../AxiosProvider";

function FeedLineSelect(props) {
  const [feed, setFeed] = useState({
    currentPage: 0,
    feeds: [],
    totalElements: 0,
    totalPages: 0
  });

  const getFeedList = (data) => {setFeed({...feed, feeds: data})};
  const loadFeedList = (data) => {setFeed({...feed, currentPage: data.currentPage, feeds: feed.feeds.concat(data.feeds)})};
  const updateFeedDetail = (data) => {
    setFeed({
      ...feed,
      feeds: feed.feeds.map(item => {
        if (item.id === data.id) return data
        return item
      })})
  };
  const handleScroll = () => {
    const scroll = window.scrollY + document.documentElement.clientHeight;
    if (scroll === document.documentElement.scrollHeight) {
      customAxios.get(`/feed?page=${feed.currentPage + 1}`)
        .then(res => loadFeedList(res.data))
        .catch(error => console.error(error.response))
    }
  };

  useEffect(() => {
    customAxios.get(`/feed`)
      .then(res => setFeed(res.data))
      .catch(error => console.error(error.response))
  }, []);

  return (
    <Stack maxWidth={"800px"} mx={"auto"} px={1}>

      <FeedLine
        feed={feed}
        handleScroll={handleScroll}
        getFeedList={getFeedList}
        loadFeedList={loadFeedList}
        updateFeedDetail={updateFeedDetail}
      />

    </Stack>
  );
}

export default React.memo(FeedLineSelect)