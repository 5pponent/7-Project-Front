import React, {useContext, useEffect, useState} from 'react';
import customAxios from "../../AxiosProvider";
import {store} from "../../store/store";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import SmallProfile from "../SmallProfile";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

export default React.memo(function ModifyFeed(props) {
  const [, dispatch] = useContext(store);
  const {content, files, id, showScope, writer} = props.feedDetail;

  const [scope, setScope] = useState('');
  const [errorMessage, setErrormessage] = useState('');
  const [feed, setFeed] = useState({
    content: '',
    image: [],
    description: []
  });
  const [originImage, setOriginImage] = useState([]);
  const [newImage, setNewImage] = useState([]);

  useEffect(() => {
    const imageId = files.map(item => item.id);
    const imageDesc = files.map(item => item.description);
    setFeed({content: content, image: imageId, description: imageDesc});
    setScope(showScope)
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
    URL.revokeObjectURL(newImage[num].path);
    setNewImage(newImage.filter((item, index) => index !== num));
  };
  const handleDeleteOriginFeedImage = (num) => {
    setOriginImage(originImage.filter((item, index) => index !== num));
    setFeed({
      ...feed,
      image: feed.image.filter((item, index) => index !== num),
      description: feed.description.filter((item, index) => index !== num)
    });
  };
  const handleChangeDescription = (e, num) => {
    setFeed({
      ...feed,
      description: feed.description.map((item, index) => index === num + originImage.length ? e.target.value : item)
    });
  };
  const handleChangeOriginDescription = (e, num) => {
    setFeed({
      ...feed,
      description: feed.description.map((item, index) => index === num ? e.target.value : item)
    });
  };
  const handleAddFeedImage = (e) => {
    let newImages = [];
    let newDesc = feed.description;
    for (let i = 0; i < e.target.files.length; i++) {
      newImages = newImages.concat({
        file: e.target.files[i],
        originalName: e.target.files[i].name,
        path: URL.createObjectURL(e.target.files[i])
      });
      newDesc = newDesc.concat('');
    }
    setNewImage(newImages);
    setFeed({...feed, description: newDesc});
  };
  const putFeed = async (feedId) => {
    const feedForm = {
      content: feed.content,
      descriptions: feed.description,
      images: feed.image,
      showScope: scope
    };

    await customAxios.put(`/feed/${feedId}`, feedForm)
      .then(res => {
        props.closeModify();
        dispatch({typSe: 'OpenSnackbar', payload: '피드를 수정하였습니다.'});
        props.modifyFeedDetail(res.data);
      })
      .catch(error => console.error(error))
      .finally(() => dispatch({type: 'CloseLoading'}));
  };
  const handleModifyFeed = async (feedId) => {
    dispatch({type: 'OpenLoading', payload: '피드를 수정중입니다..'});

    if (newImage.length > 0) {
      const imageForm = new FormData();
      newImage.map(item => imageForm.append('files', item.file));

      let imageId = feed.image;
      if (validate()) {
        await customAxios.post(`/upload`, imageForm)
          .then(res => {
            res.data.map(item => imageId.push(item.id));
            setFeed({...feed, image: imageId});
            putFeed(feedId);
          })
          .catch(error => console.log(error.response))
          .finally(() => dispatch({type: 'CloseLoading'}));
      }
    } else await putFeed(feedId);
  };

  return (
    <Grid container spacing={2} sx={{justifyContent: 'center', pt: 5, pb: 5, pr: 3, pl: 3}}>
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
                   onChange={handleChangeFeedContent} value={feed.content} placeholder={'내용을 입력해 주세요.'}
                   sx={{overflow: 'auto'}}/>
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
            <Grid key={item.id} item xs={6}>
              <Card sx={{height: 300, position: 'relative'}}>
                <CardActions sx={{justifyContent: 'end', pb: 0, position: 'absolute', right: 0}}>
                  <DeleteRoundedIcon onClick={() => handleDeleteOriginFeedImage(index)} color={'action'}
                                     sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
                </CardActions>

                <CardContent style={{height: '100%'}}>
                  <Grid container spacing={1}
                        sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Grid item sx={{flex: 0.7, display: 'flex', alignItems: 'center'}}>
                      <img src={item.source} alt={item.originalName} width='100%' height='100%'
                           style={{objectFit: 'contain', maxHeight: '200px'}}/>
                    </Grid>
                    <Grid item style={{padding: 0}} sx={{flex: 0.2, width: '100%'}}>
                      <TextField placeholder='설명' value={feed.description[index]}
                                 onChange={(e) => handleChangeOriginDescription(e, index)}
                                 multiline fullWidth rows={1} sx={{mt: 1, overflow: 'auto'}}/>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* 추가한 이미지 */}
          {newImage.map((item, index) => (
            <Grid key={index} item xs={6}>
              <Card sx={{height: 300, position: 'relative'}}>
                <CardActions sx={{justifyContent: 'end', pb: 0, position: 'absolute', right: 0}}>
                  <DeleteRoundedIcon onClick={() => handleDeleteFeedImage(index)} color='action'
                                     sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
                </CardActions>

                <CardContent style={{height: '100%'}}>
                  <Grid container spacing={1}
                        sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Grid item sx={{flex: 0.7, display: 'flex', alignItems: 'center'}}>
                      <img src={item.path} alt={item.originalName} width='100%' height='100%'
                           style={{objectFit: 'contain', maxHeight: '200px'}}/>
                    </Grid>
                    <Grid item style={{padding: 0}} sx={{flex: 0.2, width: '100%'}}>
                      <TextField onChange={e => handleChangeDescription(e, index)} placeholder='설명'
                                 value={feed.description[originImage.length + index]}
                                 multiline fullWidth rows={1} sx={{mt: 1, overflow: 'auto'}}/>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Stack spacing={1} direction='row' sx={{justifyContent: 'center'}}>
        <Button variant='contained' onClick={() => handleModifyFeed(id)}>수정</Button>
        <Button variant='contained' onClick={props.closeModify}>취소</Button>
      </Stack>
    </Grid>
  )
})