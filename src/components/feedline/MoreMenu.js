import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function MoreMenu(props) {

	const [anchorEl, setAnchorEl] = useState(null);
	const handleMenuClick = (e) => { setAnchorEl(e.currentTarget); };
	const handleMenuClose = () => { setAnchorEl(null); };

	return(
		<>
			<IconButton onClick={handleMenuClick}>
				<MoreVertRoundedIcon/>
			</IconButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<MenuItem onClick={handleMenuClose}>저장하기</MenuItem>
				<Divider/>
				<MenuItem onClick={handleMenuClose}>신고하기</MenuItem>
			</Menu>
		</>	
	);
}