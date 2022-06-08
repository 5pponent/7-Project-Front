import { Divider, Stack, Box, IconButton, styled, ToggleButton, ToggleButtonGroup, DialogContent } from '@mui/material';
import FeedLine from './FeedLine';
import { useState } from 'react';
import { Dialog } from '@material-ui/core';
import NewFeedLine from './NewFeedLine';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function FeedLineSelect(props) {

  const [line, setLine] = useState("1");
  const handleLineChange = (e, selected) => {
    if(selected !== null) { setLine(selected); }
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    padding:'10px',
    '& .MuiToggleButtonGroup-grouped': {
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));
  const StyledToggleButton = styled(ToggleButton)(({theme}) => ({
    height:'40px',
    marginRight:'10px',

    "&.Mui-selected, &.Mui-selected:hover": {
      fontWeight: 'bold',
      color: 'gray',
      backgroundColor: 'white',
      value:{line},
      onChange:{handleLineChange}
    }
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  }
  const handleClickClose = () => {
      setOpen(false);
  }
  

  return (
    <Stack>
      <Stack spacing={1} width='900px' height='40px' bgcolor='#e7ebf0' margin='0 auto' minWidth='800px'
        direction='row'>
          <StyledToggleButtonGroup
            color="standard"
            exclusive
            value={line}
            onChange={handleLineChange}
          >
          <StyledToggleButton value="1">feedline1</StyledToggleButton>
          <StyledToggleButton value="new" sx={{width: '50px'}} onClick={handleClickOpen}>+</StyledToggleButton>
          <Dialog open={open} onClose={handleClickClose}>
                  <DialogContent>
                    <NewFeedLine getFeedLine={props.getCalendar}></NewFeedLine>
                  </DialogContent>
                </Dialog>
          </StyledToggleButtonGroup>
      <Box sx={{}} />
      </Stack>

      <FeedLine
        userName={props.userName} 
        userImg={props.userImg} 
        getMode={props.getMode}
        getUser={props.getUser}
      />
    </Stack>
  );
}
