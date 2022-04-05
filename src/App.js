import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Member from './components/Member';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from './components/CircularProgress';
import { TableContainer } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

function App() {
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      const result = await axios("./7-Project/members");
      setMembers(result.data);
    };
    fetchMembers();
  },[]);

  const stateRefresh = async () => {
    const result = await axios.get("./7-Project/members");
    setMembers(result.data);
  }
  
  return (
    <TableContainer>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell><TableCell>이미지</TableCell>
              <TableCell>이름</TableCell><TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell><TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members ? members.map((m) => {
              return(
                <Member
                  key={m.id}
                  id={m.id}
                  image={m.image}
                  name={m.name}
                  birthday={m.birthday}
                  gender={m.gender}
                  job={m.job}
                  stateRefresh={stateRefresh}
                />
              );
            }) : <TableRow>
                <CircularProgress></CircularProgress>
              </TableRow>}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
}

export default App;
