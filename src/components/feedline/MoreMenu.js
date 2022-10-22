import {useContext, useState} from "react";
import axios from 'axios';
import {store} from "../../store/store";
import {Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function MoreMenu(props) {
	const [state, dispatch] = useContext(store);
	const [anchorEl, setAnchorEl] = useState(null);
	const show = props.writer === state.user.id ? 'block' : 'none';

	const handleMenuClick = (e) => { setAnchorEl(e.currentTarget) };
	const handleMenuClose = () => { setAnchorEl(null) };
	const handleClickModify = () => {
		console.log('수정');
		handleMenuClose();
	};
	const handleClickDelete = () => {
		axios.delete(`/feed/${props.feedId}`, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(res => {
				props.closeContent && props.closeContent();
				handleMenuClose();
				props.getFeedList(props.feedList.filter(item => item.id !== props.feedId));
			})
			.catch(error => console.error(error))
	};

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
        <Divider sx={{display: show}}/>
        <MenuItem onClick={handleClickModify} sx={{display: show}}>
          <Typography>수정하기</Typography>
        </MenuItem>
        <Divider sx={{display: show}}/>
        <MenuItem onClick={handleClickDelete} sx={{display: show}}>
          <Typography color={"darkred"}>삭제하기</Typography>
        </MenuItem>
			</Menu>
		</>	
	);
}