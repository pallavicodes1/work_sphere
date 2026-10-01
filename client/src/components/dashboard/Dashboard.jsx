import { useEffect, useState } from "react";
import {
  Box,
} from "@mui/material";
import  DashboardSidebar  from "./DashboardSlider";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import useAuth from "../../auth";
import { userTask } from "../../app/user/taskSlice";
import { userLogin } from "../../App/user/userSlice";

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
        sx={{ flex: 1,display: "flex", flexDirection: "column",gap:0}}
      >
        <NavBar/>
         <Outlet/>
      </Box>
    </Box>
  );
}
