import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Stack,
  Box,
  Typography,
  Card,
  Autocomplete,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import ProjectTasks from "./ProjectTasks";
import useAuth from "../../auth";
import ProjectSettings from "./ProjectSettings";
import ProjectOverview from "./ProjectOverview";
import Memberstab from "./Memberstab";
import { addCurrentProject } from "../../app/user/currentProjectSlice";
import ActivityTab from "./ActivityTab";
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&:hover fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&.Mui-focused fieldset": { borderColor: "#0f172a", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input": {
    py: 1.5,
    px: 1.75,
    fontSize: 16,
    color: "#0f172a",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  "& .MuiOutlinedInput-input::placeholder": { color: "#94a3b8", opacity: 1 },
};

const primaryBtnSx = {
  bgcolor: "#0f172a",
  color: "#fff",
  borderRadius: "10px",
  py: 1.5,
  fontWeight: 600,
  fontSize: 15,
  textTransform: "none",
  "&:hover": { bgcolor: "#1e293b" },
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

const labelSx = {
  fontSize: 14,
  fontWeight: 600,
  color: "#0f172a",
  mb: 0.75,
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

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
const ProjectDetails = () => {
  const [value, setValue] = useState(0);
  const [loading,setLoading]=useState(true);
  const [project,setProject]=useState(null);
  const { request } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const [currentProject, setCurrentProject] = useState(null);
  const { projectId } = useParams();
  // const [taskDetails,setTaskDetails]=useState({})
  // const [members,setMembers]=useState([]);
  // const [isViewer,setIsViewer]=useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user=useSelector((state)=>state.userReducer.user);
  var currentProject;
  const getProject = async () => {
    console.log('bale bale bale bale')
    const data = await request.get(`/project/${projectId}`);
    if (data?.status === 200) {
          setProject(data?.data?.project);
          dispatch(addCurrentProject(data?.data?.project));
    } 
  };

  useEffect(() => {
         getProject();
  }, [dispatch,projectId]);

  return (
    <Box sx={{ px: { xs: 2, md: 5 }, minHeight: "38vw" }}>
      <Card
        sx={{
          mt: 2,
          border: "1px solid rgba(65, 65, 65, 0.18)",
          borderRadius: "12px",
        }}
        elevation={0} >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example" >
              <Tab label="Overview" {...a11yProps(0)} sx={tabsx} />
              <Tab label="All Tasks" {...a11yProps(1)} sx={tabsx} />
              <Tab label="Members" {...a11yProps(1)} sx={tabsx} />
               <Tab label="Recent Activity" {...a11yProps(1)} sx={tabsx} />
           {project?.ownerId?._id === user?._id && <Tab label="Settings" {...a11yProps(1)} sx={tabsx} />}   
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ProjectOverview handleChange={handleChange}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ProjectTasks />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
           <Memberstab />
          </CustomTabPanel>
           <CustomTabPanel value={value} index={3}>
           <ActivityTab />
          </CustomTabPanel>
           <CustomTabPanel value={value} index={4}>
            <ProjectSettings  />
          </CustomTabPanel>
        </Box>
      </Card>
      {/* <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between" }}
        spacing={4}
      >
        <ProjectOverview project={currentProject}/>
        <ProjectTasks />
      </Stack> */}
    </Box>
  );
};

export default ProjectDetails;
