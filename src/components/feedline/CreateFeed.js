import {useContext, useRef, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {store} from '../../store/store';
import {
  Button,
  ButtonBase,
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
  ImageList,
  ImageListItem,
  styled, Tooltip, Dialog, DialogContent, DialogTitle, DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import SmallProfile from '../SmallProfile';
import FeedImageModifyDialog from "./FeedImageModifyDialog";
import LoadingProcess from "../LoadingProcess";

export default function CreateFeed(props) {
  const [state, dispatch] = useContext(store);

  const [loading, setLoading] = useState(false);
  const [scope, setScope] = useState('all');
  const [open, setOpen] = useState(false);
  const imageRef = useRef();

  const ImageButton = styled(ButtonBase)(() => ({
    position: 'relative',
    width: '100%',
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.8
      }
    }
  }));
  const ImageCover  = styled('span')(({theme}) => ({
    width: '100%',
    transition: theme.transitions.create('opacity')
  }));

  const handleChangeScope = (e) => {setScope(e.target.value)};
  const handleContentChange = (e) => {dispatch({type: 'CreateFeed', payload: e.target.value})};
  const closeDrawer = () => {props.getOpen(false)};
  const closeImageModify = () => {setOpen(false)};
  const handleAddImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      dispatch({type: 'AddImage', payload: {file: e.target.files[i], originalName: e.target.files[i].name}})
    }
  };
  const handleModifyImage = () => {setOpen(open => !open)};
  const handleCreateFeed = async () => {
    setLoading(true);
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
        console.log(res)
      })
      .catch(error => {console.error(error.response)})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <LoadingProcess open={loading} message={'피드를 작성중입니다..'}/>
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
            <TextField fullWidth maxRows={10} multiline placeholder={'내용을 입력해 주세요.'} value={state.feedContent}
                       onChange={handleContentChange}/>
          </Grid>

          <Grid item xs={12} sx={{display: state.feedImage.length === 0 ? 'none' : 'block'}}>
            <ImageButton onClick={handleModifyImage}>
              <ImageCover className="MuiImageBackdrop-root">
                <ImageList cols={2} sx={{maxHeight: 400}}>
                  {state.feedImage.map(item => (
                    <ImageListItem key={item.file} cols={1} rows={1}>
                      <img src={URL.createObjectURL(item.file)} alt={item.originalName} style={{objectFit: 'cover'}}/>
                    </ImageListItem>
                  ))}
                </ImageList>
              </ImageCover>
            </ImageButton>
          </Grid>

          <Grid item xs={12} sx={{textAlign: 'end'}}>
            <Tooltip title={'사진 추가하기'} arrow>
              <label htmlFor="feedImage" ref={imageRef} onChange={handleAddImage}>
                <input type="file" id={"feedImage"} multiple style={{display: 'none'}}/>
                <AddPhotoAlternateRoundedIcon color="action" sx={{fontSize: 35, cursor: 'pointer'}}/>
              </label>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' fullWidth onClick={handleCreateFeed}>게시</Button>
          </Grid>
        </Grid>
      </Stack>

      {/* 이미지 수정 다이얼로그 */}
      <Dialog open={open} onClose={closeImageModify}>
        <DialogTitle>
          <Typography sx={{fontSize: 25, fontWeight: 'bold'}}>사진</Typography>
        </DialogTitle>
        
        <DialogContent sx={{backgroundColor: 'lightgrey', p:1}}>
          <FeedImageModifyDialog/>
        </DialogContent>
        
        <DialogActions>
          <Button variant='contained' onClick={() => imageRef.current?.click()}>사진 추가</Button>
          <Button variant='contained' onClick={closeImageModify}>완료</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}