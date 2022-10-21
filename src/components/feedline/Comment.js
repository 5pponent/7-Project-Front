import { Box, Grid, Typography } from "@mui/material";
import SmallProfile from "../SmallProfile";


export default function Comment(props) {

	return (
		<Grid container marginTop="20px" spacing={2}>

			<Grid item xs={1}>
				<SmallProfile image={props.image} name={props.name}/>
			</Grid>

			<Grid item xs={10}>
				<Box sx={{bgcolor: '#e7ebf0', borderRadius: '10px', padding: '12px'}}>
					<Typography sx={{fontSize: '14px', whiteSpace: 'pre-wrap'}}>{props.content}</Typography>
				</Box>
        <Typography color="textSecondary" fontSize="12px">{props.createTime}</Typography>
			</Grid>

    </Grid>
	);
}