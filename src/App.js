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

function MemberCreate() {
  return(
    <div>
      <h2>Insert New Member</h2>
      <form onSubmit={e => {
        e.preventDefault();
        axios.post("./7-Project/CreateMember", {
          image: e.target.image.value,
          name: e.target.name.value,
          birthday: e.target.birthday.value,
          gender: e.target.gender.value,
          job: e.target.job.value
        })
        .then(function(response) {
          alert("입력 성공");
        })
      }}>
        <p><input type="text" name="image" placeholder="image"/></p>
        <p><input type="text" name="name" placeholder="name"/></p>
        <p><input type="text" name="birthday" placeholder="birthday"/></p>
        <p><input type="text" name="gender" placeholder="gender"/></p>
        <p><input type="text" name="job" placeholder="job"/></p>
        <p><input type="submit" value="Create"/></p>
      </form>
    </div>
  );
}

function App() {
  const classes = useStyles();
  const [members, setMembers] = useState();

  async function fetchMembers() {
    const result = await axios.get("./7-Project/members");
    setMembers(result.data);
  };

  // If Data changes are detected, execute this
  useEffect(() => {
    fetchMembers();
  });
  
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
            { members ? members.map((m) => {
              return(
                <Member
                  key={m.id}
                  id={m.id}
                  image={m.image}
                  name={m.name}
                  birthday={m.birthday}
                  gender={m.gender}
                  job={m.job}
                />
              );
            }) : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress></CircularProgress>
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
        <MemberCreate></MemberCreate>
      </Paper>
    </TableContainer>
  );
}

export default App;
