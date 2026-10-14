import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Stack,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import useAuth from "../../auth";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useState } from "react";
import EditOutlined from "@mui/icons-material/EditOutlined";
import AlertDialog from "../AlertDialog";
import TaskDialog from "./TaskDialog";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";


const priorityStyles = {
  low: { bgcolor: "hsla(175, 80%, 50%, 0.2)", color: "hsl(175, 80%, 50%)" },
  medium: {
    bgcolor: "hsla(45, 100%, 50%, 0.2)",
    color: "hsl(45, 100%, 60%)",
  },
  high: { bgcolor: "hsla(0, 84%, 60%, 0.2)", color: "hsl(0, 84%, 60%)" },
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
const TaskList = ({ tasks ,setTasks}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const handleEditTask = (t) => {
    setSelectedTask(t);
    setOpenEdit(true);
  };


  return (
    <>
     {tasks?.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            mt: 3,
            borderRadius: "14px",
            borderColor: "#e5e7eb",
            py: 8,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Stack spacing={0.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "#dcfce7",
                display: "grid",
                placeItems: "center",
              }}
            >
          <CheckCircleOutlineIcon
                sx={{ fontSize: "28px", color: "#16a34a" }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#0f172a",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              All caught up!
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#64748b",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
             No Tasks with this title!
            </Typography>
          </Stack>
        </Paper>
      ) : null}
    


        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}
            >
              {tasks?.map((task) => (
                <Card
                  key={task?._id}
                  sx={{
                    width: 350,
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
              
                    
                  }}
                >
                  <CardContent>
                    {/* Project name */}
                    <Stack direction={"column"} spacing={1.25}>
                      <Stack spacing={0.5}>
                        <Stack
                          direction={"row"}
                          sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <Typography
                            sx={{
                              fontWeight: 600,
                              // color: projectTitleColors[index % projectTitleColors.length],
                              fontSize: "16px",
                              fontFamily:
                                "Inter, system-ui, -apple-system, sans-serif",
                              textTransform: "capitalize",
                            }}
                          >
                            {task.title}
                          </Typography>
                          {/* {role !== "viewer" && ( */}
                            <Box>
                              <Tooltip title="Edit task">
                                <IconButton
                                  size="small"
                                  sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                                  onClick={() => {
                                    handleEditTask(task);
                                  }}
                                >
                                  <EditOutlined fontSize="16px" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete task">
                                <IconButton
                                  size="small"
                                  sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                                  onClick={() => {
                                    setTaskToDelete(task._id);
                                    setOpenDelete(true);
                                  }}
                                >
                                  <DeleteOutlineOutlined fontSize="16px" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          {/* )} */}
                        </Stack>
                        <Typography
                          color="text.secondary"
                          sx={{
                            fontSize: "14px",
                            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                          }}
                        >
                        Task Description -  {task.description.slice(0, 50)}....
                        </Typography>
                         <Typography
                          color="text.secondary"
                          sx={{
                            fontSize: "14px",
                            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                            textTransform:"capitalize"
                          }}
                        >
                       Status -  {task.status}
                        </Typography>
                      </Stack>
                      <Stack spacing={2} direction={"row"}>   
                     
      
                      <Stack
                        spacing={0.5}
                        direction={"row"}
                        sx={{ alignItems: "center" }}
                      >
                        <CalendarTodayOutlinedIcon
                          sx={{ fontSize: "13px", color: "#475569" }}
                        />
                        <Typography
                          sx={{
                            color: "#475569",
                            fontSize: "14px",
                            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                          }}
                        >
                          {formatDate(task.date)}
                        </Typography>
                      </Stack>
                         <Chip
                        icon={<FlagOutlinedIcon />}
                        label={task.priority}
                        size="small"
                        sx={{
                          px: 1,
                          py: 2,
                          alignSelf: "flex-start",
                          textTransform: "capitalize",
                          fontWeight: 500,
                          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                          ...priorityStyles[task.priority],
                          "& .MuiChip-icon": {
                            color: "inherit",
                            fontSize: "14px ",
                          },
                        }}
                      />
                      </Stack>
                   
                    </Stack>
                  </CardContent>
                </Card>
              ))}
        </Box>
      <TaskDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        task={selectedTask}
        setTasks={setTasks}
      />
      <AlertDialog
        data={"task"}
        setTasks={setTasks}
        open={openDelete}
        setOpen={setOpenDelete}
        toDelete={taskToDelete}
        setToDelete={setTaskToDelete}
      />
    </>
  );
};

export default TaskList;
