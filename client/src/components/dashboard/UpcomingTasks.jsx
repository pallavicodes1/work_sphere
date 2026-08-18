import { Stack, Typography ,Paper} from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayRounded";
import { useSelector } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

function UpcomingTasks() {
  const tasks = useSelector((state) => state.taskReducer.task);
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() + 1);
  startDate.setHours(0, 0, 0, 0);

  // End: 7th day at 23:59:59
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 7);
  endDate.setHours(23, 59, 59, 999);

  const upcomingTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);

    return taskDate >= startDate && taskDate <= endDate;
  });

  console.log(upcomingTasks);
  return (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: "14px",
              borderColor: "#e5e7eb",
              p: 3,
              minHeight: 300,
            }}
          >
             <Stack
              direction="row"
              spacing={1.25}
              sx={{ alignItems: "center", mb: 3 }}
            >
              <CalendarTodayIcon sx={{ fontSize: "16px", color: "#0f172a" }} />
              <Typography
                sx={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" ,fontFamily: "Inter, system-ui, -apple-system, sans-serif",}}
              >
                Upcoming Tasks
              </Typography>     
            </Stack>
      {upcomingTasks.length === 0 ? (
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            color: "#94a3b8",
          }}
        >
          <AccessTimeIcon sx={{ fontSize: "26px" }} />
          <Typography
            sx={{
              fontSize: "16px",
              color: "#64748b",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            No upcoming tasks
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#94a3b8",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Tasks due within 7 days will appear here
          </Typography>
        </Stack>
      ) : (
        <Stack direction={"column"}>
          {upcomingTasks.slice(0, 5).map((task) => {
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
                  On - {formattedDate}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
</Paper>
  );
}

export default UpcomingTasks;
