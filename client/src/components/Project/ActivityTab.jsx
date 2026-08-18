import React, { useEffect, useState } from "react";
import useAuth from "../../auth";
import { useParams } from "react-router-dom";
import { Box, Pagination, Stack, Typography } from "@mui/material";
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
export default function ActivityTab() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { request } = useAuth();
  const { projectId } = useParams();
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    const getActivity = async () => {
      const result = await request.get(`/project/${projectId}/activity`, {
        params: {
          page,
          limit: 5,
        },
      });
      if (result.status === 200) {
        setActivity(result?.data?.activity);
        setTotalPages(result.data.pagination.totalPages);
        setLoading(false);
      }
    };
    getActivity();
  }, [page]);

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

  return (
    <>
      {!loading ? (
        <Box>
          {activity?.map((item, index) => (
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
                  {index !== activity.length - 1 && (
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
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
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
                      {item.userId._id === user._id ? "You" : item?.userId.name}
                    </b>{" "}
                    {item.message}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#8A8F98",
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
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
          {activity.length > 0 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              sx={{ justifySelf: "center", mt: 2 }}
            />
          )}
        </Box>
      ) : (
        <Typography>Loading</Typography>
      )}
    </>
  );
}
