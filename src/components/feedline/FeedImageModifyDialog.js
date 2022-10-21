import React, {useContext} from 'react';
import {store} from "../../store/store";
import {Grid, Stack, TextField} from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function FeedImageModifyDialog(props) {
  const [state, dispatch] = useContext(store);

  const handleChangeValue = (e, index) => {
    dispatch({type: 'AddDescription', payload: {index: index, description: e.target.value}});
  };
  const handleDeleteImage = (index) => {
    dispatch({type: 'DeleteImage', payload: index});
  };

  return (
    <Grid container spacing={2} sx={{mt: 1}}>
      {state.feedImage.map((value, index) => (
        <Grid item key={index} xs={6}>
          <Stack sx={{p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '2px 2px 5px 2px grey'}}>
            <DeleteRoundedIcon color={'action'} onClick={() => handleDeleteImage(index)}
                               sx={{cursor: 'pointer', fontSize: 'xx-large'}}/>
            <img src={URL.createObjectURL(value.file)} alt={value.originalName} width='100%'
                 style={{objectFit: 'cover'}}/>
            <TextField placeholder='설명' multiline minRows={2} size={'small'} value={state.feedImage[index].description}
                       onChange={(e) => handleChangeValue(e, index)} sx={{mt: 1}}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}