import React from "react";
import Grid from '@mui/material/Grid';
import FriendList from './FriendList';


export default function FriendApp(props){


    return(
      <>
        <Grid container width='1000px' margin='auto' marginTop='25px' justifyContent="center">
          <Grid>  
            <FriendList />
					</Grid>
          
        </Grid>
      </>
    )

};