import {useEffect, useState} from 'react';
import { Divider, Stack } from '@mui/material';
import FeedLine from './FeedLine';
import customAxios from "../../AxiosProvider";

export default function FeedLineSelect(props) {
  const [feed, setFeed] = useState({
    currentPage: 0,
    feeds: [],
    totalElements: 0,
    totalPages: 0
  });

  const getFeedList = (data) => {setFeed({...feed, feeds: data})}
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
    }
  };

  useEffect(() => {
    customAxios.get(`/feed`)
      .then(res => setFeed(res.data))
      .catch(error => console.error(error.response))
  }, []);

  return (
    <Stack>
      <Stack spacing={1} width='900px' margin='0 auto' minWidth='800px'
        direction='row' divider={<Divider orientation='vertical' flexItem />}>
      </Stack>

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
