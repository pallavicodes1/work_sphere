import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Stack,
  Button,
  CardHeader,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import useAuth from "../../auth";
import { userLogin } from "../../app/user/userSlice";
import MembersDialog from "./MembersDialog";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(15,23,42,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&.Mui-focused fieldset": { borderColor: "#0f172a", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input": {
    py: 1.2,
    px: 1.6,
    fontSize: "13px",
    color: "#0f172a",
  },
  "& .MuiOutlinedInput-input::placeholder": { color: "#94a3b8", opacity: 1 },
};

const primaryBtnSx = {
  bgcolor: "#0f172a",
  color: "#fff",
  borderRadius: "10px",
  py: 1,
  px: 2,
  fontWeight: 600,
  fontSize: "13px",
  letterSpacing: "1px",
  textTransform: "none",
  "&:hover": { bgcolor: "#1e293b" },
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

const labelSx = {
  fontSize: "13px",
  color: "#0f172a",
  mb: 0.75,
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

// const FormSchema = Yup.object().shape({
//   name: Yup.string()
//     .required("Name is required")
//     .min(3)
//     .matches(
//       /^[A-Z][a-zA-Z]*( [a-zA-Z]*)*$/,

//       "First Letter of name should be capital and name should be string",
//     ),
//   email: Yup.string().email("Invalid Email").required("Email is Required"),
// });

export default function MembersOverview({ members, handleChange }) {
 
  const { request } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
            <>
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
                  Project Members
                </Typography>

                <Button
                  disableTouchRipple
                  disableElevation
                  onClick={(e) => handleChange(e, 2)}
                  sx={{
                    bgcolor: "white",
                    color: "#0a3eb7",
                    textTransform: "none",
                    //   fontWeight: 600,
                    fontSize: "13px",
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  View All Members
                </Button>
              </Stack>
            </>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            {" "}
            {members?.slice(0, 4)?.map((member, index) => {
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack
                      spacing={2}
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        px: 2,
                      }}
                    >
                      <Avatar sx={{ width: 36, height: 36 }} />
                      <Stack>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            fontFamily:
                              "Inter, system-ui, -apple-system, sans-serif",
                          }}
                        >
                          {member?.userId?.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontFamily:
                              "Inter, system-ui, -apple-system, sans-serif",
                          }}
                        >
                          {member?.userId?.email}
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* <IconButton>
                      <RemoveCircleIcon
                      />
                    </IconButton> */}
                  </Box>
                </>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
