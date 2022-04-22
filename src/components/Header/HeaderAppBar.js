import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import HeaderMenu from './HeaderMenu';
import { Box } from '@material-ui/core';
import { Avatar } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import MenuBookIcon from '@mui/icons-material/MenuBook';


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

const Item = styled(Typography)(() => ({
	margin: 'auto 0',
	marginRight: '10px',
	padding: 3,
	fontSize: '12px',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap'
}));

export default function Header(props) {

	const title = "모두의 일기장";

	// 새로고침 함수
	const handleClickLogo = () => {	props.getMode("MAIN"); };
	const handleClickMyProfile = () => { props.getMode("MYPAGE"); };

	return(
		<AppBar sx={{ bgcolor: "#2c92ff" }}>  {/* 헤더 AppBar */}
			<Toolbar disableGutters>
				<Box> {/* 검색 */}
					<Search sx={{ minWidth: "210px", marginLeft: "20px" }}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="프로필 검색"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
				</Box>

				<ButtonBase onClick={handleClickLogo} sx={{width: "80%"}}> {/* 타이틀 */}
					<Box overflow='hidden'>  
						<MenuBookIcon sx={{ fontSize: 55 }}/>
						<Title>{title}</Title>
					</Box>
				</ButtonBase>

				<Box sx={{ display: 'flex', width: "20%", justifyContent: "flex-end", marginRight: "15px" }}> {/* 우측 사용자 프로필, 더보기 메뉴 */}
					<Item>{props.name}</Item>
					<ButtonBase onClick={handleClickMyProfile}><Avatar src={props.image}/></ButtonBase>
					<HeaderMenu getMode={props.getMode}/>
				</Box>
				
			</Toolbar>
		</AppBar>
	);
}
