import React from "react";
import PersonalInfo from "./PersonalInfo";
import UpdatePassword from "./UpdatePassword";
import { Box, Typography, Stack } from "@mui/material";
import DangerSection from "./DangerSection";

function ProfileSection() {
  return (
    <>
      <Box
        sx={{ px: { xs: 2, md: 5 }, flex: 1, alignItems: "flex-start" }}
      >
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.02em",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          My Profile
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#64748b",
            mt: 0.5,
            mb:2,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Change your account settings and preferences
        </Typography>
        <Stack direction={"column"} spacing={2}>
            <Stack
          direction={"row"}
          sx={{ flex: 1, justifyContent: "space-between" }}
          spacing={6}
        >
          <Box sx={{ flexGrow: 1 }}>
            {" "}
            <PersonalInfo />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {" "}
            <UpdatePassword />
          </Box>
        </Stack>
        <DangerSection/><br />
        </Stack>
      
      </Box>
    </>
  );
}

export default ProfileSection;
