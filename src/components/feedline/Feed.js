import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';
import Dialog from'@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FeedDetail from './FeedDetail';
import MoreMenu from './MoreMenu';
import { color } from '@mui/system';

// 컨텐츠 글 5줄까지만 표시, 이후엔 ...으로 생략
const Content = styled(Typography)`
	overflow: hidden;	
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
`


export default function Feed(props) {

	const comments = [
		{
			"comment_idx" : 1,
			"name" : "유저1",
			"image" : "https://placeimg.com/100/100/people/1",
			"content" : "그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서.그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서.그들은 그들은 꽃 투명하되 인생을 위하여 힘있다. 우리 동력은 천지는 얼마나 황금시대를 봄바람이다. 원대하고, 있음으로써 못할 않는 것이다. 물방아 오직 타오르고 위하여서."
		},
		{
			"comment_idx" : 2,
			"name" : "유저2",
			"image" : "https://placeimg.com/100/100/people/2",
			"content" : "그들의 있는 불어 산야에 뜨거운지라, 피가 있는 구할 속잎나고, 사막이다. 끓는 고동을 내는 우리 황금시대의 위하여서. 이상은 눈이 청춘의 사막이다. 그들의 기쁘며, 얼마나 불어 광야에서 그들에게 있을 말이다. 그 말을 듣는 것 조차 하지 못할 것인 사람이다."
		}
	];
	const [open, setOpen] = useState(false);
	const openContent = () => { setOpen(true); };
	const closeContent = () => { setOpen(false); };
	const [anchor, setAnchor] = useState(null);
	const [like, setLike] = useState(null)
	const handleClickProfile = (e) => { setAnchor(e.currentTarget); };
	const handleCloseProfile = () => { setAnchor(null); };
	const handleClickProfileView = (e) => { 
		props.getUser([props.name, props.image]);
		props.getMode("PROFILE");
	}

	const onClickLike = () => {
		setLike(true)
	}

	return (
		<>
			<Paper sx={{ margin: '14px' }}>
				<Grid container>
					<Grid item xs={11} sx={{cursor: 'pointer'}}
						onClick={openContent}> {/* 컨텐츠 */}
						<Box p={4}>
							<Content>{props.content}</Content>
						</Box>
					</Grid>
					<Grid item xs={1} p={2}> {/* 더보기 버튼 */}
						<MoreMenu/>
					</Grid>
				</Grid>
				<Divider/>
				<Grid container p={2}>
					<Grid item xs={9}> {/* 좋아요, 댓글 */}
						<Box>
							<IconButton onClick={onClickLike}>
								<ThumbUpOffAltIcon sx={{ fontSize: 30 }}/>
							</IconButton>
							<IconButton>
								<AddCommentRoundedIcon sx={{ fontSize: 30 }}/>
							</IconButton>
						</Box>
					</Grid>
					<Grid item xs={3}> {/* 프로필 */}
						<Box>
							<Grid container spacing={2} sx={{cursor: 'pointer'}} 
								onClick={handleClickProfile}>
								<Grid item>
									<Avatar alt="profile image" src={props.image}/>
								</Grid>
								<Grid item>
									<Typography>{props.name}</Typography>
									<Typography variant="body2" color="textSecondary">{props.time}</Typography>
								</Grid>
							</Grid>
							<Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleCloseProfile}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
							>
								<MenuItem onClick={handleClickProfileView}>프로필</MenuItem>
								<MenuItem>팔로우</MenuItem>
								<MenuItem>차단</MenuItem>
							</Menu>
						</Box>
					</Grid>
				</Grid>
			</Paper>

			{/* 컨텐츠 상세보기 다이얼로그 */}
			<Dialog open={open} onClose={closeContent} fullWidth={true} maxWidth='md'>
				<DialogContent>
					<FeedDetail
						userName={props.userName}
						userImg={props.userImg}
						name={props.name}
						content={props.content}
						image={props.image}
						time={props.time}
						comments={comments}
						closeContent={closeContent}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}