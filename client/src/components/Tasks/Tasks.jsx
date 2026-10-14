// imports
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
   Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TaskDialog from "./TaskDialog";
import TaskList from "./TaskList";
import useAuth from "../../auth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";



// component
function TasksPage() {
  const [tasks,setTasks]=useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const {request}=useAuth();
  const today = new Date().toISOString().split("T")[0];
  const handleAddTask = () => {
    setOpen(true);
  };
  const filteredTasks = useMemo(() => {
    let list = tasks;
    const q = search.trim().toLowerCase();
    if (q) list = list?.filter((t) => t.title.toLowerCase().includes(q));
    return list;
  }, [tasks ,search]);


  useEffect(()=>{
      const taskData=async()=>{
          const res=await request.get('/task');
          setTasks(res.data.tasks)
      }
      taskData();
  },[])


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


        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            mt: 3,
            alignItems: { sm: "center" },
            justifyContent: "flex-end",
            mb:2
          }}
        >
          <TextField
            placeholder="Search tasks by title"
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
       
        </Stack>


        <TaskList tasks={filteredTasks} today={today} setTasks={setTasks}/>
      </Box>
      <TaskDialog open={open} onClose={() => setOpen(false)}  setTasks={setTasks} />
    </>
  );
}
export default TasksPage;
