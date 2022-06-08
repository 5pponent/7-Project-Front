import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import HeaderMenu from './HeaderMenu';
import { Box, Drawer, IconButton, Stack, Tooltip } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import SmallProfile from '../SmallProfile';
import CreateFeed from '../feedline/CreateFeed';
import { useState } from 'react';
import MuiSwitch from '../MUISwitch';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
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
  },
}));

const Title = styled(Typography)(() => ({
	fontSize: '20px',
	fontWeight: 'bold',
}));

export default function Header(props) {

	const [open, setOpen] = useState(false);
	const [feedContent, setFeedContent] = useState('');
	const getContent = (c) => { setFeedContent(c); };
	const getOpen = (stat) => { setOpen(stat); };
	const handleClickDrawer = () => { setOpen(open ? false : true); };
	const handleClickLogo = () => {	props.getMode("MAIN"); };
	
	const handleClickMyProfile = () => { 
		props.getMode("PROFILE");
		props.getUser([props.name, props.image]);
	};

	return(
		<AppBar>
			<Toolbar sx={{ bgcolor: '#2c92ff', color: 'white' }}>
				{/* 검색 */}
				<Box sx={{ width: "300px", float: 'left'}}> 
					<Search>
						<SearchIconWrapper><SearchIcon /></SearchIconWrapper>
						<StyledInputBase placeholder="프로필 검색" />
					</Search>
				</Box>

				{/* 타이틀 */}
				<Stack onClick={handleClickLogo} alignItems='center' sx={{ cursor: 'pointer', width: '100%' }}>
					<MenuBookIcon sx={{ fontSize: 55 }}/>
					<Title>모두의 일기장</Title>
				</Stack>

				{/* 우측 메뉴 */}
				<Box sx={{ display: 'flex', justifyContent: "flex-end", float: 'right', width: '300px' }}> {/* 우측 사용자 프로필, 더보기 메뉴 */}
					
					<MuiSwitch />

					<Tooltip title="피드 작성" placement="bottom" arrow>
						<IconButton onClick={handleClickDrawer} sx={{marginRight: '5px'}}>
							<EditIcon sx={{color: 'white'}}></EditIcon>
						</IconButton>
					</Tooltip>
					
					<Drawer
            anchor='left'
            open={open}
            onClose={handleClickDrawer}
          >
            <CreateFeed 
							name={props.name}
							image={props.image}
							getOpen={getOpen}
							getContent={getContent}
							feedContent={feedContent}
						/>
          </Drawer>
					<Tooltip title="프로필" placement="bottom" arrow>
						<ButtonBase onClick={handleClickMyProfile} sx={{margin:'0 5px'}}>
							<SmallProfile image={props.image}/>
						</ButtonBase>
					</Tooltip>
					<HeaderMenu 
						getMode={props.getMode}
						getLogin={props.getLogin}
					/>
				</Box>
				
			</Toolbar>
		</AppBar>
	);
}
