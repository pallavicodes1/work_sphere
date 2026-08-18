import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import useAuth from '../../auth';
import {userLogout } from '../../app/user/userSlice';
import { removeUserTask } from '../../app/user/taskSlice';
import { removeOProjects } from '../../app/user/projectSlice';
import { removeCurrentProject } from '../../app/user/currentProjectSlice';

export default function NavBar() {
  const user=useSelector((state)=>state.userReducer.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {request}=useAuth();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   const handleLogOut = async() => {
    handleClose();
       await request.post("/logout");
        dispatch(userLogout());
        dispatch(removeUserTask());
        dispatch(removeCurrentProject());
        dispatch(removeOProjects());
       enqueueSnackbar("Logged out successfully",{
        variant: "error",
        style: {
           backgroundColor: "rgb(34, 33, 33)",
           color: "white",
        },
      });
        navigate("/");
  };
  const handleProfileClick=()=>{
    navigate('/app/profile')
    handleClose()
  }
  return (
    <>
     <Box sx={{ px: { xs: 2, md: 5 }, flex: 1,py:4}}>
      <AppBar position="static" sx={{bgcolor:"white",p:1,borderRadius:"12px",borderColor:"rgb(229, 231, 235)"}} elevation={0}>
        <Toolbar>
         <Box sx={{flexGrow:1}}></Box>
         <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Stack
            component="button"
            onClick={handleClick}
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                border: "1px solid #e5e7eb",
                borderRadius: "999px",
                bgcolor:"white",
                pl: 0.5,
                pr: 1.5,
                py: 0.5,
                cursor: "pointer",
              }}
            >
              <Avatar sx={{ width: 28, height: 28, bgcolor: "#7c3aed", fontSize: "14px", fontWeight: 700,fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>{user?.name[0]}</Avatar>
              <Typography sx={{ fontWeight: 600, color: "#0f172a", fontSize: "14px" ,fontFamily: "Inter, system-ui, -apple-system, sans-serif"}}>{user?.name}</Typography>
             {open ? <KeyboardArrowUpIcon sx={{ fontSize: "16px", color: "#475569" }} /> : <KeyboardArrowDownIcon sx={{ fontSize: "16px", color: "#475569" }} />}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
     <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              width:140,
              borderRadius:1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick} sx={{   fontFamily: "Inter, system-ui, -apple-system, sans-serif",fontSize:"14px"}}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut} sx={{   fontFamily: "Inter, system-ui, -apple-system, sans-serif",fontSize:"14px"}}>
          <ListItemIcon>
            <Logout sx={{fontSize:20}}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>

  );
}
