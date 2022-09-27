// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import Grid from '@mui/material/Grid';
// import 'react-calendar/dist/Calendar.css';
// import Fab from '@mui/material/Fab';
// import EditIcon from '@mui/icons-material/Edit';
// import { Button, TextField } from '@mui/material';

// export default function ScheduleApp(props) {

//   const [date, setDate] = useState(new Date());
//   const events=[];
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
//   const [allEvents, setAllEvents] = useState(events);

//   function handleAddEvent() {
//     setAllEvents([...allEvents, newEvent]);
//   }

//   return (
//     <>
//       <Grid item marginTop='10%' align='center'>
//         <Calendar onChange={setDate} value={date} />
//       </Grid>
//       <Grid align='center' marginTop='20px'>
//         <TextField type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px",  justifyContent: 'center'}}  value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        
//         <Button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
//           Add Event
//         </Button>
//         <Fab size="small" color="secondary" aria-label="edit"><EditIcon /></Fab>
//       </Grid>
//     </>

//   );
// }


// 롤백용





import React, { useState } from 'react';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, DialogContent } from '@mui/material';
import { Dialog } from '@material-ui/core';
import ScheduleAdd from './ScheduleAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';





export default function ScheduleApp(props) {
    
    function createData(seqence, title, place, time, date, memo) {
      return { seqence, title, place, time, date, memo };
    }

    const rows = [
      createData(1, '건대 저녁약속', '기러기 둥지', '18시', '00/00(화)', '홍길동'),
      createData(2, '홍대 점심약속', '마시타야', '11시', '00/00(토)', '김현수'),
      createData(3, '일본여행', '오사카', '17시', '00/00(금) - 00/00(화)', '17시까지 공항, 금 20시 비행기, 화 15시 비행기'),
      createData(4, '신림 저녁약속', '광명대창집','20시', '00/00(일)', '가족식사'),
      createData(5, '미쁘동 점심약속', '연남동', '14시', '00/00(화)', '늦으면 웨이팅해야함'),
    ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClickClose = () => {
        setOpen(false);
    }


    const events=[];

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });


    return(

      <Grid container alignItems="center" width='1000px' margin='auto' marginTop='25px' >
        <TableContainer component={Grid}>
          <Table >
            <TableHead>
              <TableRow variant="h4">
                <TableCell></TableCell>
                <TableCell >일정</TableCell>
                <TableCell >장소</TableCell>
                <TableCell >시간</TableCell>
                <TableCell >날짜</TableCell>
                <TableCell align='center'>메모</TableCell>
                <TableCell>
                  <DeleteIcon value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
                    
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow> 
                
                <TableCell >{row.seqence}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.place}</TableCell>
                <TableCell >{row.time}</TableCell>
                <TableCell >{row.date}</TableCell>
                <TableCell >{row.memo}</TableCell>
                <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          
                        />
                      </TableCell>
                </TableRow>
            ))}
            </TableBody>
          </Table>

        </TableContainer>



        <Grid marginLeft="420px"> 
          <Button onClick={handleClickOpen}>Add Event</Button>
            <Dialog open={open} onClose={handleClickClose}>
              <DialogContent>
                <ScheduleAdd getCalendar={props.getCalendar}></ScheduleAdd>
              </DialogContent>
            </Dialog>
        </Grid>
        
        
      </Grid>
    );
    
}

