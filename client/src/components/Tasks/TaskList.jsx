import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
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
const TaskList = ({ tasks }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const dispatch = useDispatch();
  const { request } = useAuth();

  const handleEditTask = (t) => {
    setSelectedTask(t);
    setOpenEdit(true);
  };
  const priorityChipColors = {
    low: { bg: "hsla(175, 80%, 50%, 0.2)", text: "hsl(175, 80%, 50%)" },
    medium: { bg: "hsla(45, 100%, 50%, 0.2)", text: "hsl(45, 100%, 60%)" },
    high: { bg: "hsla(0, 84%, 60%, 0.2)", text: "hsl(0, 84%, 60%)" },
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
              You have no active tasks
            </Typography>
          </Stack>
        </Paper>
      ) : null}
      {/* <Stack direction={"column"} spacing={2.5} sx={{ mt: 1 }}>
        {tasks.map((task) => {
          const isOverdue = today ? task.date < today : false;
          return (
            <Card
              key={task._id}
              elevation={1}
              sx={{
                transition: "all 0.25s ease",
                cursor: "default",
                borderRadius: "12px",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: isOverdue
                    ? "0 4px 12px hsla(0, 84%, 60%, 0.2)"
                    : "0 4px 12px hsla(210, 100%, 60%, 0.15)",
                  borderColor: isOverdue
                    ? "hsl(0, 84%, 60%)"
                    : "hsl(210, 100%, 60%)",
                },
                ...(isOverdue
                  ? {
                      borderLeft: "4px solid hsl(0, 84%, 60%)",
                      background:
                        "linear-gradient(90deg, hsla(0, 84%, 60%, 0.05), transparent 40%)",
                    }
                  : {}),
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction={"column"} spacing={1}>
                  <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                          fontSize: "16px",
                        }}
                        noWrap
                      >
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          backgroundColor:
                            priorityChipColors[task.priority]?.bg,
                          color: priorityChipColors[task.priority]?.text,
                          fontWeight: 500,
                          fontSize: "0.70rem",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        }}
                      />
                        {isOverdue && (
                        <Chip
                          label="Overdue"
                          size="small"
                          sx={{
                            bacckgroundColor: "hsla(0, 84%, 60%, 0.15)",
                            color: "hsl(0, 84%, 60%)",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            "& .MuiChip-icon": { color: "hsl(0, 84%, 60%)" },
                          }}
                        />
                      )}
                    </Stack>
                    <Box>
                      <Tooltip title="Edit task">
                        <IconButton
                          size="small"
                          sx={{ color: "rgb(62, 62, 151)" }}
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
                          sx={{ color: "error.main" }}
                          onClick={() => {
                            setTaskToDelete(task._id);
                            setOpenDelete(true);
                          }}
                        >
                          <DeleteOutlineOutlined fontSize="16px" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {new Date(task?.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {task.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack> */}


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
                      <Stack>
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
                          {task.description.slice(0, 30)}....
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
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
      <TaskDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        task={selectedTask}
      />
      <AlertDialog
        data={"task"}
        open={openDelete}
        setOpen={setOpenDelete}
        toDelete={taskToDelete}
        setToDelete={setTaskToDelete}
      />
    </>
  );
};

export default TaskList;
