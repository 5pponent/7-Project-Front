import React, { Component, useState } from 'react';

import Typography from '@mui/material/Typography';
import { Grid , Paper, FormControlLabel, TextField, Checkbox, Button, Link } from '@material-ui/core';
import { Dialog, DialogContent } from '@mui/material';
import Register from './Register'


const Login=()=> {

  const [open, setOpen] = useState(false);
  const gridstyle={margin: "auto auto" , width: "350px", height:"200px"}
  const paperStyle={display:'flex',flexDirection:'column',padding:20, hegiht:'70vh', widht:280, margin: "20px auto"}

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }

  return (
      <>
        <Grid style={gridstyle}>
          <Paper elecation={0} style={paperStyle}>
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
              <Button onClick={handleClickOpen}>Sign Up</Button>  
            </Typography>
          </Paper>
        </Grid>
        <Dialog open={open} onClose={handleClickClose} fullWidth={true}>
          <DialogContent>
            <Register></Register>
          </DialogContent>
        </Dialog>
      </>
  )
}

export default Login;