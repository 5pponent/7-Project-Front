import { Divider, Stack } from '@mui/material';
import FeedLine from './FeedLine';

export default function FeedLineSelect(props) {
  return (
    <Stack>
      <Stack spacing={1} width='900px' height='40px' bgcolor='#e7ebf0' margin='0 auto' minWidth='800px'
        direction='row' divider={<Divider orientation='vertical' flexItem />}>
        
      </Stack>

      <FeedLine
        getUser={props.getUser}
      />
    </Stack>
  );
}
