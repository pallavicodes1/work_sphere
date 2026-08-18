import { useState } from "react";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/TuneRounded";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SortIcon from "@mui/icons-material/SortRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
// import { DashboardSidebar } from "../components/tasktrox/dashboard/DashboardSidebar";



export default function Tasks() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {/* <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} active="tasks" /> */}

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            minHeight: { xs: 72, md: 76 },
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <IconButton
            sx={{
              width: 40,
              height: 40,
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              color: "#0f172a",
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <IconButton sx={{ color: "#475569" }}>
              <LightbulbOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: "#475569" }}>
              <NotificationsNoneIcon />
            </IconButton>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                border: "1px solid #e5e7eb",
                borderRadius: "999px",
                pl: 0.5,
                pr: 1.5,
                py: 0.5,
                cursor: "pointer",
              }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#7c3aed", fontSize: 14, fontWeight: 700 }}>P</Avatar>
              <Typography sx={{ fontWeight: 600, color: "#0f172a", fontSize: 14 }}>Pallavi Arora</Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#475569" }} />
            </Stack>
          </Stack>
        </Stack>

        {/* Content */}
        <Box sx={{ px: { xs: 2, md: 5 }, py: 4, flex: 1 }}>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
            All Tasks
          </Typography>
          <Typography sx={{ fontSize: 15, color: "#64748b", mt: 0.5 }}>
            View and manage tasks from all your projects
          </Typography>

          {/* Filters */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3, alignItems: { sm: "center" } }}>
            <TextField
              placeholder="Search tasks..."
              size="small"
              sx={{
                flex: 1,
                maxWidth: 420,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#e5e7eb" },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {[
              { label: "Priority", icon: <TuneIcon sx={{ fontSize: 18 }} /> },
              { label: "Project", icon: <FolderOutlinedIcon sx={{ fontSize: 18 }} /> },
              { label: "Due Date", icon: <SortIcon sx={{ fontSize: 18 }} /> },
            ].map((f) => (
              <Button
                key={f.label}
                startIcon={f.icon}
                sx={{
                  textTransform: "none",
                  color: "#0f172a",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  px: 2,
                  py: 1,
                  fontWeight: 500,
                  fontSize: 14,
                  bgcolor: "#fff",
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                {f.label}
              </Button>
            ))}
          </Stack>

          {/* Empty state */}
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
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  bgcolor: "#dcfce7",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "#16a34a" }} />
              </Box>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>All caught up!</Typography>
              <Typography sx={{ fontSize: 14, color: "#64748b" }}>
                You have no active tasks across your projects
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}


