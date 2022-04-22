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
import Skeleton from '@mui/material/Skeleton';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from'@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Comment from './Comment';

const Item = styled(Paper) (({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}));

// 컨텐츠 글 5줄까지만 표시, 이후엔 ...으로 생략
const Content = styled(Typography)`
	overflow: hidden;	
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
`

function MoreMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleMenuClick = (e) => { // 더보기 메뉴 클릭 이벤트
		setAnchorEl(e.currentTarget);
	};
	const handleMenuClose = () => { // 더보기 메뉴 클릭 이벤트
		setAnchorEl(null);
	};

	return(
		<>
			<IconButton
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleMenuClick}
			>
				<MoreVertRoundedIcon/>
			</IconButton>
			<Menu 
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>저장하기</MenuItem>
				<Divider/>
				<MenuItem onClick={handleMenuClose}>신고하기</MenuItem>
			</Menu>
		</>	
	);
}

export default function Feed(props) {

	const comments = [
    {
      "comment_idx" : 1,
      "name" : "유저1",
      "image" : "https://placeimg.com/100/100/people/1",
      "content" : "그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서."
    },
    {
      "comment_idx" : 2,
      "name" : "유저2",
      "image" : "https://placeimg.com/100/100/people/2",
      "content" : "그들의 있는 불어 산야에 뜨거운지라, 피가 있는 구할 속잎나고, 사막이다. 끓는 고동을 내는 우리 황금시대의 위하여서. 이상은 눈이 청춘의 사막이다. 그들의 기쁘며, 얼마나 불어 광야에서 그들에게 있을 말이다."
    }
  ];

	const [open, setOpen] = useState(false);
	const openContent = () => { setOpen(true); };
	const closeContent = () => { setOpen(false); };

	return (
		<Box sx={{ overflow: 'hidden' }}>
			<Paper style={{margin: 10}}>
				<Stack>
					<Grid container>
						<Grid item xs={11} sx={{cursor: 'pointer'}}
							onClick={openContent}> {/* 컨텐츠 */}
							<Item elevation={0}>
								<Content>{props.content}</Content>
							</Item>
						</Grid>
						<Grid item xs={1}> {/* 더보기 버튼 */}
							<Box p={2}>
								<MoreMenu/>
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
									<Grid container spacing={2} sx={{cursor: 'pointer'}}>
										<Grid item>
											{props.image ? <Avatar alt="profile image" src={props.image}/>
											: <Skeleton variant="circular" width={40} height={40} />}
										</Grid>
										<Grid item>
											<Typography>{props.name}</Typography>
											<Typography variant="body2" color="textSecondary">{props.time}</Typography>
										</Grid>
									</Grid>
							</Item>
						</Grid>
					</Grid>

					{/* 컨텐츠 상세보기 다이얼로그 */}
					<Dialog open={open} onClose={closeContent} fullWidth={true} maxWidth='md'>
						<DialogContent>
							<Grid container paddingBottom={3}>
								<Grid item xs={1}>
									<Avatar src={props.image}/>
									{props.name}
								</Grid>
								<Grid item xs={10} p={1}>
									<Typography>{props.content}</Typography>
								</Grid>
								<Grid item xs={1}>
									<Stack paddingLeft={5}>
										<IconButton onClick={closeContent}>
											<CloseIcon color='text.secondary'/>
										</IconButton>
										<MoreMenu/>
									</Stack>
								</Grid>
							</Grid>

							<Box>
								<IconButton>
									<ThumbUpAltRoundedIcon sx={{ fontSize: 30 }}/>
								</IconButton>좋아요 수
								<IconButton sx={{ marginLeft: "20px" }}>
									<AddCommentRoundedIcon sx={{ fontSize: 30 }}></AddCommentRoundedIcon>
								</IconButton>{comments.length}
							</Box>
							
							<Divider/>

							<Stack p={1}>
								{
									comments ? comments.map((c) => {
										return (
											<Comment
												key={c.comment_idx}
												name={c.name}
												image={c.image}
												content={c.content}
											/>
										);
									}) : "댓글이 없습니다."
								}
							</Stack>
						</DialogContent>
					</Dialog>
				</Stack>
			</Paper>
		</Box>
	);
}


