import {useContext, useState} from "react";
import customAxios from "../../AxiosProvider";
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
		handleMenuClose();
		props.openModify();
	};
	const handleClickDelete = () => {
		dispatch({type: 'OpenLoading', payload: '피드를 삭제중입니다..'});
		customAxios.delete(`/feed/${props.feedId}`)
			.then(res => {
				handleMenuClose();
				props.closeContent && props.closeContent();
				props.getFeedList(props.feedList.filter(item => item.id !== props.feedId));
				dispatch({type: 'OpenSnackbar', payload: `피드가 삭제되었습니다.`});
			})
			.catch(error => console.error(error))
			.finally(() => dispatch({type: 'CloseLoading'}))
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