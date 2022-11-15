import {Box, IconButton, Menu, MenuItem, MenuList, Stack, styled, Typography} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, {useContext, useState} from "react";
import {store} from "../../store/store";
import customAxios from "../../AxiosProvider";

const Content = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: break-all;
`

export default function Notification({lastNotice}) {

  const [state, dispatch] = useContext(store);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [notices, setNotices] = useState([]);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    customAxios.get(`/notice`)
      .then(res => {
        console.log(res.data.notices);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setNotices(res.data.notices);
      })
      .catch(err => {console.log(err)})
      .finally(() => {
        dispatch({type: 'Notification', payload: false});
      });
  }
  const handleClickNotification = (type) => {
    // TODO 알림 눌렀을 때 로직
    let typeAndId = type.split('/');
  }

  return(
    <>
      <IconButton onClick={handleOpen}>
        <NotificationsIcon sx={{fontSize: 24, color: "#FCFCFC"}}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {setAnchorEl(null)}}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      >
        <Stack>
          <MenuList>
            {
              notices.length > 0 ?
                notices.map(it => {
                  return(
                    <MenuItem key={it.id} onClick={() => handleClickNotification(it.type)}>
                      <Stack maxWidth={300}>
                        <Content variant={"subtitle2"}>
                          <strong>{it.content.split("|")[0]}</strong>
                          {it.content.split("|")[1]}
                        </Content>
                        <Content variant={"caption"} sx={{color: "gray"}}>{it.createTime}</Content>
                      </Stack>
                    </MenuItem>
                  );
                })
                :
                <Box px={2}>
                  <Typography variant={"subtitle2"}>알림이 없습니다.</Typography>
                </Box>
            }
          </MenuList>
        </Stack>
      </Menu>
    </>
  );
}