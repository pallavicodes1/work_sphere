import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskDialog from "../Tasks/TaskDialog";
import ProjectTabs from "./ProjectTabs";
import AddProject from "./AddProject";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useAuth from "../../auth";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {
  userProjectsAsMember,
  userProjectsAsOwner,
} from "../../app/user/projectSlice";
import ProjectMainContent from "./ProjectMainContent";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const tabsx = {
  textTransform: "capitalize",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  fontSize: "14px",
};
export default function Projects() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const [projectAsOwner,setprojectAsOwner]=useState([]);
  const [projectAsMember,setprojectAsMember]=useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAddProject = () => {
    setOpen(true);
  };
  const { request } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getProjectData = async (req, res) => {
        const result = await request.get("/project");
        if (result.status === 200) {
          setprojectAsOwner(result?.data?.userAsOwnerProjects);
          setprojectAsMember(result?.data?.userAsMemberProjects);
        }
      };
      getProjectData();
    } catch (error) {
      enqueueSnackbar(error?.data?.response?.message, {
        variant: "error",
      });
    }
  }, []);

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
              All Projects
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#64748b",
                mt: 0.5,
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              View and manage projects
            </Typography>
          </Stack>

          <Button
            disableElevation
            variant="contained"
            onClick={() => {
              handleAddProject();
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
            New Project
          </Button>
        </Box>
        <Card
          sx={{
            mt: 2,
            border: "1px solid rgba(65, 65, 65, 0.18)",
            borderRadius: "12px",
          }}
          elevation={0}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Created By You" {...a11yProps(0)} sx={tabsx} />
                <Tab label="Created By Others" {...a11yProps(1)} sx={tabsx} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} >
              <ProjectMainContent owner={true} projects={projectAsOwner} setprojectAsOwner={setprojectAsOwner}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ProjectMainContent owner={false} projects={projectAsMember}/>
            </CustomTabPanel>
          </Box>
        </Card>
        {/* <ProjectTabs /> */}
      </Box>
      <AddProject open={open} onClose={() => setOpen(false)} setprojectAsOwner={setprojectAsOwner}/>
    </>
  );
}
