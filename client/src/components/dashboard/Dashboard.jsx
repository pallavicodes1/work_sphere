import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmberRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayRounded";
import TimelapseIcon from "@mui/icons-material/AccessTimeRounded";
import GraphicEqIcon from "@mui/icons-material/GraphicEqRounded";
import FolderOpenIcon from "@mui/icons-material/FolderOpenRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlineRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import  DashboardSidebar  from "./DashboardSlider";
import { useDispatch } from "react-redux";
import MainContent from "./MainContent";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import useAuth from "../../auth";
import { userLogin } from "../../app/user/userSlice";
import { userTask } from "../../app/user/taskSlice";

export default function DashboardPage({activeSection,onSectionChange,children}) {
  const [collapsed, setCollapsed] = useState(false);
  const {request} = useAuth();
  const dispatch=useDispatch();
  const getDashBoardDetails=async(req,res)=>{
    try {
         const result=await request.get('/dashboard');
         if(result.status===200){
            dispatch(userLogin(result?.data?.userInfo));
            dispatch(userTask(result?.data?.taskData))
         }
    } catch (error) {
      
    }
       
        
  }
  useEffect(()=>{
    getDashBoardDetails();
  })
  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      bgcolor: "#b5c4e321" ,
      flexDirection:"row",
      }}>
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        active="dashboard"
      />
      <Box
        sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column",gap:0}}
      >
        <NavBar/>
         <Outlet/>
      </Box>
    </Box>
  );
}
