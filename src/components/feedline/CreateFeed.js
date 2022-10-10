import {useContext, useState} from 'react';
import {store} from '../../store/store';
import axios from 'axios';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmallProfile from '../SmallProfile';

export default function CreateFeed(props) {
  const [state, dispatch] = useContext(store);

  const [scope, setScope] = useState('all');

  const handleChangeScope = (e) => {setScope(e.target.value)};
  const handleContentChange = (e) => {dispatch({type: 'CreateFeed', payload: e.target.value})};
  const closeDrawer = () => {props.getOpen(false)};
  const handleCreateFeed = async () => {
    const feedForm = new FormData();
    feedForm.append('content', state.feedContent.content);
    state.feedContent.image.map(item => feedForm.append('descriptions', item.description));
    state.feedContent.image.map(item => feedForm.append('images', item.file));
    feedForm.append('showScope', scope);

    await axios.post(`/feed`, feedForm)
      .then(res => {
        closeDrawer();
        dispatch({type: 'CreateFeed', payload: ''});
      })
      .catch(error => console.error(error.response))
  };

  return (
    <Stack sx={{width: '500px'}}>
      <Grid container>
        <Grid item xs={10.5} p={2}>
          <Typography variant="h5" sx={{fontWeight: 'bold'}}>피드 작성</Typography>
        </Grid>
        <Grid item xs={1.5} p={1.5}>
          <IconButton onClick={closeDrawer}><CloseIcon/></IconButton>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container spacing={2} p={2}>
        <Grid item xs={3}>
          <SmallProfile name={state.user.name} direction='row' spacing={1}/>
        </Grid>
        <Grid item xs={5.7}/>
        <Grid item xs={3.3}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label">공개 범위</InputLabel>
            <Select labelId="select-label" value={scope} size="small" label="공개 범위" onChange={handleChangeScope}>
              <MenuItem value={'me'}>나만 보기</MenuItem>
              <MenuItem value={'followers'}>친구 공개</MenuItem>
              <MenuItem value={'all'}>전체 공개</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth rows={10} multiline value={state.feedContent.content} onChange={handleContentChange}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' fullWidth onClick={handleCreateFeed}>게시</Button>
        </Grid>
      </Grid>
    </Stack>
  );
}