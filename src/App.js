import FeedLineSelect from './components/feedline/FeedLineSelect'
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Setting from './components/settingpage/Setting';
import ChatApp from './components/chatting/ChatApp';
import ScheduleApp from './components/schedule/ScheduleApp';
import Template from "./Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Snackbar} from "@mui/material";
import {useContext} from "react";
import {store} from "./store/store";

export default function App() {

  const [state, dispatch] = useContext(store);

  return (
    <BrowserRouter>
      <Routes>

        <Route path={"/"} element={
          <Template element={<FeedLineSelect/>}/>
        }></Route>

        <Route path={"/login"} element={
          <Login/>
        }></Route>

        <Route path={"/profile"} element={
          <Template element={<Profile/>}/>
        }></Route>

        <Route path={"/chat"} element={
          <Template element={<ChatApp/>}/>
        }></Route>

        <Route path={"/schedule"} element={
          <Template element={<ScheduleApp/>}/>
        }></Route>

        <Route path={"/setting"} element={
          <Template element={<Setting/>}/>
        }></Route>

        <Route path={"*"} element={
          <p>404 Not Found</p>
        }></Route>

      </Routes>
      <Snackbar
        open={state.snackbar.open}
        autoHideDuration={5000}
        onClose={() => {dispatch({type: 'CloseSnackbar'});}}
        message={state.snackbar.message}
      />
    </BrowserRouter>
  );
}

