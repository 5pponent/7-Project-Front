import React, {useContext} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {feedStore} from "../../store/feedStore";
import {Box, CardActions, CardContent, Grid, TextField} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function CreateFeedImage(props) {
  const {item, index} = props;
  const [feedState, feedDispatch] = useContext(feedStore);

  const handleMoveFeedImage = (origin, target, feedList) => {
    let list = feedList;
    const index = list.findIndex(item => item === origin);
    list.splice(index, 1);
    list.splice(target, 0, origin);
    feedDispatch({type: 'MoveImage', payload: list});
  };
  const handleDeleteFeedImage = (num) => {
    URL.revokeObjectURL(feedState.feedImage[num].source);
    feedDispatch({type: 'DeleteImage', payload: num});
  };
  const handleChangeDescription = (e, num) => {
    feedDispatch({type: 'ChangeDesc', payload: {num: num, description: e.target.value}});
  };

  {/*드래그앤 드롭*/
  }
  const [, dragRef] = useDrag(() => ({
      type: 'image',
      item: {item, index},
      end: (object, monitor) => {
        const {item: originItem, index: originIndex} = object;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          handleMoveFeedImage(originItem, originIndex, feedState.feedImage);
        }
      }
    }), [item, index]
  );
  const [{isOver}, dropRef] = useDrop(() => ({
      accept: 'image',
      collect: (monitor) => ({
        isOver: monitor.isOver()
      }),
      hover: ({item: originItem, index: originIndex}) => {
        if (originItem.file !== item.file) {
          handleMoveFeedImage(originItem, index, feedState.feedImage);
        }
      }
    })
  );

  return (
    <Box ref={dropRef} sx={{cursor: 'grab', opacity: isOver ? 0.5 : 1}}>
      <Box ref={dragRef}>
        <CardActions sx={{justifyContent: 'end', p: 0, pt: 1}}>
          <DeleteRoundedIcon onClick={() => handleDeleteFeedImage(index)}
                             sx={{cursor: 'pointer', fontSize: 'xx-large', color: '#931e1e'}}/>
        </CardActions>

        <CardContent sx={{p: 0}}>
          <Grid container spacing={1}>
            <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', maxHeight: '240px', p: 1}}>
              <img src={item.source} alt={item.originalName} width='100%' height='100%'
                   style={{objectFit: 'contain'}}/>
            </Grid>

            <Grid item xs={6} style={{padding: 0}}
                  sx={{p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <TextField multiline rows={9} placeholder={'설명'} value={item.description}
                         onChange={(e) => handleChangeDescription(e, index)}
                         sx={{mt: 1, overflow: 'auto'}}/>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Box>
  )
}