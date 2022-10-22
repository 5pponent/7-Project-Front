import React, {useContext, useEffect, useState} from "react";
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import {
  Avatar, Button,
  DialogContent,
  DialogTitle, FormControl,
  IconButton, InputLabel, MenuItem, Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow, TextField, Typography
} from "@mui/material";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";

export default function ProfileUpdateDialog(props) {

  const [state, dispatch] = useContext(store);
  const [user, setUser] = useState({
    email: '',
    followerCount: 0,
    followingCount: 0,
    id: 0,
    image: null,
    interests: [],
    name: '',
    message: '',
    occupation: null
  });
  const [image, setImage] = useState(null);
  const [updateName, setUpdateName] = useState(false);
  const [name, setName] = useState('');
  const [updateMessage, setUpdateMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [occupation, setOccupation] = useState('');
  const [occupationList, setOccupationList] = useState([]);

  const onChangeImage = (e) => {setImage(e.target.files[0])}
  const handleClickCancelImageUpload = (e) => {setImage(null)}
  const handleClickUploadProfileImage = (e) => {
    dispatch({type: 'OpenLoading', payload: "프로필 사진을 업데이트중입니다.."});
    let form = new FormData();
    form.append("image", image);
    customAxios.put("/user/profile-image", form)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: "프로필 사진을 수정했습니다."});
        dispatch({type: 'User', payload: res.data});
        setUser(res.data);
        setImage(null);
        props.reloadUser();
      })
      .catch(err => console.error(err.response))
      .finally(() => dispatch({type: 'CloseLoading'}));
  }
  const handleClickConfirm = () => {props.handleCloseDialog(false)}
  const handleChangeName = (e) => {setName(e.target.value)}
  const handleClickUpdateName = () => {
    if (updateName) {
      if (name === user.name) setUpdateName(false);
      else {
        dispatch({type: 'OpenLoading', payload: "이름을 수정 중입니다.."});
        customAxios.put('/user/name', {name: name})
          .then(res => {
            dispatch({type: 'OpenSnackbar', payload: "이름을 수정했습니다."});
            setUpdateName(false);
            setUser(res.data);
            props.reloadUser();
          })
          .catch(err => console.log(err.response))
          .finally(() => dispatch({type: 'CloseLoading'}));
      }
    }
    else setUpdateName(true);
  }
  const handleCancelUpdateName = () => {
    setName(user.name);
    setUpdateName(false);
  }
  const handleChangeMessage = (e) => {setMessage(e.target.value)}
  const handleClickUpdateMessage = () => {
    if (updateMessage) {
      if (message === user.message) setUpdateMessage(false);
      else {
        dispatch({type: 'OpenLoading', payload: "오늘의 한마디를 수정 중입니다.."});
        customAxios.put('/user/message', {message: message})
          .then(res => {
            dispatch({type: 'OpenSnackbar', payload: "오늘의 한마디를 수정했습니다."});
            setUpdateMessage(false);
            setUser(res.data);
            props.reloadUser();
          })
          .catch(err => console.log(err.response))
          .finally(() => dispatch({type: 'CloseLoading'}));
      }
    }
    else setUpdateMessage(true);
  }
  const handleCancelUpdateMessage = () => {
    setMessage(user.message);
    setUpdateMessage(false);
  }
  const handleChangeOccupation = (e) => {setOccupation(e.target.value)}
  const handleUpdateOccupation = () => {
    dispatch({type: 'OpenLoading', payload: "직종을 수정중입니다.."});
    customAxios.put('/user/occupation', {occupation: occupation})
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: "직종을 수정했습니다."});
        setUser(res.data);
        props.reloadUser();
      })
      .catch(err => console.log(err.response))
      .finally(() => dispatch({type: 'CloseLoading'}));
  }

  useEffect(() => {
    customAxios.get(`/user`)
      .then(res => {
        setName(res.data.name);
        setMessage(res.data.message);
        setOccupation(res.data.occupation);
        setUser(res.data);
      })
      .catch(err => console.log(err.response));
    customAxios.get(`/occupation`)
      .then(res => {
        setOccupationList(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <DialogTitle>내 프로필 변경하기</DialogTitle>
      <DialogContent>
        <Table><TableBody>

          <TableRow>
            <TableCell>프로필 사진</TableCell>
            <TableCell>
              <Stack alignItems={"flex-start"} spacing={2}>
                <Stack direction={"row"} alignItems={"center"}>
                  <IconButton aria-label="update profile image" component="label">
                    <Stack alignItems={"center"}>
                      <input hidden accept="image/*" type="file" onChange={onChangeImage}/>
                      <Avatar src={user.image ? user.image.source : ''} sx={{width: 56, height: 56}}/>
                      <Typography variant={"subtitle2"} fontSize={11}>클릭하여 변경</Typography>
                    </Stack>
                  </IconButton>
                  { image &&
                    <>
                      <ForwardRoundedIcon sx={{fontSize: 40, mb: 2, mr: 1, color: "gray"}}/>
                      <Stack alignItems={"center"}>
                        <Avatar src={image ? URL.createObjectURL(image) : ""} sx={{width: 56, height: 56}}/>
                        <Typography variant={"subtitle2"} fontSize={11}>미리보기</Typography>
                      </Stack>
                    </>
                  }
                </Stack>
                { image &&
                  <Stack>
                    <Typography fontSize={14}>이렇게 프로필 사진을 변경하실래요?</Typography>
                    <Stack direction={"row"} justifyContent={"center"}>
                      <Button onClick={handleClickUploadProfileImage}>네!</Button>
                      <Button color={"error"} onClick={handleClickCancelImageUpload}>취소</Button>
                    </Stack>
                  </Stack>
                }
              </Stack>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                <TextField variant={"standard"} size={"small"} disabled={!updateName}
                           inputProps={{autocomplete: "off"}} value={name} onChange={handleChangeName}
                           helperText={updateName ? '이름을 변경합니다.' : ''}
                />
                <Stack>
                  <Button size={"small"} onClick={handleClickUpdateName}>변경</Button>
                  { updateName &&
                    <Button size={"small"} color={"error"} onClick={handleCancelUpdateName}>취소</Button>
                  }
                </Stack>
              </Stack>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>메시지</TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                <TextField variant={"standard"} size={"small"} disabled={!updateMessage}
                           inputProps={{autocomplete: "off"}} value={message} onChange={handleChangeMessage}
                           helperText={updateMessage ? '오늘의 한마디를 작성해보세요.' : ''}
                />
                <Stack>
                  <Button size={"small"} onClick={handleClickUpdateMessage}>변경</Button>
                  { updateMessage &&
                    <Button size={"small"} color={"error"} onClick={handleCancelUpdateMessage}>취소</Button>
                  }
                </Stack>
              </Stack>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>직종</TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                <FormControl fullWidth size={"small"}>
                  <InputLabel id="occupation-select-label-id">재직분야</InputLabel>
                  <Select
                    labelId={"occupation-select-label-id"}
                    label={"재직분야"}
                    value={occupation}
                    onChange={handleChangeOccupation}
                  >
                    { occupationList.map((o) => {
                      return (
                        <MenuItem value={o.name}>{o.name}</MenuItem>
                      )})
                    }
                  </Select>
                </FormControl>
                <Button onClick={handleUpdateOccupation}>변경</Button>
              </Stack>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>관심분야</TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                {state.user.interests}
                <Button variant={"outlined"}>선택하기</Button>
              </Stack>
            </TableCell>
          </TableRow>

        </TableBody></Table>
        <Stack alignItems={"center"} mt={2}>
          <Button variant={"contained"} color={"success"} onClick={handleClickConfirm}>확인</Button>
        </Stack>
      </DialogContent>
    </>
  );
}
