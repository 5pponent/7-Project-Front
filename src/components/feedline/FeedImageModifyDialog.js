import React, {useContext} from 'react';
import {store} from "../../store/store";
import {Grid, Stack, TextField} from "@mui/material";

export default function FeedImageModifyDialog(props) {
  const [state, dispatch] = useContext(store);

  const handleChangeValue = () => {console.log('설명 추가')};

  return (
    <Grid container spacing={2} sx={{ mt: 1}}>
      {state.feedContent.image.map((value, index) => (
        <Grid item key={index} xs={6}>
          <Stack sx={{p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '2px 2px 5px 2px grey'}}>
            <img src={URL.createObjectURL(value.file)} alt={value.originalName} width='100%' style={{objectFit: 'cover'}}/>
            <TextField placeholder='설명' multiline minRows={2} onChange={handleChangeValue}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}