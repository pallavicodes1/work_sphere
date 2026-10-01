import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { useState } from "react";

import MenuComponents from "./MenuComponents";

const ProjectMainContent = ({ owner, projects, setprojectAsOwner }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log("project component");

  const priorityStyles = {
    low: { bgcolor: "hsla(175, 80%, 50%, 0.2)", color: "hsl(175, 80%, 50%)" },
    medium: {
      bgcolor: "hsla(45, 100%, 50%, 0.2)",
      color: "hsl(45, 100%, 60%)",
    },
    high: { bgcolor: "hsla(0, 84%, 60%, 0.2)", color: "hsl(0, 84%, 60%)" },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {projects?.length === 0 ? (
        <Box
          sx={{
            mt: 3,
            // borderRadius: "14px",
            // borderColor: "#e5e7eb",
            py: 8,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Stack spacing={0.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "#dcfce7",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: "28px", color: "#16a34a" }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#0f172a",
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
              You have no active projects
            </Typography>
          </Stack>
        </Box>
      ) : null}
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}
      >
        {projects?.map((project) => (
          <Card
            key={project?._id}
            sx={{
              width: 350,
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <CardContent>
              {/* Project name */}
              <Stack direction={"column"} spacing={1.25}>
                <Stack>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <Typography
                      sx={{
                        fontWeight: 600,
                        // color: projectTitleColors[index % projectTitleColors.length],
                        fontSize: "16px",
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                        textTransform: "capitalize",
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Box>
                      <MenuComponents
                        owner={owner}
                        projectId={project._id}
                        setprojectAsOwner={setprojectAsOwner}
                      />
                    </Box>
                  </Stack>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: "14px",
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {project?.description.slice(0, 35)}...
                  </Typography>
                </Stack>

                <Chip
                  icon={<FlagOutlinedIcon />}
                  label={project.priority}
                  size="small"
                  sx={{
                    px: 1,
                    py: 2,
                    alignSelf: "flex-start",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    ...priorityStyles[project.priority],
                    "& .MuiChip-icon": {
                      color: "inherit",
                      fontSize: "14px ",
                    },
                  }}
                />

                <Stack
                  spacing={0.5}
                  direction={"row"}
                  sx={{ alignItems: "center" }}
                >
                  <CalendarTodayOutlinedIcon
                    sx={{ fontSize: "13px", color: "#475569" }}
                  />
                  <Typography
                    sx={{
                      color: "#475569",
                      fontSize: "14px",
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {formatDate(project.endDate)}
                  </Typography>
                </Stack>
              </Stack>
              {/* Date + Priority */}

              {/* Members */}
              {/* <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <AvatarGroup
                  max={4}
                  sx={{
                    "& .MuiAvatar-root": {
                      width: 30,
                      height: 30,
                      fontSize: 12,
                      border: "2px solid white",
                    },
                  }}
                >
                  {project.members.map((member) => (
                    <Avatar
                      key={member._id}
                      src={member.avatar}
                      alt={member.name}
                    >
                      {member.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Box> */}

              {/* <Button
                disableElevation
                disableRipple
                onClick={() => navigate(`/app/projects/${project._id}`)}
                sx={{
                  textTransform: "capitalize",
                  bgcolor: "white",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  float: "right",
                }}
              >
                View More
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ProjectMainContent;
