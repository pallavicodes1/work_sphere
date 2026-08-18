import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

export function CTA() {
  const navigate=useNavigate();
  return (
    <Box sx={{ bgcolor: "#fff", pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#0b1220",
            borderRadius: "24px",
            py: { xs: 6, md: 10 },
            px: 4,
            textAlign: "center",
          }}
        >
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: {  xs: 22, sm: 30, md: 38 },
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif"
              }}
            >
              Start Getting Things Done
              <br />
              Visually And Effortlessly
            </Typography>
            <Typography sx={{
               fontSize: { xs: 14, md: 15 }, 
               color: "#94a3b8", maxWidth: 620, 
               lineHeight: 1.6,   
                fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
              Unlock your team's potential by organizing tasks with Task Manager — the modern, intuitive
              to-do app designed to boost productivity and reduce chaos.
            </Typography>
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#fff",
                color: "#0f172a",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { bgcolor: "#f1f5f9" },
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
              }}
              onClick={()=>{navigate('/register')}}
            >
              Get Started
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
