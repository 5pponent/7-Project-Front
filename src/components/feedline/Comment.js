import { Grid, Typography } from "@mui/material";
import SmallProfile from "../SmallProfile";


export default function Comment(props) {

	return (
		<Grid container marginTop="20px" spacing={2}>

			<Grid item xs={1}>
				<SmallProfile image={props.image} name={props.name}/>
			</Grid>

			<Grid item xs={10}>
				<Typography sx={{fontSize: '14px'}}>{props.content}</Typography>
			</Grid>

		</Grid>
	);
}