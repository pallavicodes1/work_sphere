import { useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/TuneRounded";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SortIcon from "@mui/icons-material/SortRounded";
import TaskDialog from "./TaskDialog";
import { useSelector } from "react-redux";
import TaskList from "./TaskList";
import ArrowUp from "@mui/icons-material/ArrowUpward";
import ArrowDown from "@mui/icons-material/ArrowDownward";
import ArrowUpDown from "@mui/icons-material/UnfoldMore";

function TasksPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [task, setTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortDir, setSortDir] = useState("asc");
  const tasks = useSelector((state) => state.taskReducer.task);
  const today = new Date().toISOString().split("T")[0];
  const handleAddTask = () => {
    setOpen(true);
  };
  const priorityRank = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (filter !== "all") {
      if (filter === "overdue") list = list.filter((t) => t.date < today);
      else list = list.filter((t) => t.priority === filter);
    }
    const q = search.trim().toLowerCase();
    if (q) list = list?.filter((t) => t.title.toLowerCase().includes(q));
    const sorted = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date") {
        cmp = a.date.localeCompare(b.date);
      } else {
        cmp = priorityRank[a.priority] - priorityRank[b.priority];
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [tasks, filter, today, search, sortBy, sortDir]);

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 5 }, minHeight: "38vw" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"column"}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.02em",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              All Tasks
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#64748b",
                mt: 0.5,
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              View and manage tasks
            </Typography>
          </Stack>
          <Button
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
          </Button>
        </Box>

        {/* Filters */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            mt: 3,
            alignItems: { sm: "center" },
            justifyContent: "flex-end",
          }}
        >
          <TextField
            placeholder="Search tasks..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 420,
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
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}
          >
            <FormControl
              size="small"
              sx={{
                width: {
                  xs: "100%",
                  md: "110px",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontSize: "14px",
                },
              }}
            >
              <InputLabel id="sort-by-label">Sort by</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={
                  <ArrowUpDown />
                }  
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </FormControl>

            <Tooltip title={sortDir === "asc" ? "Ascending" : "Descending"}>
              <IconButton
                onClick={() =>
                  setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                }
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "10px",
                  width: 38,
                  height: 38,
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "hsla(210,100%,60%,0.08)",
                  },
                }}
              >
                {sortDir === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>

        {/* Empty state */}
        <TaskList tasks={filteredTasks} today={today} />
      </Box>
      <TaskDialog open={open} onClose={() => setOpen(false)} task={task} />
    </>
  );
}
export default TasksPage;
