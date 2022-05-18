import { styled } from '@mui/material/styles';
import { Avatar, Divider, IconButton, InputBase, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FeedLine from "../Feedline/FeedLine";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
	border: '1px solid lightgray',
  borderRadius: theme.shape.borderRadius,
	width: '200px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
		width: '100%'
  },
}));

function FeedCreateButton() {
	return (
		<Tooltip title="피드 작성" placement='left'>
			<IconButton color='primary' sx={{ marginRight: '10px' }} size='medium'>
				<BorderColorIcon/>
			</IconButton>
		</Tooltip>
	);
}

export default function Profile(props) {
	
	const userName = props.userName;
	const image = props.userImg;

	return (
		<>
			<Stack p={1} alignItems='center' spacing={1}>
				<Avatar src={image} sx={{ width: 56, height: 56 }} />
				<Typography sx={{fontSize: '18px', fontWeight: 'bold'}}>{userName}</Typography>
				<Typography variant='subtitle2'>재직분야</Typography>
				<Typography variant='subtitle2'>이메일</Typography>
				<Typography variant='subtitle2'>follower : 00 / follow : 00</Typography>
			</Stack>
			<Divider/>
			<Stack direction='row' sx={{ marginBottom: '10px', width: '800px', margin: '0 auto', padding: '10px' }}>
				<Search>
					<SearchIconWrapper><SearchIcon /></SearchIconWrapper>
					<StyledInputBase placeholder="피드 검색" />
				</Search>
			</Stack>
			
			<Box sx={{ height: '580px', overflow: 'auto' }}>
				<FeedLine 
					userName={userName} 
					userImg={image} 
					getMode={props.getMode} 
					getUser={props.getUser}
				/>
			</Box>
		</>
	);
}