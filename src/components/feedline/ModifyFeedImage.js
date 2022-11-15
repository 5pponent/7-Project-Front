import React from 'react';
import {Box, Card, CardActions, CardContent, Grid, TextField} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {useDrag, useDrop} from "react-dnd";

export default function ModifyFeedImage(props) {
  const {image, index, handleChangeDescription, handleDeleteFeedImage, handleMoveImage} = props;

  {/*드래그앤 드롭*/}
  const [, dragRef] = useDrag(() => ({
      type: 'modifyImage',
      item: {image, index},
      end: (object, monitor) => {
        const {image: originImage, index: originIndex} = object;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          handleMoveImage(originIndex, originImage);
        }
      }
    }), [image, index]
  );

  const [{isOver}, dropRef] = useDrop(() => ({
    accept: 'modifyImage',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    hover: ({image: originImage, index: originIndex}) => {
      if (index !== originIndex) {
        handleMoveImage(index, originImage);
      }
    }
  }));

  return (
    <Box ref={dropRef} sx={{opacity: isOver ? 0.5 : 1}}>
      <Card ref={dragRef} sx={{height: 300, position: 'relative', cursor: 'grab'}}>
        <CardActions sx={{justifyContent: 'end', pb: 0, position: 'absolute', right: 0}}>
          <DeleteRoundedIcon onClick={() => handleDeleteFeedImage(index)} color={'action'}
                             sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
        </CardActions>

        <CardContent style={{height: '100%'}}>
          <Grid container spacing={1}
                sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid item sx={{flex: 0.7, display: 'flex', alignItems: 'center'}}>
              <img src={image.source} alt={image.originalName} width='100%' height='100%'
                   style={{objectFit: 'contain', maxHeight: '200px'}}/>
            </Grid>
            <Grid item style={{padding: 0}} sx={{flex: 0.2, width: '100%'}}>
              <TextField placeholder='설명' value={image.description}
                         onChange={(e) => handleChangeDescription(e, index)}
                         multiline fullWidth rows={1} sx={{mt: 1, overflow: 'auto'}}/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}