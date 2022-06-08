import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogContent, Divider, Grid, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiSwitch from "../MUISwitch";

const Label = styled(Typography)(() => ({
	fontSize: '14px',
	color: 'gray',
}));

const Item = styled(Grid)(() => ({
	marginTop: '8px',
	marginBottom: '8px',
}));

export default function Setting(props) {
	const [lightMode, setLightMode] = useState(false);
	const [panel, setPanel] = useState(false);
	const [open, setOpen] = useState(false);
	const [info, setInfo] = useState({
		name: props.name,
		email: props.email,
		id: props.id,
	});
	const handleChangeDisplay = (e) => {
		setLightMode(e.target.checked);
		console.log(lightMode);
	};
	const handleChangePanel = (p) => (e, isExpanded) => { setPanel(isExpanded ? p : false); };
	const handleClickChangePW = () => { setOpen(true); };
	const handleCloseChangePW = () => { setOpen(false); };
	
	return (
		<>
			<Paper elevation={3} sx={{ width: '600px', margin: '0 auto', marginTop: '50px', padding: '40px' }}>
				<Typography variant='h5' margin='20px 0'>설정</Typography>
				<Divider sx={{marginTop: 3, marginBottom: 3}}/>
				<MuiSwitch name='디스플레이 모드' checked={lightMode} onClick={handleChangeDisplay} marginBottom={3}/>
				<Accordion expanded={panel === 'panel1'} onChange={handleChangePanel('panel1')}>
					<AccordionSummary expandIcon={<ExpandMoreIcon/>}>개인 정보 설정</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Item item xs={3}><Label>이름</Label></Item>
							<Item item xs={9}>
								{info.name}
							</Item>
							<Item item xs={3}><Label>Email</Label></Item>
							<Item item xs={9}>
								{info.email}
							</Item>
							<Item item xs={3}><Label>ID</Label></Item>
							<Item item xs={9}>
								{info.id}
							</Item>
							<Item item xs={3}><Label>PW</Label></Item>
							<Item item xs={9}>
								<Button size='small' onClick={handleClickChangePW}>변경</Button>
							</Item>
							<Item item xs={3}><Label>재직 분야</Label></Item>
							<Item item xs={9}>
								
							</Item>
							<Item item xs={3}><Label>관심 분야</Label></Item>
							<Item item xs={9}>
								
							</Item>
							<Item item xs={3}><Label>프로필 공개</Label></Item>
							<Item item xs={9}>
								
							</Item>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={panel === 'panel2'} onChange={handleChangePanel('panel2')}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
			<Dialog open={open} onClose={handleCloseChangePW}>
				<DialogContent>
					<ChangePW></ChangePW>
					<Button color='error' onClick={handleCloseChangePW} fullWidth>취소</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}

function ChangePW() {

  return(
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
