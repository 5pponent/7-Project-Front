import { Box, Grid, Paper, Typography } from "@mui/material";
import SmallProfile from "../SmallProfile";


export default function Comment(props) {

	return (
		<Grid container marginTop="20px" spacing={2}>

			<Grid item xs={1}>
				<SmallProfile image={props.image} name={props.name}/>
			</Grid>

			<Grid item xs={10}>
				<Box sx={{bgcolor: '#e7ebf0', borderRadius: '20px', padding: '15px'}}>
					<Typography sx={{fontSize: '14px'}}>{props.content}</Typography>
				</Box>
			</Grid>

		</Grid>
	);
}