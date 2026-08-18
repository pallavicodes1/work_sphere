import React from 'react'
import { Paper,Typography,Stack } from '@mui/material'
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import GraphicEqIcon from "@mui/icons-material/GraphicEqRounded";
import { useSelector } from 'react-redux';
export default function TodayTasks() {
  const tasks = useSelector((state) => state?.taskReducer?.task);
  const today = new Date();
  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(today);
  endDate.setHours(23, 59, 59, 999);
  const TodayTasks = tasks.filter((task) => {
    const taskDate = new Date(task?.date);
    return taskDate >= startDate && taskDate <= endDate;
  });
  return (
      <>
         <Paper
            variant="outlined"
            sx={{
              borderRadius: "14px",
              borderColor: "#e5e7eb",
              p: 3,
              minHeight: 300,
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", mb: 3,fontFamily: "Inter, system-ui, -apple-system, sans-serif", }}
            >
              Task Due Today
            </Typography>

           {TodayTasks.length === 0 ? (
         <Stack
              spacing={1.5}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                py: 4,
                color: "#94a3b8",
              }}
            >
              <GraphicEqIcon sx={{ fontSize: "26px" }} />
              <Typography sx={{ fontSize: "16px", color: "#64748b" ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}>
                No Tasks for Today
              </Typography>
            </Stack>
      ) : (
        <Stack direction={"column"}>
          {TodayTasks.slice(0, 5).map((task) => {
            const shortDescription = task?.description
              .split(/\s+/)
              .slice(0, 8)
              .join(" ");
            const date = task?.date.split("T")[0];
            const formattedDate = new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            return (
              <Stack key={task?._id} direction={"column"}>
                <Stack
                  direction={"row"}
                  sx={{ alignItems: "center" }}
                  spacing={1}
                >
                  <RadioButtonUncheckedIcon
                    sx={{
                      color: "green",
                      fontSize: "14px",
                    }}
                  />
                  <Stack direction={"row"} sx={{ alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                        textTransform: "capitalize",
                        fontSize: "15px",
                      }}
                    >
                      {task?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {" "}
                      {"("}
                      {shortDescription}
                      {task?.description.trim().split(/\s+/).length > 50 &&
                        "..."}{" "}
                      {")"}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  sx={{
                    color: "rgba(65, 65, 65, 0.58)",
                    fontSize: "14px",
                    ml: 3.5,
                  }}
                >
                  Priority - {task?.priority}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )} 
          </Paper>
      </>
  )
}
