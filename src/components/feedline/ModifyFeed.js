import React, {useContext, useEffect, useState} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import SmallProfile from "../SmallProfile";
import ModifyFeedImage from "./ModifyFeedImage";

export default React.memo(function ModifyFeed(props) {
  const [, dispatch] = useContext(store);

  const {content, files, id, showScope, writer} = props.feedDetail;

  const [move, setMove] = useState({target: null, item: null});
  const [scope, setScope] = useState('');
  const [errorMessage, setErrormessage] = useState('');
  const [feed, setFeed] = useState('');
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState([]);

  useEffect(() => {
    setFeed(content);
    setScope(showScope)
    setImage(files);
  }, []);
  useEffect(() => {
    if (move.target) {
      let newImage = [...image];
      const index = newImage.findIndex(value => value === move.item);
      newImage.splice(index, 1);
      newImage.splice(move.target, 0, move.item);
      setImage(newImage);
    }
  }, [move.target]);

  const validate = () => {
    let valid = true;
    if (!feed && image.length === 0) {
      setErrormessage('내용 또는 사진을 입력해 주세요!');
      dispatch({type: 'CloseLoading'});
      valid = false;
    } else setErrormessage('')
    return valid;
  };

  const handleMoveImage = (target, item) => {
    setMove({target: target, item: item});
  };
  const handleChangeScope = (e) => setScope(e.target.value);
  const handleChangeFeedContent = (e) => {
    setFeed(e.target.value);
  };
  const handleDeleteFeedImage = (num) => {
    URL.revokeObjectURL(image[num].source);
    setImage(image.filter((item, index) => index !== num));
    const imageList = newImage.filter(item => item !== image[num].file);
    setNewImage(imageList);
  };
  const handleChangeDescription = (e, num) => {
    const newImage = image.map((item, index) => index === num ? {...item, description: e.target.value} : item)
    setImage(newImage);
  };
  const handleAddFeedImage = (e) => {
    let images = [...image];
    let newImages = [...newImage];
    for (let i = 0; i < e.target.files.length; i++) {
      images = images.concat({
        file: e.target.files[i],
        originalName: e.target.files[i].name,
        source: URL.createObjectURL(e.target.files[i]),
        description: ' '
      });
      newImages = newImages.concat(e.target.files[i]);
    }
    setImage(images);
    setNewImage(newImages);
  };
  const putFeed = async (feedId, imageList) => {
    const imageId = imageList.map(item => item.id)
    const descriptions = imageList.map(item => item.description);
    const feedForm = {
      content: feed,
      descriptions: descriptions,
      images: imageId,
      showScope: scope
    };

    await customAxios.put(`/feed/${feedId}`, feedForm)
      .then(res => {
        props.closeModify();
        dispatch({type: 'OpenSnackbar', payload: '피드를 수정하였습니다.'});
        props.modifyFeedDetail(res.data);
      })
      .catch(error => console.error(error.response))
      .finally(() => dispatch({type: 'CloseLoading'}));
  };
  const handleModifyFeed = async (feedId) => {
    if (validate()) {
      dispatch({type: 'OpenLoading', payload: '피드를 수정중입니다..'});
      if (newImage.length > 0) {
        const imageForm = new FormData();
        newImage.map(item => imageForm.append('files', item));

        await customAxios.post(`/upload`, imageForm)
          .then(res => {
            let list = image;
            res.data.map(item => {
                const index = image.findIndex(value => item.originalName === value.originalName & !value.id);
                list.splice(index, 1, {...item, description: image[index].description});
                return list;
              }
            )
            putFeed(feedId, list);
          })
          .catch(error => console.log(error))
          .finally(() => dispatch({type: 'CloseLoading'}));
      } else await putFeed(feedId, image);
    }
  };

  return (
    <Grid container spacing={2} sx={{justifyContent: 'center', p: 3, pb: 0}}>
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
        <TextField
          fullWidth
          rows={6}
          multiline
          autoFocus
          error={!!errorMessage}
          helperText={errorMessage}
          onChange={handleChangeFeedContent}
          value={feed}
          placeholder={'내용을 입력해 주세요.'}
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

      <Grid item xs={12} sx={{display: image.length === 0 ? 'none' : 'block'}}>
        <Grid container spacing={2} colums={2} sx={{p: 1, maxHeight: 400, overflow: 'auto'}}>
          <DndProvider backend={HTML5Backend}>
            {image.map((item, index) => (
              <Grid key={index} item xs={6}>
                <ModifyFeedImage
                  image={item}
                  index={index}
                  handleChangeDescription={handleChangeDescription}
                  handleDeleteFeedImage={handleDeleteFeedImage}
                  handleMoveImage={handleMoveImage}
                />
              </Grid>
            ))}
          </DndProvider>
        </Grid>
      </Grid>

      <Grid item>
        <Stack spacing={1} direction='row' sx={{justifyContent: 'center'}}>
          <Button variant='contained' onClick={() => handleModifyFeed(id)}>수정</Button>
          <Button variant='contained' onClick={props.closeModify}>취소</Button>
        </Stack>
      </Grid>
    </Grid>
  )
})