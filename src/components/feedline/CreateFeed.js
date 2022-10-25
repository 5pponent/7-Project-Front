import React, {useContext, useRef, useState} from 'react';
import customAxios from "../../AxiosProvider";
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
  const imageRef = useRef();

  const validate = () => {
    let valid = true;
    if (!state.feedContent && state.feedImage.length === 0) {
      setErrormessage('내용 또는 사진을 입력해 주세요!');
      dispatch({type: 'CloseLoading'});
      valid = false;
    } else setErrormessage('')
    return valid;
  };

  const handleChangeScope = (e) => {
    setScope(e.target.value)
  };
  const handleContentChange = (e) => {
    dispatch({type: 'CreateFeed', payload: e.target.value})
  };
  const closeDrawer = () => {
    props.getOpen(false)
  };
  const handleAddImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      dispatch({type: 'AddImage', payload: {file: e.target.files[i], originalName: e.target.files[i].name}})
    }
  };
  const handleChangeValue = (e, index) => {
    dispatch({type: 'AddDescription', payload: {index: index, description: e.target.value}});
  };
  const handleDeleteImage = (index) => {
    dispatch({type: 'DeleteImage', payload: index});
  };
  const handleCreateFeed = async () => {
    if (validate()) {
      dispatch({type: 'OpenLoading', payload: '피드를 작성중입니다..'});
      const feedForm = new FormData();
      feedForm.append('content', state.feedContent);
      state.feedImage.map(item => feedForm.append('descriptions', item.description));
      state.feedImage.map(item => feedForm.append('images', item.file));
      feedForm.append('showScope', scope);
      await customAxios.post(`/feed`, feedForm)
        .then(res => {
          closeDrawer();
          dispatch({type: 'ResetFeed'});
          dispatch({type: 'OpenSnackbar', payload: '피드를 작성하였습니다.'});
        })
        .catch(error => {
          console.error(error.response)
        })
        .finally(() => dispatch({type: 'CloseLoading'}));
    }
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
          <SmallProfile
            image={state.user.image && state.user.image.source}
            name={state.user.name}
            direction='row'
            spacing={1}
          />
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
          <TextField fullWidth maxRows={10} multiline autoFocus error={!!errorMessage} helperText={errorMessage}
                     placeholder={'내용을 입력해 주세요.'} value={state.feedContent} onChange={handleContentChange}/>
        </Grid>

        <Grid item xs={12} sx={{display: state.feedImage.length === 0 ? 'none' : 'block'}}>
          <Stack spacing={3} sx={{p: 1, maxHeight: 550, overflow: 'auto'}}>
            {state.feedImage.map((item, index) => (
              <Card sx={{height: 300, overflow: 'visible'}}>
                <CardActions sx={{justifyContent: 'end', pb: 0}}>
                  <DeleteRoundedIcon color={'action'} onClick={() => handleDeleteImage(index)}
                                     sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
                </CardActions>

                <CardContent sx={{p: 0}}>
                  <Grid container spacing={1} key={item.file}>
                    <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
                      <img src={URL.createObjectURL(item.file)} alt={item.originalName} width='100%'/>
                    </Grid>
                    <Grid item xs={6} style={{padding: 0}} sx={{p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <TextField multiline rows={9} placeholder={'설명'} value={state.feedImage[index].description}
                                 onChange={(e) => handleChangeValue(e, index)} sx={{mt: 1, overflow: 'auto'}}/>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{textAlign: 'end'}}>
          <Tooltip title={'사진 추가하기'} arrow>
            <label htmlFor="feedImage" ref={imageRef} onChange={handleAddImage} onClick={e => e.target.value = null}>
              <input type="file" id={"feedImage"} multiple accept={'image/*'} style={{display: 'none'}}/>
              <AddPhotoAlternateRoundedIcon color="action" sx={{fontSize: 35, cursor: 'pointer'}}/>
            </label>
          </Tooltip>
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' fullWidth onClick={handleCreateFeed}>게시</Button>
        </Grid>
      </Grid>
    </Stack>
  );
}