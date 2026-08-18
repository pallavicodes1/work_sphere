import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Person from "@mui/icons-material/Person";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TaskSummary from "./TaskSummary";
import RecentActivity from "./RecentActivityOverview";
import RemoteMemberSearch from "./Memberstab";
import MembersOverview from "./MembersOverview";
import { useSelector } from "react-redux";
import useAuth from "../../auth";
import { useParams } from "react-router-dom";
const labelsx = {
  fontSize: "14px",
  color: "#0f172a",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};
const datasx = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#0f172a",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  textTransform: "capitalize",
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export default function ProjectOverview({ handleChange }) {
  const [members,setMembers]=useState([]);
  const [taskDetails,setTaskDetails]=useState({});
  const [activities,setActivities]=useState([])
  const project=useSelector((state)=>state.currentProjectReducer.data);
  const {request}=useAuth();
   const { projectId } = useParams();
  useEffect(()=>{
      const getOverview=async()=>{
          const result=await request.get(`/project/${projectId}/overview`);
          setMembers(result.data.members);
          setTaskDetails(result.data.taskSummary);
          setActivities(result?.data?.activities);
      }
      getOverview();
  },[])
  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                sx={{ justifyContent: "space-between" }}
                spacing={2}
              >
                <Stack direction={"column"} spacing={1}>
                  <Typography sx={labelsx}>Project Owner</Typography>
                  <Stack
                    spacing={1}
                    direction={"row"}
                    sx={{ alignItems: "center" }}
                  >
                    <Person sx={{ fontSize: "16px" }} />
                    <Typography sx={datasx}>{project?.ownerId?.name}</Typography>
                  </Stack>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                  <Typography sx={labelsx}>Start date</Typography>
                  <Stack
                    spacing={1}
                    direction={"row"}
                    sx={{ alignItems: "center" }}
                  >
                    <CalendarTodayOutlinedIcon sx={{ fontSize: "14px" }} />
                    <Typography sx={datasx}>
                      {formatDate(project?.startDate)}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                  <Typography sx={labelsx}>Status</Typography>
                  <Typography sx={datasx}>{project?.status}</Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"column"}
                spacing={2}
              >
                <Stack direction={"column"} spacing={1}>
                  <Typography sx={labelsx}>Due Date</Typography>
                  <Stack
                    spacing={1}
                    direction={"row"}
                    sx={{ alignItems: "center" }}
                  >
                    <CalendarTodayOutlinedIcon sx={{ fontSize: "14px" }} />
                    <Typography sx={datasx}>
                      {formatDate(project?.endDate)}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"column"}>
                  <Typography sx={labelsx}>Priority</Typography>
                  <Typography sx={datasx}>{project?.priority}</Typography>
                </Stack>
              
              </Stack>
            </Box>
            <Stack direction={"column"} spacing={1}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                }}
              >
                Project Description
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                {project?.description}
                {"."}
              </Typography>
            </Stack>
          </Box>

          {/* <Stack sx={{width:"50%"}}> */}
          {/* <Typography sx={{fontSize:"14px",mb:1,fontWeight:600,  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>Task Summary</Typography> */}
          {/* <Box
              sx={{
                // display: "flex",
                // flexDirection: "column",
                // border: "1px solid rgba(65, 65, 65, 0.18)",
                // borderRadius: "12px",
                // alignItems: "center",
                // height: 200,
                // p: 2,
                // alignContent: "center",
              }}
            >
              <TaskSummary tasks={tasks} project={project} setTasks={setTasks}/>
            </Box> */}
          {/* </Stack> */}
          <TaskSummary taskDetails={taskDetails} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <MembersOverview members={members} handleChange={handleChange}/>
          <RecentActivity activities={activities} handleChange={handleChange}/>
        </Box>
      </Box>
    </>
  );
}
