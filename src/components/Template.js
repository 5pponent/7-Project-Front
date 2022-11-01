import HeaderAppBar from "./header/HeaderAppBar";
import ScrollTop from "./ScrollTop";
import {useContext, useEffect} from "react";
import {store} from "../store/store";
import customAxios from "../AxiosProvider";
import {Box} from "@mui/material";

export default function Template(props) {
  const [state, dispatch] = useContext(store);

  useEffect(() => {
    customAxios.get("/user")
      .then(res => {dispatch({type: 'User', payload: res.data});})
      .catch(err => {console.log(err.response);});
  }, [])

  return (
    <>
      <HeaderAppBar/>

      <Box mt={3}>
        {props.element}
      </Box>
    </>
  );
}