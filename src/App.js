import FeedLineSelect from './components/feedline/FeedLineSelect'
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Setting from './components/settingpage/Setting';
import ChatApp from './components/chat/ChatApp';
import ScheduleApp from './components/schedule/ScheduleApp';
import Template from "./components/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Alert, AlertTitle, Box, Button, Dialog, Divider, Slide, Snackbar, Stack, Typography} from "@mui/material";
import {forwardRef, useContext, useState} from "react";
import {store} from "./store/store";
import LoadingProcess from "./components/LoadingProcess";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

export default function App() {

  const [state, dispatch] = useContext(store);

  const [notice, setNotice] = useState(true);
  const handleCloseNotice = () => {setNotice(false)}

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch({type: 'CloseSnackbar'});
  }
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <BrowserRouter>

      {notice &&
        <Box style={{
          position: "fixed", top: 80, left: 20, backgroundColor: '#fff4e5'
        }} sx={{p: 1, borderRadius: 3, boxShadow: 3, zIndex: 99999}}>
          <Stack>
            <Alert severity={"warning"}>
              <AlertTitle>
                <Typography variant={"subtitle1"} fontWeight={"bold"}>
                  모두의 일기장은 현재 개발중입니다.
                </Typography>
              </AlertTitle>
              <Divider/>
              <Typography variant={"subtitle2"} my={1}>
                문제 발생 시 피드, 댓글 또는<br/>
                ahdwjdtprtm@gmail.com 로<br/>
                피드백 부탁드립니다.
              </Typography>
            </Alert>
            <Button fullWidth color={"error"} variant={"contained"}
                    onClick={handleCloseNotice}>
              닫기
            </Button>
          </Stack>
        </Box>
      }

      <Routes>
        <Route path={"/"} element={
          <Template element={<FeedLineSelect/>}/>
        }></Route>

        <Route path={"/login"} element={
          <Login/>
        }></Route>

        <Route path={"/profile"} element={
          <Template element={<Profile/>}/>
        }></Route>

        <Route path={"/chat"} element={
          <Template element={<ChatApp/>}/>
        }></Route>

        <Route path={"/schedule"} element={
          <Template element={<ScheduleApp/>}/>
        }></Route>

        <Route path={"/setting"} element={
          <Template element={<Setting/>}/>
        }></Route>

        <Route path={"/server-error"} element={
          // TODO (5xx 코드 응답 시 에러 페이지 추가)
          <p>Server Error</p>
        }></Route>

        <Route path={"*"} element={
          // TODO (존재하지 않는 라우터 경로 진입 시 에러 페이지 추가)
          <p>404 Not Found</p>
        }></Route>
      </Routes>

      {/*로딩 화면*/}
      <LoadingProcess open={state.loading.open} message={state.loading.message}/>

      {/*이미지 자세히 보기 다이얼로그*/}
      <Dialog
        open={state.imageView.open}
        onClose={() => {dispatch({type: 'CloseImageView'})}}
        onClick={() => {dispatch({type: 'CloseImageView'})}}
        maxWidth={'lg'}
      >
        <img style={{maxWidth: '800px'}} src={state.imageView.source} alt={'상세보기 이미지'}/>
      </Dialog>

      {/*알림용 스낵바*/}
      <Snackbar
        open={state.snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={state.snackbar.message}
        TransitionComponent={Transition}
        action={action}
      />

    </BrowserRouter>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" {...props} />;
});