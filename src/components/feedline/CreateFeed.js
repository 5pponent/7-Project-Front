import React, {useContext, useState} from 'react';
import customAxios from '../../AxiosProvider';
import {store} from '../../store/store';
import {
  Button,
  IconButton,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Tooltip,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SmallProfile from '../SmallProfile';

export default function CreateFeed(props) {
  const [state, dispatch] = useContext(store);
  const [scope, setScope] = useState('all');
  const [errorMessage, setErrormessage] = useState('');

  const validate = () => {
    let valid = true;
    if (!props.feedContent && props.feedImage.length === 0) {
      setErrormessage('내용 또는 사진을 입력해 주세요!');
      dispatch({type: 'CloseLoading'});
      valid = false;
    } else setErrormessage('')
    return valid;
  };

  const handleChangeScope = (e) => {
    setScope(e.target.value)
  };
  const closeDrawer = () => {
    props.getOpen(false)
  };
  const handleCreateFeed = async () => {
    if (validate()) {
      dispatch({type: 'OpenLoading', payload: '피드를 작성중입니다..'});
      const feedForm = new FormData();
      feedForm.append('content', props.feedContent);
      props.feedImage.map(item => feedForm.append('descriptions', item.description));
      props.feedImage.map(item => feedForm.append('images', item.file));
      feedForm.append('showScope', scope);
      await customAxios.post(`/feed`, feedForm)
        .then(res => {
          props.resetFeed();
          dispatch({type: 'OpenSnackbar', payload: '피드를 작성하였습니다.'});
          closeDrawer();
        })
        .catch(error => console.error(error.response))
        .finally(() => dispatch({type: 'CloseLoading'}));
    }
  };

  return (
    <Stack sx={{width: 400}}>
      <Stack direction="row" sx={{alignItems: "center", justifyContent: "space-between", p: 2, mx: 1}}>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>피드 작성</Typography>
        <IconButton onClick={closeDrawer}><CloseIcon/></IconButton>
      </Stack>

      <Divider/>

      <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center", pt: 2, mx:2}}>
      <SmallProfile
        image={state.user.image && state.user.image.source}
        name={state.user.name}
        direction='row'
        spacing={1}
      />

      <FormControl size="small">
        <InputLabel id="select-label">공개 범위</InputLabel>
        <Select labelId="select-label" value={scope} size="small" label="공개 범위" onChange={handleChangeScope}>
          <MenuItem value='all'>전체 공개</MenuItem>
          <MenuItem value='followers'>친구 공개</MenuItem>
          <MenuItem value='me'>나만 보기</MenuItem>
        </Select>
      </FormControl>
    </Stack>

  <Grid container spacing={2} p={2}>

    <Grid item xs={12}>
      <TextField fullWidth maxRows={10} multiline autoFocus error={!!errorMessage} helperText={errorMessage}
                 placeholder={'내용을 입력해 주세요.'} value={props.feedContent} onChange={props.handleChangeFeedContent}/>
    </Grid>

    <Grid item xs={12} sx={{display: props.feedImage.length === 0 ? 'none' : 'block'}}>
      <Stack spacing={3} sx={{p: 1, maxHeight: 550, overflow: 'auto'}}>
        {props.feedImage.map((item, index) => (
          <Card key={index} sx={{height: 300, overflow: 'visible'}}>
            <CardActions sx={{justifyContent: 'end', pb: 0}}>
              <DeleteRoundedIcon color={'action'} onClick={() => props.handleDeleteFeedImage(index)}
                                 sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
            </CardActions>

            <CardContent sx={{p: 0}}>
              <Grid container spacing={1}>
                <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', maxHeight: '240px'}}>
                  <img src={item.path} alt={item.originalName} width='100%' height='100%' style={{objectFit: 'contain'}}/>
                </Grid>
                <Grid item xs={6} style={{padding: 0}}
                      sx={{p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <TextField multiline rows={9} placeholder={'설명'} value={props.feedImage[index].description}
                             onChange={(e) => props.handleChangeDescription(e, index)} sx={{mt: 1, overflow: 'auto'}}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Grid>

    <Grid item xs={12} sx={{textAlign: 'end'}}>
      <Tooltip title={'사진 추가하기'} arrow>
        <label htmlFor="feedImage" onChange={props.handleAddFeedImage} onClick={e => e.target.value = null}>
          <input type="file" id="feedImage" multiple accept='image/*' style={{display: 'none'}}/>
          <AddPhotoAlternateRoundedIcon color="action" sx={{fontSize: 35, cursor: 'pointer'}}/>
        </label>
      </Tooltip>
    </Grid>

    <Grid item xs={12}>
      <Button variant='contained' fullWidth onClick={handleCreateFeed}>게시</Button>
    </Grid>
  </Grid>
</Stack>
)
  ;
}