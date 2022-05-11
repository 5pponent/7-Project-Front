import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Grid from '@mui/material/Grid';
import 'react-calendar/dist/Calendar.css';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material';

export default function ScheduleApp(props) {

  const [date, setDate] = useState(new Date());
  const events=[];
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <>
      <Grid item marginTop='10%' align='center'>
        <Calendar onChange={setDate} value={date} />
      </Grid>
      <Grid align='center' marginTop='20px'>
        <TextField type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px",  justifyContent: 'center'}}  value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        
        <Button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </Button>
        <Fab size="small" color="secondary" aria-label="edit"><EditIcon /></Fab>
      </Grid>
    </>

  );
}