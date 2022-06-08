import { useState } from 'react';
import { Box, Button, Divider, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import SmallProfile from "../SmallProfile";
import CloseIcon from '@mui/icons-material/Close';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreMenu from './MoreMenu';
import Comment from './Comment';

export default function FeedDetail(props) {

	const [like, setLike] = useState(null)
	const onClickLike = () => {
		setLike(true) 
	}


	return (
		<>
			<Grid container paddingBottom={3} spacing={2}>
				<Grid item xs={1}>
					<SmallProfile image={props.image} name={props.name}/>
				</Grid>
				<Grid item xs={10}>
					<Typography color="textSecondary" fontSize="12px">
						{props.time}
					</Typography>
					<Typography>{props.content}</Typography>
				</Grid>
				<Grid item xs={1}>
					<Stack paddingLeft={2}>
						<IconButton onClick={props.closeContent}>
							<CloseIcon color='text.secondary'/>
						</IconButton>
						<MoreMenu/>
					</Stack>
				</Grid>
			</Grid>

			<Box>
				<IconButton onClick={onClickLike}>
					<ThumbUpAltRoundedIcon sx={{ fontSize: 30 }}/>
				</IconButton>좋아요 수
				<IconButton sx={{ marginLeft: "20px" }}>
					<AddCommentRoundedIcon sx={{ fontSize: 30 }}></AddCommentRoundedIcon>
				</IconButton>{props.comments.length}
			</Box>
			
			<Divider/>
			
			<Grid container marginTop='15px'>
				<Grid item xs={1}>
					<SmallProfile image={props.userImg} name={props.userName}/>
				</Grid>
				{/* 댓글 작성 */}
				<Grid item xs={11}>
					<Stack direction='row' margin='10px' spacing={1}>
						<TextField multiline size='small' fullWidth/>
						<Button type='submit' variant='contained'>입력</Button>
					</Stack>
				</Grid>
			</Grid>

			<Stack p={1}>
			{
				props.comments ? props.comments.map((c) => {
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
		</>
	);
}