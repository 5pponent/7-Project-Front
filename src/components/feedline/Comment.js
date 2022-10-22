import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import SmallProfile from "../SmallProfile";


export default function Comment(props) {

	return (
		<Stack direction={"row"} spacing={2}>
      <SmallProfile image={props.image} name={props.name}/>

      <Stack>
        <Typography sx={{
          fontSize: '14px', whiteSpace: 'pre-wrap', bgcolor: '#e7ebf0', padding: '10px',
          borderRadius: "10px"
        }}>
          {props.content}
          <Typography textAlign="right" color="textSecondary" fontSize="12px" style={{wordBreak: 'keep-all'}} mt={1}>
            {props.createTime}
          </Typography>
        </Typography>
        <Stack direction='row' justifyContent={"space-between"}>
          <Stack direction='row' spacing={1}>
            <Button sx={{p: 0, fontSize: "12px", minWidth: 'max-content'}}>답글보기</Button>
            <Button sx={{p: 0, fontSize: "12px", minWidth: 'max-content'}}>답글달기</Button>
            <Button sx={{p: 0, fontSize: "12px", minWidth: 'max-content'}}>수정</Button>
            <Button sx={{p: 0, fontSize: "12px", minWidth: 'max-content'}}>삭제</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
	);
}