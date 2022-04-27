import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import { Grid , Paper, FormControlLabel, TextField, Checkbox, Button, Link } from '@material-ui/core';


// const LoginPageTool = styled('div')(({theme}) => ({
//     display: 'flex',
//     justifyContent:'center',
//     alignItems:'center',
//     margin: 'auto 0',
// 	marginRight: '10px',
// 	padding: 3,

    
	
//     backgroundColor: alpha(theme.palette.common.white, 0.15)

// }))

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',

//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     [theme.breakpoints.up('sm')]: {
//       width: 'auto'
//     },
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(3)})`,
//           width: '100%'
//     },
// }));

// const Title = styled(Typography)(() => ({
// 	fontSize: '20px',
// 	fontWeight: 'bold',
// }));

  

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

// Generate JSX code for error message

// class Login extends Component {

    

//     render() {
        
//         const title = "모두의 일기장";

//         const paperStyle={padding:20, hegiht:'70vh', widht:260, margin: "20px auto", justifyContent:'center', alignItems:'center'}


//         return (
//             <>
//             <div className={styles.background}>
//                 {/* <AuthButton></AuthButton> */}

//                 {/* <InputWithLabel 
//                    placeholder="프로필 검색"
//                    inputProps={{ 'aria-label': 'search' }}
//                 /> */}
//                 <Grid align='center'>
//                     <Paper elecation={10} style={paperStyle}>
//                         <Grid align='center'>
//                             {/* 로고 */}
//                             <h2>Sign In</h2>
//                         </Grid>
//                         <TextField label='Username' placeholder='Ender username' fullwidth required/>
//                         <TextField label='Password' placeholder='Ender password' type='password' fullwidth required/>
//                         <FormControlLabel
//                             control={
//                             <Checkbox
//                                 name="checkkedB"
//                                 color="primary"
//                                 fullwidth
//                             />
//                             }
//                             label="Remember me"
//                         />
//                         <Button type='submit' color='primary' fullwidth>Sign in</Button>
//                     </Paper>
//                 </Grid>    
//                     {/* <LoginPageTool>
//                         <StyledInputBase
//                             placeholder="아이디"
//                             inputProps={{ 'aria-label': 'search' }}
//                         />
//                         <StyledInputBase
//                             placeholder="패스워드"
//                             inputProps={{ 'aria-label': 'input' }}
//                         />
//                     </LoginPageTool> */}
//                     {/* <AuthButton>로그인</AuthButton> */}
//                     {/* 아이디/비밀번호를 잊어버렸어요.
//                     회원가입 */}
                
//             </div>
//             </>
//         );
//     }
// }

const Login=()=> {


        const Gridstyle={margin: "100px 0px 500px 500px" , width: "350px", height:"200px"}
        const paperStyle={display:'flex',flexDirection:'column',padding:20, hegiht:'70vh', widht:280, margin: "20px auto"}


        return (
            <>
                <Grid style={Gridstyle}>
                    <Paper elecation={10} style={paperStyle}>
                        <Grid align='center'>
                            {/* 로고 */}
                            <h2>Sign In</h2>
                        </Grid>
                        <TextField label='Username' placeholder='Ender username' fullwidth required/>
                        <TextField label='Password' placeholder='Ender password' type='password' fullwidth required/>
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="checkkedB"
                                color="primary"
                                fullwidth
                            />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' fullwidth>Sign in</Button>
                        <Typography>
                            Do you have an account?
                            <Link href="#">Sign Up</Link>  
                        </Typography>
                    </Paper>
                </Grid>
                
         
            </>
    )
}

export default Login;