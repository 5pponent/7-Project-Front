import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import HeaderMenu from './HeaderMenu';
import { Grid } from '@mui/material';
import { Box } from '@material-ui/core';
import { Avatar } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
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
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '17ch',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const Title = styled(Typography)(() => ({
	margin: 'auto',
	fontSize: '32px',
	fontWeight: 'bold'
}));

const Item = styled(Typography)(({theme}) => ({
	margin: 'auto 0',
	paddingRight: theme.spacing(2),
	fontSize: '12px',
}));

export default function Header(props) {

	const title = "모두의 일기장";

	return(
		<AppBar>  {/* 헤더 AppBar */}
			<StyledToolbar>
				<Box sx={{ width: "15%" }}> {/* 검색 */}
					<Search>	
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
				</Box>

				<Box sx={{ flexGrow: 1, textAlign: "center" }}> {/* 타이틀 */}
					<Title variant="h5" component="div">{title}</Title>	
				</Box>
					
				<Box>	{/* 우측 사용자 프로필, 메뉴 */}
					<Grid container>
						<Item>{props.name}</Item>
						<Item><Avatar src={props.image}/></Item>
						<Item><HeaderMenu></HeaderMenu></Item>
					</Grid>
				</Box>
				
			</StyledToolbar>
		</AppBar>
	);
}
