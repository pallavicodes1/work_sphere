import {
  Box,
  Stack,
  Button,
  Typography,
  Container,
  Chip,
  Avatar,
  AvatarGroup,
  Paper,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { forwardRef } from "react";

export const Hero = forwardRef((props, ref) => {
  const navigate = useNavigate();
  return (
    <Box
    ref={ref}
      sx={{
        pt: { xs: 16, md: 28 },
        pb: { xs: 12, md: 20 },
        backgroundColor: "#fcfcfc",

        backgroundImage: `
            linear-gradient(to right, #e0f2fe 1px, transparent 1px),
            linear-gradient(to bottom, #e0f2fe 1px, transparent 1px);`,

        backgroundSize: "120px 120px",
      }}
    >
      <ScrollReveal once={false}>
        <Stack
          direction={"column"}
          spacing={{sm:1,md:4}}
          sx={{ alignItems: "center", textAlign: "center", flex: 1 }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: 22, sm: 34, md: "68px" },
              lineHeight: {sm:"52px",md:"91.2px"},
              letterSpacing: "-1.9px",
              color: "rgb(0,0,0)",
              maxWidth: 1100,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Your Daily Tasks
            <br />
            Organized Effortlessly
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, md: "20px" },
              color: "rgba(68, 69, 78, 0.7)",
              maxWidth: 760,
              lineHeight: 1.6,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Task Manager helps you manage daily tasks, assign teammates, and
            track <br />
            progress— all in a simple, fast, and visual workspace.
          </Typography>
          <Button
            variant="contained"
            disableElevation
            size="large"
            sx={{
              bgcolor: "#0f172a",
              color: "#fff",
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "14px",
              textTransform: "none",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Get Started
          </Button>
        </Stack>
      </ScrollReveal>
    </Box>
  );
});
