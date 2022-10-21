import React, {useContext} from 'react';
import {store} from "../../store/store";
import {Grid, Stack, TextField} from "@mui/material";

export default function FeedImageModifyDialog(props) {
  const [state, dispatch] = useContext(store);

  const handleChangeValue = (e, index) => {
    dispatch({type: 'AddDescription', payload: {index: index, description: e.target.value}});
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1}}>
      {state.feedImage.map((value, index) => (
        <Grid item key={index} xs={6}>
          <Stack sx={{p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '2px 2px 5px 2px grey'}}>
            <img src={URL.createObjectURL(value.file)} alt={value.originalName} width='100%' style={{objectFit: 'cover'}}/>
            <TextField placeholder='설명' value={state.feedImage[index].description} multiline minRows={2} onChange={(e) => handleChangeValue(e, index)}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}