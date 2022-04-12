import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
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

	const content = `Truncation should be conditionally applicable on this long line of text
 		as this is a much longer line than what the container can support.`;
	const [user, date] = ['이름', '작성일'];

	return (
		<Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
			<Item>
				<Stack>
					<Grid container>
						<Grid item xs={9}> {/* 컨텐츠 */}
							<Item elevation={1}>{content}</Item>
						</Grid>
						<Grid item xs={3}> {/* 버튼 */}
							<Box display="flex" justifyContent="flex-end">
								<IconButton>
									<MoreVertRoundedIcon></MoreVertRoundedIcon>
								</IconButton>
							</Box>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={9}> {/* 좋아요, 댓글 */}
							<Item elevation={1}>
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
			</Item>
		</Box>
	);
}


