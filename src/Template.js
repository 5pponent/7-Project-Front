import {Box, Fab, Toolbar} from "@mui/material";
import HeaderAppBar from "./components/header/HeaderAppBar";
import ScrollTop from "./components/ScrollTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {store} from "./store/store";
import customAxios from "./AxiosProvider";

export default function Template(props) {
  const [state, dispatch] = useContext(store);

  let navigate = useNavigate();

  useEffect(() => {
    customAxios.get("/user")
      .then(res => {
        dispatch({type: 'User', payload: res.data});
      })
      .catch(err => {
        navigate("/login");
        console.log(err.response);
      });
  }, [])

  return (
    <Box>
      <Toolbar id="back-to-top-anchor"/>

      <HeaderAppBar/>

      <Box sx={{marginTop: 2}}>
        {props.element}
      </Box>

      <ScrollTop>
        <Fab size="large" color='primary'>
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>
    </Box>
  );
}