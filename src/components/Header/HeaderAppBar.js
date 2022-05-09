import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import HeaderMenu from './HeaderMenu';
import { Box, IconButton, Tooltip } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SmallProfile from '../SmallProfile';
import LogoutIcon from '@mui/icons-material/Logout';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
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
		width: '100%'
  },
}));

const Title = styled(Typography)(() => ({
	fontSize: '20px',
	fontWeight: 'bold',
}));

export default function Header(props) {

	const handleClickLogo = () => {	props.getMode("MAIN"); };
	const handleClickLogout = () => { props.getLogin(false); props.getMode('MAIN') };
	const handleClickMyProfile = () => { 
		props.getMode("PROFILE");
		props.getUser([props.name, props.image]);
	};

	return(
		<AppBar sx={{zIndex: 'tooltip'}}>  {/* 헤더 AppBar */}
			<Toolbar disableGutters sx={{ bgcolor: '#2c92ff', color: 'white' }}>
				<Box> {/* 검색 */}
					<Search sx={{ minWidth: "210px", marginLeft: "20px" }}>
						<SearchIconWrapper><SearchIcon /></SearchIconWrapper>
						<StyledInputBase placeholder="프로필 검색" />
					</Search>
				</Box>

				<ButtonBase onClick={handleClickLogo} sx={{width: "80%"}}> {/* 타이틀 */}
					<Box>  
						<MenuBookIcon sx={{ fontSize: 55 }}/>
						<Title>모두의 일기장</Title>
					</Box>
				</ButtonBase>

				<Box sx={{ display: 'flex', width: "20%", justifyContent: "flex-end", marginRight: "15px" }}> {/* 우측 사용자 프로필, 더보기 메뉴 */}
					<Tooltip title="로그아웃" placement="bottom" arrow>
						<IconButton onClick={handleClickLogout}>
							<LogoutIcon sx={{color: 'white'}} />
						</IconButton>
					</Tooltip>
					<Tooltip title="프로필" placement="bottom" arrow>
						<ButtonBase onClick={handleClickMyProfile}>
							<SmallProfile image={props.image} name={props.name}/>
						</ButtonBase>
					</Tooltip>
					<HeaderMenu getMode={props.getMode}/>
				</Box>
				
			</Toolbar>
		</AppBar>
	);
}
