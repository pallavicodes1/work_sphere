import { useEffect,  useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Tooltip,
  Card,
  Chip,
  CardContent,
  Pagination,
  Divider,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import AddPTask from "./AddPTask";
import useAuth from "../../auth";
import AlertDialog from "../AlertDialog";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateTaskWithAI from "../Project/CreateTaskWithAI";

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
export default function ProjectTasks() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [taskAI, setTaskAI] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleAddTask = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const handleAddTaskAI = () => {
    setTaskAI(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { request } = useAuth();
  const { projectId } = useParams();

  const role = useSelector(
    (state) => state.currentProjectReducer.currentUserRole,
  );
  console.log(role);
  useEffect(() => {
    const getTasks = async () => {
      try {
        const result = await request.get(`/project/${projectId}/tasks`, {
          params: {
            page,
            limit: 6,
            search,
          },
        });
        if (result.status === 200) {
          setTasks(result.data.tasks);
          setTotalPages(result.data.pagination.totalPages);
          setMembers(result.data.members);
        }
      } catch (error) {
      } finally {
        // setLoading(false)
      }
    };
    getTasks();
  }, [search, page]);

  const handleEditTask = (t) => {
    console.log("called");
    setSelectedTask(t);
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {role !== "viewer" && (
          <>
            {/* <Button
              disableElevation
              variant="contained"
              onClick={() => {
                handleAddTask();
              }}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#0f172a",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "1px",
                borderRadius: "10px",
                py: 1.2,
                "&:hover": { bgcolor: "#1e293b" },
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              New Task
            </Button> */}
            <Stack
              component="button"
              onClick={handleClick}
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                bgcolor: "white",
                py: 1,
                cursor: "pointer",
              }}
            >
              <AddIcon sx={{ fontSize: "16px" }} />
              <Typography
                sx={{
                  color: "#0f172a",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                New Task
              </Typography>

              {openMenu ? (
                <KeyboardArrowUpIcon
                  sx={{ fontSize: "16px", color: "#475569" }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{ fontSize: "16px", color: "#475569" }}
                />
              )}
            </Stack>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    width: 160,
                    borderRadius: 1,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleAddTask}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <EditOutlinedIcon
                    sx={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.54)" }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Create manually
                  </Typography>{" "}
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleAddTaskAI}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <AutoAwesomeIcon
                    sx={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.54)" }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Create with AI
                  </Typography>{" "}
                </Stack>
              </MenuItem>
            </Menu>
          </>
        )}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            mt: 3,
            alignItems: { sm: "center" },
          }}
        >
          <TextField
            placeholder="Search tasks by name"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 420,
              minWidth: 320,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#fff",
                "& fieldset": { borderColor: "#e5e7eb" },
                fontSize: "14px",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94a3b8", fontSize: "16px" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Box>
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
          <Stack spacing={2} sx={{ alignItems: "center" }}>
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
      {/* <Box></Box> */}

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
                    {role !== "viewer" && (
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
                    )}
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
      {tasks.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ justifySelf: "center", mt: 2 }}
        />
      )}
      {/* Empty state */}

      <AddPTask
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask}
        setTasks={setTasks}
        members={members}
      />
      <AlertDialog
        data={"task"}
        open={openDelete}
        setOpen={setOpenDelete}
        setData={setTasks}
        toDelete={taskToDelete}
        setToDelete={setTaskToDelete}
      />
      <CreateTaskWithAI
       open={taskAI}
        onClose={() => setTaskAI(false)}
        setTasks={setTasks}
      />
    </>
  );
}
