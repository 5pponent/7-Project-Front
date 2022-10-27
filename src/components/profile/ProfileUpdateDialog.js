import React, {useContext, useEffect, useState} from "react";
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";
import {
  Avatar, Box, Button, Chip,
  DialogContent,
  DialogTitle, FormControl,
  IconButton, InputLabel, MenuItem, OutlinedInput, Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow, TextField, Typography
} from "@mui/material";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CircularProgress from "@mui/material/CircularProgress";

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
  const [interests, setInterests] = useState([]);

  const onChangeImage = (e) => {setImage(e.target.files[0])}
  const handleClickCancelImageUpload = () => {setImage(null)}
  const handleClickUploadProfileImage = () => {
    dispatch({type: 'OpenLoading', payload: "프로필 사진을 업데이트중입니다.."});
    let form = new FormData();
    form.append("image", image);
    customAxios.put("/user/profile-image", form)
      .then(res => {
        console.log(res.data)
        dispatch({type: 'OpenSnackbar', payload: "프로필 사진을 수정했습니다."});
        dispatch({type: 'User', payload: res.data});
        setUser(res.data);
        setImage(null);
        props.reloadUser();
      })
      .catch(err => console.error(err.response))
      .finally(() => dispatch({type: 'CloseLoading'}));
  }
  const handleClickDefaultImage = () => {
    dispatch({type: 'OpenLoading', payload: "프로필 사진을 업데이트중입니다.."});
    customAxios.delete(`/user/profile-image`)
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: "기본 사진으로 변경했습니다."});
        dispatch({type: 'User', payload: res.data});
        setUser(res.data);
        setImage(null);
        props.reloadUser();
      })
      .catch(err => {console.error(err.response)})
      .finally(() => dispatch({type: 'CloseLoading'}));
  }
  const handleClickCancel = () => {props.handleCloseDialog(false)}
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
  const handleChangeInterests = (event) => {
    const {target: {value}} = event;
    if (value.length > 3) return;
    setInterests(
      typeof value === 'string' ? value.split(',') : value
    );
  }
  const handleUpdateInterests = () => {
    if (state.user.interests)
    dispatch({type: 'OpenLoading', payload: "관심 분야를 수정중입니다.."});
    customAxios.put(`/user/interests`, {interests: interests})
      .then(res => {
        dispatch({type: 'OpenSnackbar', payload: "관심분야를 수정했습니다."});
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
        setInterests(res.data.interests);
        setUser(res.data);
      })
      .catch(err => console.log(err.response));
    customAxios.get(`/occupation`)
      .then(res => setOccupationList(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <DialogTitle>내 프로필 변경하기</DialogTitle>
      {user.id === 0 ?
        <Stack alignItems={"center"} width={300} height={400} justifyContent={"center"}>
          <CircularProgress size={60} />
        </Stack>
        :
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
                    { image ?
                      <>
                        <ForwardRoundedIcon sx={{fontSize: 40, mb: 2, mr: 1, color: "gray"}}/>
                        <Stack alignItems={"center"}>
                          <Avatar src={image ? URL.createObjectURL(image) : ""} sx={{width: 56, height: 56}}/>
                          <Typography variant={"subtitle2"} fontSize={11}>미리보기</Typography>
                        </Stack>
                      </>
                      :
                      <Button onClick={handleClickDefaultImage}>기본 사진으로 변경</Button>
                    }
                  </Stack>
                  { image &&
                    <Stack>
                      <Typography fontSize={14}>이렇게 프로필 사진을 변경하실래요?</Typography>
                      <Stack direction={"row"} justifyContent={"center"}>
                        <Button onClick={handleClickUploadProfileImage}>네!</Button>
                        <Button color={"error"} onClick={handleClickCancelImageUpload}>아니요?</Button>
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
                  <TextField variant={"standard"} size={"small"} disabled={!updateName} fullWidth
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
              <TableCell>한마디</TableCell>
              <TableCell>
                <Stack direction={"row"} alignItems={"center"}>
                  <TextField variant={"standard"} size={"small"} disabled={!updateMessage}
                             inputProps={{autocomplete: "off", maxLength: 100}}
                             value={message} onChange={handleChangeMessage}
                             maxRows={5} multiline fullWidth
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
                  <FormControl fullWidth>
                    <InputLabel id="occupation-select-label-id">재직분야</InputLabel>
                    <Select
                      labelId={"occupation-select-label-id"}
                      label={"재직분야"}
                      value={occupation}
                      onChange={handleChangeOccupation}
                      MenuProps={MenuProps}
                    >
                      {occupationList.map((o) => {
                        return (<MenuItem key={o.id} value={o.name}>{o.name}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>
                  <Button onClick={handleUpdateOccupation} disabled={occupation === state.user.occupation}>
                    변경</Button>
                </Stack>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>관심분야</TableCell>
              <TableCell>
                <Typography variant={"caption"} color={"gray"}>
                  관심분야는 최대 3개까지 선택 가능합니다.
                </Typography>
                <Stack direction={"row"} mt={1}>
                  <FormControl fullWidth sx={{width: 195}}>
                    <InputLabel id="multiple-chip-label">관심 분야</InputLabel>
                    <Select
                      labelId="multiple-chip-label"
                      id="multiple-chip"
                      multiple
                      value={interests}
                      onChange={handleChangeInterests}
                      input={<OutlinedInput id="select-multiple-chip" label="관심 분야"/>}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (<Chip key={value} label={value} />))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {occupationList.map((it) => {
                        return (
                          <MenuItem
                            key={it.name}
                            value={it.name}
                          >
                            {interests.includes(it.name) ?
                              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                <CheckRoundedIcon sx={{fontSize: 16}}/>
                                <Typography fontWeight={"bold"}>
                                  {it.name}
                                </Typography>
                              </Stack>
                              :
                              <Typography>
                                {it.name}
                              </Typography>
                            }
                          </MenuItem>
                        )})
                      }
                    </Select>
                  </FormControl>
                  <Button onClick={handleUpdateInterests} disabled={
                    JSON.stringify(interests) === JSON.stringify(user.interests)
                  }>변경</Button>
                </Stack>
              </TableCell>
            </TableRow>

          </TableBody></Table>
          <Stack alignItems={"center"} mt={2}>
            <Button variant={"outlined"} color={"error"} onClick={handleClickCancel}>닫기</Button>
          </Stack>
        </DialogContent>
      }
    </>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};