import React, {useContext, useEffect, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {store} from "../../store/store";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select, Stack,
  TextField,
  Tooltip
} from "@mui/material";
import SmallProfile from "../SmallProfile";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

export default React.memo(function ModifyFeed(props) {
  const [, dispatch] = useContext(store);
  const {content, files, id, writer} = props.feedDetail;

  const [scope, setScope] = useState('all');
  const [errorMessage, setErrormessage] = useState('');
  const [feed, setFeed] = useState({
    content: '',
    image: []
  });
  const [originImage, setOriginImage] = useState([]);

  useEffect(() => {
    // setScope(서버에서 내려주는 scope)
    setFeed({...feed, content: content});
    setOriginImage(files);
  }, []);

  const validate = () => {
    let valid = true;
    if (!feed.content && feed.image.length + originImage.length === 0) {
      setErrormessage('내용 또는 사진을 입력해 주세요!');
      dispatch({type: 'CloseLoading'});
      valid = false;
    } else setErrormessage('')
    return valid;
  };

  const handleChangeScope = (e) => setScope(e.target.value);
  const handleChangeFeedContent = (e) => setFeed({...feed, content: e.target.value});
  const handleDeleteFeedImage = (num) => {
    URL.revokeObjectURL(feed.image[num].path);
    const newFeedImage = feed.image.filter((item, index) => index !== num);
    setFeed({...feed, image: newFeedImage});
  };
  const handleChangeDescription = (e, num) => {
    const newDescription = feed.image.map((item, index) =>
      index === num ? {...item, description: e.target.value} : item);
    setFeed({...feed, image: newDescription});
  };
  const handleAddFeedImage = (e) => {
    let newImage = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newImage = newImage.concat({file: e.target.files[i], originalName: e.target.files[i].name, path: URL.createObjectURL(e.target.files[i]), description: ''})
    }
    setFeed({...feed, image: newImage});
  };
  const handleCreateFeed = async (feedId) => {
    if (validate()) {
      dispatch({type: 'OpenLoading', payload: '피드를 작성중입니다..'});
      const feedForm = new FormData();
      feedForm.append('content', feed.content);
      feed.image.map(item => feedForm.append('descriptions', item.description));
      feed.image.map(item => feedForm.append('images', item.file));
      feedForm.append('showScope', scope);
      await customAxios.patch(`/feed/${feedId}`, feedForm)
        .then(res => {
          props.closeModify && props.closeModify();
          setFeed({content: '', image: []});
          dispatch({typSe: 'OpenSnackbar', payload: '피드를 작성하였습니다.'});
        })
        .catch(error => console.error(error.response))
        .finally(() => dispatch({type: 'CloseLoading'}));
    }
  };

  return (
    <Grid container spacing={2} p={2}>

      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <SmallProfile
            direction="row"
            spacing={1}
            image={writer.image && writer.image.source}
            name={writer.name}
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
      </Grid>

      <Grid item xs={12}>
        <TextField fullWidth rows={6} multiline autoFocus error={!!errorMessage} helperText={errorMessage}
                   onChange={handleChangeFeedContent} value={feed.content} placeholder={'내용을 입력해 주세요.'} sx={{overflow: 'auto'}}/>
      </Grid>

      <Grid item xs={12} sx={{textAlign: 'end'}}>
        <Tooltip title='사진 추가하기' arrow>
          <label htmlFor="modifyImage" onChange={handleAddFeedImage} onClick={e => e.target.value = null}>
            <input type="file" id="modifyImage" multiple accept='image/*' style={{display: 'none'}}/>
            <AddPhotoAlternateRoundedIcon color="action" sx={{fontSize: 35, cursor: 'pointer'}}/>
          </label>
        </Tooltip>
      </Grid>

      {/* 기존 이미지 */}
      <Grid item xs={12} sx={{display: originImage.length + feed.image.length === 0 ? 'none' : 'block'}}>
        <Grid container spacing={2} colums={2} sx={{p: 1, maxHeight: 400, overflow: 'auto'}}>
          {originImage.map((item, index) => (
            <Grid item xs={6}>
              <Card key={item.id} sx={{height: 300, position: 'relative'}}>
                <CardActions sx={{justifyContent: 'end', pb: 0, position: 'absolute', right: 0}}>
                  <DeleteRoundedIcon color={'action'} sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
                </CardActions>

                <CardContent style={{height: '100%'}}>
                  <Grid container spacing={1} sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Grid item sx={{flex: 0.7, display: 'flex', alignItems: 'center'}}>
                      <img src={item.source} alt={item.originalName} width='100%' height='100%'
                           style={{objectFit: 'contain', maxHeight: '200px'}}/>
                    </Grid>
                    <Grid item style={{padding: 0}} sx={{flex: 0.2, width: '100%'}}>
                      <TextField multiline fullWidth rows={1} placeholder='설명' value={item.description}
                                 sx={{mt: 1, overflow: 'auto'}}/>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* 추가한 이미지 */}
          {feed.image.map((item, index) => (
            <Grid item xs={6}>
              <Card key={index} sx={{height: 300, position: 'relative'}}>
                <CardActions sx={{justifyContent: 'end', pb: 0, position: 'absolute', right: 0}}>
                  <DeleteRoundedIcon onClick={() => handleDeleteFeedImage(index)} color='action' sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
                </CardActions>

                <CardContent style={{height: '100%'}}>
                  <Grid container spacing={1} sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Grid item sx={{flex: 0.7, display: 'flex', alignItems: 'center'}}>
                      <img src={item.path} alt={item.originalName} width='100%' height='100%' style={{objectFit: 'contain', maxHeight: '200px'}}/>
                    </Grid>
                    <Grid item style={{padding: 0}} sx={{flex: 0.2, width: '100%'}}>
                      <TextField onClick={e => handleChangeDescription(e, index) } placeholder='설명' value={item.description}
                                 multiline fullWidth rows={1} sx={{mt: 1, overflow: 'auto'}}/>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
})