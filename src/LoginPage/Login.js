import React, { Component } from 'react';

import oc from 'open-color';
import styles from './Login.css'
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import Toolbar from '@mui/material/Toolbar';

import { Box } from '@material-ui/core';
import { Avatar } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const LoginPageTool = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    margin: 'auto 0',
	marginRight: '10px',
	padding: 3,
    width: "auto",
	
    backgroundColor: alpha(theme.palette.common.black, 0.15)

}))

// const Label = styled.div`
//     width: 100%;
//     border: 1px solid ${oc.gray[3]};
//     outline: none;
//     border-radius: 0px;
//     line-height: 2.5rem;
//     font-size: 1.2rem;
//     padding-left: 0.5rem;
//     padding-right: 0.5rem;
//     ::placeholder {
//     color: ${oc.gray[3]};
//     }
// `;

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

// const AuthButton = ({onClick}) => (
//     <Wrapper onClick={onClick}>
//     </Wrapper>
// );

// const Wrapper = styled('div') ( ({ }) => ({
//     marginTop: '1rem',
//     paddingTop: '0.6rem',
//     paddingBottom: '0.5rem',
//     background: oc.blue[6],
//     color: 'white',


// }));
class Login extends Component {


    render() {
        

        return (
            <>
            <div className={styles.background}>
                {/* <AuthButton></AuthButton> */}

                {/* <InputWithLabel 
                   placeholder="프로필 검색"
                   inputProps={{ 'aria-label': 'search' }}
                /> */}
                <LoginPageTool>
                <StyledInputBase
                placeholder="아이디"
							inputProps={{ 'aria-label': 'search' }}
                />
                <StyledInputBase
                placeholder="패스워드"
							inputProps={{ 'aria-label': 'search' }}
                />
                </LoginPageTool>
                {/* <AuthButton>로그인</AuthButton> */}
                {/* 아이디/비밀번호를 잊어버렸어요.
                회원가입 */}
          
            </div>
            </>
        );
    }
}

export default Login;