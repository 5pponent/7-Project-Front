import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Typography } from '@material-ui/core';

const Item = styled(Paper) (({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
	
}));

export default function Feed(props) {

	const [anchorEl, setAnchorEl] = useState(null);
	const handleMenuClick = (e) => { // 더보기 메뉴 클릭 이벤트
		setAnchorEl(e.currentTarget);
	};
	const handleMenuClose = () => { // 더보기 메뉴 클릭 이벤트
		setAnchorEl(null);
	};

	const content = `Truncation should be conditionally applicable on this long line of text
 		as this is a much longer line than what the container can support.`;
	const [user, date] = ['이름', '작성일'];

	return (
		<Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
			<Paper style={{margin: 12}}>
				<Stack>
					<Grid container>
						<Grid item xs={9}> {/* 컨텐츠 */}
							<Item elevation={0}>{content}</Item>
						</Grid>
						<Grid item xs={3}> {/* 더보기 버튼 */}
							<Box display="flex" justifyContent="flex-end" p={2}>
								<IconButton
									aria-controls="simple-menu"
									aria-haspopup="true"
									onClick={handleMenuClick}
								>
									<MoreVertRoundedIcon></MoreVertRoundedIcon>
								</IconButton>
								{/* 더보기 메뉴 */}
								<Menu 
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleMenuClose}
								>
									<MenuItem onClick={handleMenuClose}>저장하기</MenuItem>
									<MenuItem onClick={handleMenuClose}>신고하기</MenuItem>
								</Menu>
							</Box>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={9}> {/* 좋아요, 댓글 */}
							<Item elevation={0}>
								<IconButton>
									<ThumbUpAltRoundedIcon sx={{ fontSize: 30 }}/>
								</IconButton>
								<IconButton>
									<AddCommentRoundedIcon sx={{ fontSize: 30}}></AddCommentRoundedIcon>
								</IconButton>
							</Item>
						</Grid>
						<Grid item xs={3}> {/* 프로필 */}
							<Item elevation={0}>
								<Grid container spacing={2}>
									<Grid item>
										<Avatar alt="profile image" src="https://placeimg.com/100/100/people"/>
									</Grid>
									<Grid item>
										<Typography>{user}</Typography>
										<Typography>{date}</Typography>
									</Grid>
								</Grid>
							</Item>
						</Grid>
					</Grid>
				</Stack>
			</Paper>
		</Box>
	);
}


