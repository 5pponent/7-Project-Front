import { Divider, Stack } from '@mui/material';
import FeedLine from './FeedLine';

export default function FeedLineSelect(props) {


  return (
    <Stack>
      <Stack spacing={1} width='800px' height='40px' bgcolor='#e7ebf0' margin='0 auto'
        direction='row' divider={<Divider orientation='vertical' flexItem />}>
        
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
