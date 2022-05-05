import { Avatar, Stack, Typography } from "@mui/material";


// props [ image, name ]
export default function SmallProfile(props) {

	return (
		<Stack alignItems='center'>
			<Avatar src={props.image}/>
			<Typography sx={{fontSize: '14px'}}>{props.name}</Typography>
		</Stack>
	);
}