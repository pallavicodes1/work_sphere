import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import TaskAddIcon from "@mui/icons-material/Add";
import MemberAdd from "@mui/icons-material/PersonAddOutlined";
import MemberRemove from "@mui/icons-material/PersonRemoveOutlined";
import DeleteTask from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const formatDate = (date) => {
  const formatted = new Date(date).toLocaleString("en-In", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formatted;
};
const icons = {
  TASK_CREATED: {
    icon: <TaskAddIcon sx={{ color: "#3B82E8", fontSize: "20px" }} />,
    bg: "#E6EFFE",
  },
  TASK_COMPLETED: {
    icon: <CircleIcon sx={{ color: "#35B985", fontSize: "20px" }} />,
    bg: "#DCF3E9",
  },
  TASK_UPDATED: {
    icon: <EditIcon sx={{ color: "#E9A12B", fontSize: "20px" }} />,
    bg: "#FEF1E1",
  },
  TASK_DELETED: {
    icon: <DeleteTask sx={{ color: "#E05252", fontSize: "20px" }} />,
    bg: "#FDECEC",
  },
  MEMBER_ADDED: {
    icon: <MemberAdd sx={{ color: "#3B82E8", fontSize: "20px" }} />,
    bg: "#E6EFFE",
  },
  MEMBER_REMOVED: {
    icon: <MemberRemove sx={{ color: "#E05252", fontSize: "20px" }} />,
    bg: "#FDECEC",
  },
  PROJECT_UPDATED: {
    icon: <EditIcon sx={{ color: "#E9A12B", fontSize: "20px" }} />,
    bg: "#FEF1E1",
  },
};
export default function RecentActivity({ activities, handleChange }) {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <>
      <Card
        sx={{
          border: "1px solid rgba(65, 65, 65, 0.18)",
          borderRadius: "12px",
          flex: 1,
        }}
        elevation={0}
      >
        <CardHeader
          title={
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  color: "#0f172a",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Recent Activity
              </Typography>
              <Button
                onClick={(e) => handleChange(e, 3)}
                sx={{
                  bgcolor: "white",
                  textTransform: "none",
                  fontSize: "13px",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
                disableTouchRipple
              >
                View All Activity
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <Box>
            {activities?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  minHeight: 70,
                }}
              >
                {/* Timeline */}
                <Stack
                  sx={{
                    alignItems: "center",
                  }}
                  direction={"row"}
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 70,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: icons[item?.type]?.bg,
                      }}
                    >
                      {icons[item?.type]?.icon}
                    </Box>

                    {/* Vertical line */}
                    {index !== activities.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 32,
                          bottom: 0,
                          width: "2px",
                          backgroundColor: "#E5E7EB",
                        }}
                      />
                    )}
                  </Box>

                  {/* Activity content */}
                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      <b
                        style={{
                          color:
                            item.userId._id === user._id
                              ? "rgba(42, 148, 42, 0.78)"
                              : "rgba(0, 0, 255, 0.69)",
                          fontSize: "15px",
                        }}
                      >
                        {item.userId._id === user._id
                          ? "You"
                          : item?.userId.name}
                      </b>{" "}
                      {item.message}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#8A8F98",
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {/* {activity.date}
              {"  •  "}
              {activity.time} */}
                      {formatDate(item.createdAt)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
