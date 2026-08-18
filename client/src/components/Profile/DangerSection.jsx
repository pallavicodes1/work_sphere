import {
  CardContent,
  Card,
  Stack,
  Typography,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import AlertDialog from "../AlertDialog";
import AmberWarningIcon from "@mui/icons-material/WarningAmber";
import { useSelector } from "react-redux";
function DangerSection() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  return (
    <>
      <Card
        sx={{
          border: "1px solid rgba(65, 65, 65, 0.18)",
          borderRadius: "12px",
        }}
        elevation={0}
      >
        <CardHeader
          title={
            <Stack direction={"column"} spacing={0.5}>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <AmberWarningIcon sx={{ color: "hsl(0, 84%, 60%)" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    color: "hsl(0, 84%, 60%)",
                    fontWeight: 700,
                    fontSize:"16px"
                  }}
                >
                  Danger Zone
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: "rgba(65, 65, 65, 0.79)",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  fontSize: "13px",
                  fontWeight: 550,
                }}
              >
                Irreversible action for your account
              </Typography>
            </Stack>
          }
        />

        <CardContent>
          <Typography
            sx={{
              fontWeight: 600,
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              fontSize:"14px"
            }}
          >
            Delete Account
          </Typography>
          <Typography
            sx={{
              color: "rgba(65, 65, 65, 0.79)",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              fontSize: "13px",
            }}
          >
            Permanently delete your acoount and all possible. This action cannot
            be undone{" "}
          </Typography>
        </CardContent>
        <CardActions sx={{ mb: 1 }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              color: "white",
              fontWeight: 400,
              bgcolor: "hsl(0, 84%, 60%)",
              textTransform: "none",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              borderRadius: "10px",
              fontSize:"13px"
            }}
          >
            Delete Account
          </Button>
        </CardActions>
      </Card>
      <AlertDialog
        data={"account"}
        open={open}
        setOpen={setOpen}
        toDelete={user?._id}
      />
    </>
  );
}

export default DangerSection;
