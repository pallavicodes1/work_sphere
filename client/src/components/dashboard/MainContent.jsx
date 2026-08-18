import { useState } from "react";
import { Box, Stack, Typography, IconButton, Paper, Chip } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmberRounded";
import TimelapseIcon from "@mui/icons-material/AccessTimeRounded";
import GraphicEqIcon from "@mui/icons-material/GraphicEqRounded";
import FolderOpenIcon from "@mui/icons-material/FolderOpenRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlineRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import { useSelector } from "react-redux";
import UpcomingTasks from "./UpcomingTasks";
import TodayTasks from "./TodayTasks";


const today = new Date().toISOString().split("T")[0];
const stats = [
  {
    label: "Total Tasks",
    value: "0",
    icon: <CheckBoxOutlinedIcon />,
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
  },
  {
    label: "In Progress",
    value: "0",
    icon: <TimelapseIcon />,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    label: "Completed",
    value: "0",
    icon: <TrendingUpIcon />,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    label: "Overdue",
    value: "0",
    icon: <WarningAmberIcon />,
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
  },
];

function MainContent() {
  const user = useSelector((state) => state?.userReducer?.user);
  const tasks = useSelector((state) => state?.taskReducer?.task);


const overdueTasks=tasks?.filter((task)=>{
    return  task?.status!=="completed" && new Date(task?.date).toISOString().split("T")[0] < today;
})



console.log(overdueTasks)
  const completedtasks = tasks?.filter((task) => {
    return task?.status === "completed";
  });
    const inprogressTasks = tasks?.filter((task) => {
    return task?.status === "in-progress";
  });


   
  const stats = [
    {
      label: "Total Tasks",
      value: tasks?.length,
      icon: <CheckBoxOutlinedIcon />,
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
    },
    {
      label: "In Progress",
      value: inprogressTasks.length,
      icon: <TimelapseIcon />,
      iconBg: "#fef3c7",
      iconColor: "#d97706",
    },
    {
      label: "Completed",
      value: completedtasks?.length,
      icon: <TrendingUpIcon />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      label: "Overdue",
      value: overdueTasks?.length,
      icon: <WarningAmberIcon />,
      iconBg: "#fee2e2",
      iconColor: "#dc2626",
    },
  ];
  return (
    <>
      <Box sx={{ px: { xs: 2, md: 5 }, flex: 1,minHeight:"38vw"}}>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.02em",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Welcome back, {user?.name.split(" ")[0]} !
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#64748b", mt: 0.5,fontFamily: "Inter, system-ui, -apple-system, sans-serif", }}>
          Here's what's happening with your tasks today.
        </Typography>

        {/* Stat cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
            mt: 3,
          }}
        >
          {stats.map((s) => (
            <Paper
              key={s.label}
              variant="outlined"
              sx={{
                borderRadius: "14px",
                borderColor: "#e5e7eb",
                p: 2.5,
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "12px",
                    bgcolor: s.iconBg,
                    color: s.iconColor,
                    display: "grid",
                    placeItems: "center",
                    "& svg": { fontSize: 22 },
                    
                  }}
                >
                  {s.icon}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "#0f172a",
                      lineHeight: 1,
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#64748b", mt: 0.75 ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>
                    {s.label}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>

        {/* Two column panels */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
            mt: 3,
          }}
        >
         
           
           
        <UpcomingTasks/>

       <TodayTasks/>
        </Box>

        {/* Your Projects */}
        {/* <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: "center", mt: 4 }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#0f172a" ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>
            Your Projects
          </Typography>
          <Chip
            icon={
              <ViewModuleRoundedIcon
                sx={{ fontSize: 16, color: "#64748b !important" }}
              />
            }
            label="1"
            size="small"
            sx={{
              bgcolor: "#f1f5f9",
              color: "#475569",
              fontWeight: 600,
              borderRadius: "999px",
              "& .MuiChip-icon": { ml: 0.75 },
            }}
          />
        </Stack> */}

        {/* <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 2.5,
            mt: 2,
          }}
        >
          <Paper
            variant="outlined"
            sx={{ borderRadius: "14px", borderColor: "#e5e7eb", p: 2.5 }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  bgcolor: "#f1f5f9",
                  color: "#475569",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <FolderOpenIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: 700, color: "#0f172a" ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}
                >
                  test
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#64748b" ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>
                  test
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: "#94a3b8" }}>
                <MoreHorizIcon />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              spacing={2.5}
              sx={{ mt: 2.5, color: "#64748b" }}
            >
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center" }}
              >
                <AssignmentOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 13 ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>0 tasks</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center" }}
              >
                <PeopleOutlineIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 13 ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>1 members</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Box> */}
      </Box>
    </>
  );
}

export default MainContent;
