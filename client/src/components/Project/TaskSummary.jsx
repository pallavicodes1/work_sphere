import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, Stack, Button, Card, CardContent, CardHeader } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddPTask from "./AddPTask";
const TaskSummary = ({taskDetails}) => {
  const [open, setOpen] = useState(false);
  //  const [selectedTask, setSelectedTask] = useState(null);
  //  const today = new Date().toISOString().split("T")[0];
  // const completed = tasks.filter((task) => task.status === "completed").length;

  // const inProgress = tasks.filter(
  //   (task) => task.status === "in-progress",
  // ).length;

  // const todo = tasks.filter((task) => task.status === "pending").length;

  // const overdue=tasks.filter((task)=>task.date < today).length
  // const total = tasks.length;

  const data = [
    {
      id: 0,
      value: taskDetails.completed,
      label: "Completed",
      color: "#22C55E",
    },
    {
      id: 1,
      value: taskDetails.inProgress,
      label: "In Progress",
      color: "#6366F1",
    },
    {
      id: 2,
      value: taskDetails.pending,
      label: "Pending",
      color: "#D1D5DB",
    },
    {
      id: 3,
      value: taskDetails.overdue,
      label: "Overdue",
      color: "hsl(0, 84%, 60%)",
    },
  ];
  const handleAddTask = () => {
    setOpen(true);
  };
  return (
    <>
        <Card sx={{border:"1px solid rgba(65, 65, 65, 0.18)",borderRadius:"12px",flex:1}} elevation={0}>
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                color: "#0f172a",
                fontWeight: 700,
                fontSize:"16px"
              }}
            >
             Task Summary
            </Typography>
          }
        />
        <CardContent>
       {taskDetails?.total=== 0 ? (
        <Box
          sx={{
            py:6,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Box>
                     
              <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#0f172a",
                textAlign:"center", 
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
            </Box>
            {/* <Button
              disableElevation
              disableRipple
              disableTouchRipple
              // variant="outlined"
              onClick={() => {
                handleAddTask();
              }}
              startIcon={<AddIcon />}
              sx={{
                borderColor: "#0f172a",
                color: "#0f172a",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "1px",
                borderRadius: "10px",
                py: 1.2,
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              New Task
            </Button> */}
          </Stack>
        </Box>
      ) : (
       <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 170,
              height: 170,
              position: "relative",
            }}
          >
            <PieChart
              series={[
                {
                  data,
                  innerRadius: 55,
                  outerRadius: 75,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              width={170}
              height={170}
              hideLegend
            />

            {/* Center text */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                {taskDetails?.total}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                Total Tasks
              </Typography>
            </Box>
          </Box>

          {/* Task status */}
          <Box>
            {data.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#0f172a",

                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    minWidth: 90,
                  }}
                >
                  {item.label}
                  {" - "}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#0f172a",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
     
      
      )}
        </CardContent>
      </Card>
    
      {/* <AddPTask
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask}
        project={project}
        setTasks={setTasks}
      /> */}
    </>
  );
};

export default TaskSummary;
