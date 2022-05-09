import { AppBar, Box, styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import FeedLine from './FeedLine';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
  "&.Mui-selected, &.Mui-selected:hover": {
    fontWeight: 'bold',
    color: 'gray',
    backgroundColor: 'white',
  }
}));

function SelectedLine(props) {

  return (
    <FeedLine
      userName={props.userName} 
      userImg={props.userImg} 
      getMode={props.getMode}
      getUser={props.getUser}
    />
  );
}

export default function FeedLineSelect(props) {

  const [line, setLine] = useState("1");
  const handleLineChange = (e, selected) => {
    if(selected !== null) { setLine(selected); }
  };

  return (
    <>
      <AppBar sx={{marginTop: '85px', boxShadow: 0, bgcolor: 'white'}}>
        <Box sx={{width: 780, margin: '0 auto', bgcolor: '#e7ebf0', padding: '10px'}}>
          <StyledToggleButtonGroup
            color="standard"
            exclusive
            value={line}
            onChange={handleLineChange}
          >
            <StyledToggleButton value="1">feedline1</StyledToggleButton>
            <StyledToggleButton value="2">feedline2</StyledToggleButton>
            <StyledToggleButton value="new" sx={{width: '50px'}}>+</StyledToggleButton>
          </StyledToggleButtonGroup>
        </Box>
      </AppBar>
      
      <Box sx={{paddingTop: '55px'}} />

      <SelectedLine/>
    </>
  );
}
