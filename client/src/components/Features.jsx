import {
  Box,
  Stack,
  Typography,
  Container,
  Chip,
  Avatar,
  AvatarGroup,
  Paper,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ScrollReveal from "./ScrollReveal";
import { forwardRef } from "react";
function PlanCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.06)",
        bgcolor: "#fff",
        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)",
        width: "80%",
      }}
    >
      <Stack direction={"column"} spacing={1.5}>
        <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: "center", color: "#64748b" }}
        >
          <CalendarTodayIcon sx={{ fontSize: 16 }} />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#0f172a",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Upcoming Tasks
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#64748b",
              mb: 1.5,
              lineHeight: 1.5,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Create UI for Registeration Page
          </Typography>
          <Chip
            label={"low"}
            size="small"
            sx={{
              backgroundColor: "hsla(175, 80%, 50%, 0.2)",
              color: "hsl(175, 80%, 50%)",
              fontWeight: 500,
              fontSize: "0.70rem",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          />
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#64748b",
              mb: 1.5,
              lineHeight: 1.5,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Create UI for Login Page
          </Typography>
          <Chip
            label={"medium"}
            size="small"
            sx={{
              backgroundColor: "hsla(45, 100%, 50%, 0.2)",
              color: "hsl(45, 100%, 60%)",
              fontWeight: 500,
              fontSize: "0.70rem",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          />
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#64748b",
              mb: 1.5,
              lineHeight: 1.5,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Create UI for Landing Page
          </Typography>
          <Chip
            label={"high"}
            size="small"
            sx={{
              backgroundColor: "hsla(0, 84%, 60%, 0.2)",
              color: "hsl(0, 84%, 60%)",
              fontWeight: 500,
              fontSize: "0.70rem",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

function MembersCard() {
  const members = [
    { name: "Dimitri Ivanov", role: "Designer", color: "#fca5a5" },
    { name: "Hamail Harrison", role: "Senior Designer", color: "#93c5fd" },
  ];
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.06)",
        bgcolor: "#fff",
        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)",
        width: "80%",
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            color: "#0f172a",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Add New Member
        </Typography>
        <IconButton size="small" disabled>
          <CloseIcon sx={{ fontSize: "14px", color: "black" }} />
        </IconButton>
      </Stack>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#64748b",
          mb: 1,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        Team Member
      </Typography>
      <Stack spacing={1}>
        {members.map((m) => (
          <Stack
            key={m.name}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Avatar sx={{ bgcolor: m.color, width: 36, height: 36 }}>
              {m.name[0]}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                {m.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#64748b",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                {m.role}
              </Typography>
            </Box>
            <Button
              variant="contained"
              disableElevation
              disableRipple
              size="small"
              sx={{
                bgcolor: "#0f172a",
                color: "#fff",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "default",
                px: 2,
                "&:hover": { bgcolor: "#1e293b" },
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              Invite
            </Button>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

function ProgressCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.06)",
        bgcolor: "#fff",
        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)",
        width: "80%",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 15,
          color: "#0f172a",
          mb: 2,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        Task Progress
      </Typography>
      <Box sx={{ position: "relative", width: 160, height: 90, mx: "auto" }}>
        <svg viewBox="0 0 100 55" width="100%" height="100%">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 82 25"
            stroke="#0f172a"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <Typography
          sx={{
            position: "absolute",
            bottom: 4,
            left: 0,
            right: 0,
            fontWeight: 700,
            fontSize: 22,
            color: "#0f172a",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          86%
        </Typography>
      </Box>
    </Paper>
  );
}

const features = [
  {
    title: "Plan With Precision",
    desc: "Turn ideas into actionable tasks with clear deadlines, priorities, and team ownership.",
    card: <PlanCard />,
  },
  {
    title: "Collaborate Without Chaos",
    desc: "Easily invite teammates, assign tasks, and stay aligned — whether remote or in-office.",
    card: <MembersCard />,
  },
  {
    title: "Track What Matters",
    desc: "Stay in control with a real-time view of progress across all task stages.",
    card: <ProgressCard />,
  },
];

export const Features = forwardRef((props,ref) => {
  console.log(ref);
  return (
    <Box
    ref={ref}
    sx={{ bgcolor: "#fff", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <ScrollReveal once={false}>
          {" "}
          {/* <Grid container spacing={12} sx={{ mb: { xs: 6, md: 10 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 28, sm: 36, md: 46 },
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#0f172a",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                Why Teams Love
                <br />
                Using Task Manager
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 20 },
                  color: "#64748b",
                  lineHeight: 1.6,
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                Discover how Task Manager simplifies team collaboration, boosts
                productivity, and helps you stay on top of every task — every
                day.
              </Typography>
            </Grid>
          </Grid> */}
          <Box sx={{ textAlign: "center", border: "1px" }}>
            <Typography
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 22, sm: 30, md: 38 },
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#0f172a",
                pb: { sm: 8 },
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              Why Teams Love Using Task Manager
            </Typography>
          </Box>
        </ScrollReveal>

        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {features.map((f) => (
            <Grid key={f.title} size={{ xs: 9, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#eef1f6",
                    py: 3,
                    px: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 240,
                  }}
                >
                  {f.card}
                </Box>
                <Box sx={{ p: 3, bgcolor: "#fff" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#0f172a",
                      mb: 1,
                      letterSpacing: "-0.01em",
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#64748b",
                      lineHeight: 1.6,
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {f.desc}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

