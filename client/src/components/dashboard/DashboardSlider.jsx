import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Collapse,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/GridViewRounded";
import TaskIcon from "@mui/icons-material/CheckBoxOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { userLogout } from "../../App/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../auth";
import { useDispatch } from "react-redux";
import ProjectIcon from "@mui/icons-material/FolderOpen"
import { removeUserTask } from "../../app/user/taskSlice";
import { removeOProjects } from "../../app/user/projectSlice";
import { removeCurrentProject } from "../../app/user/currentProjectSlice";

const EXPANDED = 260;
const COLLAPSED = 76;

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { key: "tasks", label: "Tasks", icon: TaskIcon, to: "/tasks" },
  { key: "profile", label: "My Profile", icon: ProfileIcon },
];
const projectItems = [
  { key: "projects", label: "Projects", icon: ProjectIcon },
];
function DashboardSidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onToggle,
}) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const width = collapsed ? COLLAPSED : EXPANDED;
  const navigate = useNavigate();
  const location = useLocation();
  const { request } = useAuth();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await request.post("/logout");
    dispatch(userLogout());
    dispatch(removeUserTask());
    dispatch(removeCurrentProject());
    dispatch(removeOProjects());
    navigate("/");
  };

  return (
    <Box
      component="aside"
      sx={{
        width,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        borderRight: "1px solid #e5e7eb",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "width 200ms ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <Stack
        direction="row"
        spacing={1.25}
        sx={{ alignItems: "center", px: 2.5, pt: 3, pb: 2.5 }}
      >
        {!collapsed && (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "22px",
              color: "#0f172a",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            WorkSphere
          </Typography>
        )}
      </Stack>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5 }}>
        {!collapsed && (
          <Typography
            sx={{
              px: 1.5,
              mt: 1,
              mb: 1,
              fontSize: "12px",
              color: "rgb(107, 114, 128)",
              letterSpacing: "0.02em",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Dashboard
          </Typography>
        )}
        <Stack spacing={0.5}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isactiveSection = activeSection === item.key;
            return (
              <Tooltip
                key={item.key}
                title={collapsed ? item.label : ""}
                placement="right"
              >
                <Button
                  disableRipple
                  onClick={() => navigate(`/app/${item?.key}`)}
                  startIcon={
                    !collapsed ? <Icon sx={{ fontSize: "14px" }} /> : undefined
                  }
                  sx={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    textTransform: "none",
                    color: isactiveSection ? "#0f172a" : "#475569",
                    bgcolor: isactiveSection ? "#f1f5f9" : "transparent",
                    fontWeight: isactiveSection ? 600 : 500,
                    fontSize: "13px",
                    px: collapsed ? 0 : 1.5,
                    py: 1.1,
                    borderRadius: "10px",
                    minWidth: 0,
                    "&:hover": { bgcolor: "#f8fafc" },
                    "& .MuiButton-startIcon": { mr: 1.25 },
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  {collapsed ? <Icon sx={{ fontSize: 22 }} /> : item.label}
                </Button>
              </Tooltip>
            );
          })}
        </Stack>

        {!collapsed && (

          <Typography
            sx={{
              px: 1.5,
              mt: 3,
              mb: 1,
              fontSize: "12px",
              color: "rgb(107, 114, 128)",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Projects
          </Typography>
        )}
        <Stack spacing={0.5}>
          {projectItems.map((item) => {
            const Icon = item.icon;
            const isactiveSection = activeSection === item.key;
            return (
              <Tooltip
                key={item.key}
                title={collapsed ? item.label : ""}
                placement="right"
              >
                <Button
                  disableRipple
                  onClick={() => navigate('/app/projects')}
                  startIcon={
                    !collapsed ? <Icon sx={{ fontSize: "13px" }} /> : undefined
                  }
                  sx={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    textTransform: "none",
                    color: isactiveSection ? "#0f172a" : "#475569",
                    bgcolor: isactiveSection ? "#f1f5f9" : "transparent",
                    fontWeight: isactiveSection ? 600 : 500,
                    fontSize: "13px",
                    px: collapsed ? 0 : 1.5,
                    py: 1.1,
                    borderRadius: "10px",
                    minWidth: 0,
                    "&:hover": { bgcolor: "#f8fafc" },
                    "& .MuiButton-startIcon": { mr: 1.25 },
                    fontFamily:
                      "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  {collapsed ? <Icon sx={{ fontSize: 22 }} /> : item.label}
                </Button>
              </Tooltip>
            );
          })}
        </Stack>

      </Box>

      {/* Footer */}
      <Stack sx={{ p: 1.5, borderTop: "1px solid #f1f5f9" }} spacing={0.5}>
        <Button
          onClick={onToggle}
          disableRipple
          startIcon={
            !collapsed ? <ChevronLeftIcon /> : undefined
          }
          sx={{
            justifyContent: collapsed ? "center" : "flex-start",
            textTransform: "none",
            color: "rgb(107, 114, 128)",
            fontSize: "13px",
            fontWeight: 500,
            px: collapsed ? 0 : 1.5,
            py: 1,
            borderRadius: "10px",
            "&:hover": { bgcolor: "#f8fafc" },
            "& .MuiButton-startIcon": { mr: collapsed ? 0 : 1.25 },
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          {collapsed ? <ChevronRightIcon sx={{ fontSize: 24 }} /> : "Collapse"}
        </Button>
        <Button
          disableRipple
          startIcon={
            !collapsed ? <LogoutIcon fontSize="16px"/> : undefined
          }
          onClick={handleLogout}
          sx={{
            justifyContent: collapsed ? "center" : "flex-start",
            textTransform: "none",
            color: "rgb(107, 114, 128)",
            fontSize: "13px",
            fontWeight: 500,
            px: collapsed ? 0 : 1.5,
            py: 1,
            borderRadius: "10px",
            "&:hover": { bgcolor: "#f8fafc" },
            "& .MuiButton-startIcon": { mr: collapsed ? 0 : 1.25 },
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
           {collapsed ? <LogoutIcon sx={{ fontSize: 20 }} /> : "Logout"}
        </Button>
      </Stack>
    </Box>
  );
}

export default DashboardSidebar;
