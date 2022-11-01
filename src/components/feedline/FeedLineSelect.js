import React, {useEffect, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {Box, Chip, Grid, Stack, styled} from '@mui/material';
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FeedLine from './FeedLine';
import NewFeedLine from "./newFeedLine";

export default function FeedLineSelect(props) {
  const [feed, setFeed] = useState({
    currentPage: 0,
    feeds: [],
    totalElements: 0,
    totalPages: 0
  });
  const [feedLine, setFeedLine] = useState([]);
  const [selectedFeedLine, setSelectedFeedLine] = useState({title: 'basic', id: 'basic'});
  const [occupationList, setOccupationList] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);

  useEffect(() => {
    if (selectedFeedLine.id === 'basic') {
      customAxios.get(`/feed`)
        .then(res => setFeed(res.data))
        .catch(error => console.error(error.response))
    } else {
      customAxios.get(`/feed?feedlineid=${selectedFeedLine.id}`)
        .then(res => setFeed(res.data))
        .catch(error => console.error(error.response))
    }
  }, [selectedFeedLine]);

  const handleScroll = () => {
    const scroll = window.scrollY + document.documentElement.clientHeight;
    if (scroll === document.documentElement.scrollHeight) {
      customAxios.get(`/feed?page=${feed.currentPage + 1}`)
        .then(res => loadFeedList(res.data))
        .catch(error => console.error(error.response))
    }
  };
  const getFeedList = (data) => {
    setFeed({...feed, feeds: data})
  };
  const loadFeedList = (data) => {
    setFeed({...feed, currentPage: data.currentPage, feeds: feed.feeds.concat(data.feeds)})
  };
  const updateFeedDetail = (data) => {
    setFeed({
      ...feed,
      feeds: feed.feeds.map(item => {
        if (item.id === data.id) return data
        return item
      })
    })
  };
  const handleAddFeedLine = () => {
    const newId = feedLine.length === 0 ? 0 : feedLine[feedLine.length - 1].id + 1;
    const newFeedLine = {title: '새 피드', id: newId};
    setFeedLine([...feedLine, newFeedLine]);
    setSelectedFeedLine(newFeedLine);

    customAxios.get(`/occupation`)
      .then(res => setOccupationList(res.data))
      .catch(error => console.error(error.response))
      .finally(() => setFeedLoading(false))
  };
  const handleDeleteFeedLine = (num, id) => {
    if (selectedFeedLine.id === id) {
      if (num === 0) {
        setSelectedFeedLine({title: 'basic', id: 'basic'});
      } else {
        setSelectedFeedLine(feedLine[num - 1]);
      }
    }
    const newFeedLine = feedLine.filter((item, index) => index !== num);
    setFeedLine(newFeedLine);
  };
  const handleClickFeedLine = (feedLine) => {
    setSelectedFeedLine(feedLine);
  };
  const handleGetOccupation = (occupation) => {
    setSelectedOccupation(occupation)
  };

  const FeedLineChip = styled(Chip)(({id}) => ({
    zIndex: 100,
    backgroundColor: selectedFeedLine.id === id ? '#FCFCFC' : 'action',
    border: selectedFeedLine.id === id ? '2px solid #DBE1EE' : 'none',
    borderBottom: 'none',
    borderRadius: '25px 5px 0px 0px',
    width: '100%',
    height: '40px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: selectedFeedLine.id === id ? '#FCFCFC' : 'lightgrey'
    }
  }));

  return (
    <Stack sx={{alignItems: 'center'}}>
      <Box sx={{width: '100%', bgcolor: 'white', position: 'fixed', pt: 3, zIndex: 10}}>
        <Grid maxWidth={"805px"} container sx={{m: 'auto'}}>
          <Grid item xs={3}>
            <FeedLineChip
              id={'basic'}
              label={'basic'}
              onClick={() => handleClickFeedLine({title: 'basic', id: 'basic'})}
              sx={{justifyContent: 'space-between'}}/>
          </Grid>

          {feedLine.map((item, index) => (
            <Grid key={index} item xs={3}>
              <FeedLineChip
                id={item.id}
                label={item.title}
                onClick={() => handleClickFeedLine(item)}
                onDelete={() => handleDeleteFeedLine(index, item.id)}
                sx={{justifyContent: 'space-between'}}/>
            </Grid>
          ))}

          {feedLine.length < 3 &&
            <Grid item xs={3}>
              <FeedLineChip
                icon={<AddRoundedIcon sx={{fontSize: 'xx-large'}}/>}
                onClick={handleAddFeedLine}/>
            </Grid>
          }
        </Grid>
      </Box>

      <Stack maxWidth={"800px"} sx={{mt: 9}}>
        {selectedFeedLine.title === '새 피드' ?
          <NewFeedLine
            occupationList={occupationList}
            feedLoading={feedLoading}
            selectedOccupation={selectedOccupation}
            handleGetOccupation={handleGetOccupation}/> :
          <FeedLine
            feed={feed}
            handleScroll={handleScroll}
            getFeedList={getFeedList}
            loadFeedList={loadFeedList}
            updateFeedDetail={updateFeedDetail}
          />
        }
      </Stack>
    </Stack>
  );
}