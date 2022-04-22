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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		width: 150
  },
}));

const Title = styled(Typography)(() => ({
	fontSize: '20px',
	fontWeight: 'bold',
}));

const Item = styled(Typography)(() => ({
	margin: 'auto 0',
	padding: 3,
	fontSize: '12px',
	overflow: 'hidden'
}));

export default function Header(props) {

	const title = "모두의 일기장";

	// 새로고침 함수
	const pageReload = () => { window.location.replace("/"); };

	return(
		<AppBar sx={{ bgcolor: "#2c92ff" }}>  {/* 헤더 AppBar */}
			<Toolbar>
				<Box> {/* 검색 */}
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="프로필 검색"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
				</Box>

				<ButtonBase onClick={pageReload} sx={{margin: 'auto'}}> {/* 타이틀 */}
					<Box overflow='hidden'>  
						<MenuBookIcon sx={{ fontSize: 55 }}/>
						<Title>{title}</Title>
					</Box>
				</ButtonBase>

				<Box sx={{ display: 'flex' }}> {/* 우측 사용자 프로필, 메뉴 */}
					<Item>{props.name}</Item>
					<Item><Avatar src={props.image}/></Item>
					<Item><HeaderMenu/></Item>
				</Box>
				
			</Toolbar>
		</AppBar>
	);
}
