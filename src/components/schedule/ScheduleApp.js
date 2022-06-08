import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Grid from '@mui/material/Grid';
import 'react-calendar/dist/Calendar.css';
import { Button, DialogContent } from '@mui/material';
import { Dialog } from '@material-ui/core';
import ScheduleAdd from './ScheduleAdd';


export default function ScheduleApp(props) {

 
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClickClose = () => {
        setOpen(false);
    }
    const handleClickAdd = () => {
        props.getCalendar(true);
    }


    return (
        <div>
            
            <Grid item marginTop='10%' align='center'>
                <Calendar/>
            </Grid>
            <Grid align='center' marginTop='20px'>
                <Button stlye={{ marginTop: "10px" }} onClick={handleClickOpen}>Add Event</Button>
                <Dialog open={open} onClose={handleClickClose}>
                  <DialogContent>
                    <ScheduleAdd getCalendar={props.getCalendar}></ScheduleAdd>
                  </DialogContent>
                </Dialog>
            </Grid>
        </div>

    );
}