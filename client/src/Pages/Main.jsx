import { useState } from "react";
import DashboardPage from "../components/dashboard/Dashboard";
import MainContent from "../components/dashboard/MainContent";
import TasksPage from "../components/dashboard/Tasks";
import ProfileSection from "../components/dashboard/ProfileSection";
import Projects from "../components/dashboard/Projects";

const Main = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); 
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <MainContent />;
      case "tasks":
        return <TasksPage />;
      case "projects" : 
        return <Projects/>
      case "profile":
        return <ProfileSection/>
      default:
        // return null;
    }
  };

  return (
    <>
      {/* <DashboardPage
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      
      >
        {renderContent()}
      </DashboardPage> */}
      
    </>
  );
};

export default Main;
