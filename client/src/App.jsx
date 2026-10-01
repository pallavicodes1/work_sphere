import "./index.css";
import Home from "./Pages/Home";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { Snackbar } from "@mui/material";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Tasks from "./Pages/Tasks";
import DashboardPage from "./components/dashboard/Dashboard";
import MainContent from "./components/dashboard/MainContent";
import ProfileSection from "./components/Profile/ProfileSection";
import TasksPage from "./components/Tasks/Tasks";
import Projects from "./components/Project/Projects";
import ProjectDetails from "./components/Project/ProjectDetails";
import LoginRegister from "./Pages/LoginRegister";
import useAuth from "./auth";
import { useDispatch } from "react-redux";
import { removeUserTask } from "./app/user/taskSlice";
import { removeOProjects } from "./app/user/projectSlice";
import { removeCurrentProject } from "./app/user/currentProjectSlice";
import { userLogout } from "./App/user/userSlice";
import QuickAdd from "./components/QuickAdd";
function App() {
  const [collapse, setCollapse] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const onToggle = () => {
    setCollapse((v) => !v);
  };


  
const {request}=useAuth();
const dispatch=useDispatch();

 useEffect(() => {

    const verifyUser = async () => {
      try {
        await request.get("/auth");
      } catch (err) {
         dispatch(userLogout());
         dispatch(removeCurrentProject());
         dispatch(removeUserTask()); 
         dispatch(removeOProjects())
      }finally {

      setCheckingAuth(false);

    }
    };

    verifyUser();

  }, []);

  if (checkingAuth) {
  return null;
}
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<LoginRegister about={"register"} />} />
            <Route path="/login" element={<LoginRegister about={"login"}/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/app" element={<DashboardPage />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<MainContent />} />
                <Route path="profile" element={<ProfileSection />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="" element={<TasksPage />} />
                <Route path="projects" element={<Projects />}/>
                  <Route path="projects/:projectId" element={<ProjectDetails/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
