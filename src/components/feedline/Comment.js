import { Avatar, Grid, Stack, Typography } from "@mui/material";


export default function Comment(props) {



	return (
		<>
			<Grid container marginTop="20px">

				<Grid item xs={1}>
					<Stack>
						<Avatar src={props.image}/>
						<Typography color='textSecondary'>{props.name}</Typography>
					</Stack>
				</Grid>

				<Grid item xs={10}>
					<Typography>{props.content}</Typography>
				</Grid>

			</Grid>
		</>
	);
}