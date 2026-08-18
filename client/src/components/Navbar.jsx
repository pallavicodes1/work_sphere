import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar({onScrollToFeatures,onScrollToHero}) {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        color: "black",
        pt: 1,
        zIndex: 1000,
        pb: 1,
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="text"
            disableRipple
            sx={{
              textTransform: "capitalize",
              color: "rgb(47, 48, 49)",
              fontSize: 20,
              fontWeight: "bold",
              "&:hover": { bgcolor: "transparent" },
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            WorkSphere
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button
          onClick={onScrollToHero}
            sx={{
              textTransform: "none",
              color: "rgb(75 85 99)",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": { bgcolor: "transparent" },
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
            disableRipple
            disableTouchRipple
          >
            Home
          </Button>
          <Button
          onClick={onScrollToFeatures}
            sx={{
              textTransform: "none",
              color: "rgb(75 85 99    )",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": { bgcolor: "transparent" },
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
            disableRipple
          >
            Features
          </Button>
   
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "black",
              color: "white",
              fontSize:"12px",
              px:3,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
            size="medium"
            onClick={() => {
              navigate("/register");
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
