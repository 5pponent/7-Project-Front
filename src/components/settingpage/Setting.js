import {useContext, useState} from "react";
import axios from 'axios';
import {store} from "../../store/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Alert, AlertTitle,
  Button, Checkbox,
  Dialog,
  DialogContent,
  Divider, FormControlLabel,
  Grid,
  Paper,
  Stack,
  styled,
  TextField,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiSwitch from "../MUISwitch";
import {useNavigate} from "react-router-dom";

const Label = styled(Typography)(() => ({
  fontSize: '14px',
  color: 'gray',
}));

export default function Setting(props) {
  const [state, dispatch] = useContext(store);

  let navigate = useNavigate();

  const [lightMode, setLightMode] = useState(false);
  const [panel, setPanel] = useState('');
  const [changePwOpen, setChangePwOpen] = useState(false);
  const [checkPwOpen, setCheckPwOpen] = useState(false);
  const [password, setPassword] = useState({password: ''});
  const [pwErrorMessage, setPwErrorMessage] = useState('');

  const handleChangeDisplay = (e) => {
    setLightMode(e.target.checked);
    console.log(lightMode);
  };
  const handleChangePanel = (p) => (e, isExpanded) => {
    setPanel(isExpanded ? p : false);
  };
  const handleClickChangePW = () => {setChangePwOpen(true)};
  const handleCloseChangePW = () => {setChangePwOpen(false)};
  const handleClickSignOut = () => {setCheckPwOpen(true)};
  const handleCloseSignOut = () => {
    setCheckPwOpen(false);
    setPwErrorMessage('');
    setPassword({password: ''});
  };
  const handleChangePW = (e) => {setPassword({password: e.target.value})};
  const signOutValid = () => {
    let validate = true;
    if (!password.password) {
      setPwErrorMessage('비밀번호를 입력해 주세요.');
      validate = false;
    } else setPwErrorMessage('')
    return validate;
  };
  const signOut = async () => {
    signOutValid() &&
    await axios.delete(`/user`, {
      headers: {authorization: localStorage.getItem('token')},
      data: password
    })
      .then(res => {
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch(error => {
        setPwErrorMessage(error.response.data.message);
        console.error(error.response);
      });
  };

  return (
    <>
      <Paper elevation={3} sx={{width: '600px', margin: '0 auto', marginTop: '50px', padding: '40px'}}>
        <Typography variant='h5' margin='20px 0'>설정</Typography>
        <Divider sx={{marginTop: 3, marginBottom: 3}}/>
        <MuiSwitch name='디스플레이 모드' checked={lightMode} onClick={handleChangeDisplay} marginBottom={3}/>
        <Accordion expanded={panel === 'panel1'} onChange={handleChangePanel('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>개인 정보 설정</AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems={"center"} spacing={2}>

              <Grid item xs={3}>
                <Label>이름</Label>
              </Grid>

              <Grid item xs={9}>
                {state.user.name}
              </Grid>

              <Grid item xs={3}>
                <Label>Email</Label>
              </Grid>
              <Grid item xs={9}>
                {state.user.email}
              </Grid>

              <Grid item xs={3}>
                <Label>PW</Label>
              </Grid>
              <Grid item xs={9}>
                <Button size='small' onClick={handleClickChangePW}>변경</Button>
              </Grid>

              <Grid item xs={3}>
                <Label>재직 분야</Label>
              </Grid>
              <Grid item xs={9}>
                {state.user.occupation}
              </Grid>

              <Grid item xs={3}>
                <Label>관심 분야</Label>
              </Grid>
              <Grid item xs={9}>
                {state.user.interests}
              </Grid>

              <Grid item xs={3}>
                <Label>프로필 공개</Label>
              </Grid>
              <Grid item xs={9}>

              </Grid>

              <Grid item xs={3}>
                <Label>회원 탈퇴</Label>
              </Grid>
              <Grid item xs={9}>
                <Button size='small' color={"error"} onClick={handleClickSignOut}>탈퇴</Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={panel === 'panel2'} onChange={handleChangePanel('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography>개인정보 처리 방침</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Dialog open={changePwOpen} onClose={handleCloseChangePW}>
        <DialogContent>
          <ChangePW/>
          <Button color='error' onClick={handleCloseChangePW} fullWidth>취소</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={checkPwOpen} onClose={handleCloseSignOut}>
        <DialogContent>
          <CheckPW handleChangePW={handleChangePW} signOut={signOut} pwErrorMessage={pwErrorMessage}/>
          <Button variant={"outlined"} onClick={handleCloseSignOut} fullWidth>취소</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ChangePW() {
  return (
    <Stack spacing={2} sx={{marginBottom: '6px'}}>
      <Typography variant='h5' fontWeight='bold'>비밀번호 변경</Typography>

      <Stack spacing={1}>
        <TextField fullWidth label='기존 PW' type='password'/>
        <TextField fullWidth label='새 PW' type='password'/>
        <TextField fullWidth label='새 PW 확인' type='password'/>
        <Button type='submit' variant='contained' color='success'>변경하기</Button>
      </Stack>
    </Stack>
  )
}

function CheckPW(props) {
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => { setChecked(!checked); }

  return (
    <Stack spacing={2} sx={{marginBottom: '6px'}}>
      <Alert severity={"error"}>
        <AlertTitle>
          <Typography fontSize={"larger"} fontWeight='bold'>회원 탈퇴</Typography>
        </AlertTitle>
        <Typography variant={"subtitle2"}>
          탈퇴한 회원은 복구할 수 없습니다.
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography variant={"subtitle2"}>그래도 탈퇴하실래요?</Typography>
          <FormControlLabel
            control={<Checkbox size={"small"} checked={checked} onChange={handleCheckbox}/>}
            label={<Typography variant={"subtitle2"}>네</Typography>}
          />
        </Stack>
      </Alert>

      { checked &&
        <>
          <TextField
            fullWidth
            label='PW'
            type='password'
            onChange={props.handleChangePW}
            error={props.pwErrorMessage}
            helperText={props.pwErrorMessage}
          />
          <Button type='submit' variant='outlined' color='error' onClick={props.signOut}>회원 탈퇴</Button>
        </>
      }
    </Stack>
  )
}