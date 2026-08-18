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
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

import { useSelector } from "react-redux";
import useAuth from "../../auth";

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
  letterSpacing:"1px",
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

function UpdatePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { request } = useAuth();
  const user = useSelector((state) => state.userReducer.user);
  const FormSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password should contain at least one uppercase and lowercase character",
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,

        "Password should contain at least one special character",
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf(
        [Yup.ref("newPassword")],
        "New Password and Confirm Password should match",
      ),
  });

  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors: error },
    reset: reset,
    control: control,
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await request.patch(`/user/password/${user?._id}`, data);
      if (result.status == 200) {
        enqueueSnackbar(result?.data?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    }

    reset();
  };
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
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              Update Password
            </Typography>
          }
        />

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.25}>
              <Box>
                <Typography sx={labelSx}>Current Password</Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoComplete="off"
                      placeholder="••••••••"
                      sx={fieldSx}
                      type={showCurrent ? "text" : "password"}
                      fullWidth
                      size="small"
                      error={!!error.password}
                      helperText={error.password?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowCurrent((s) => !s)}
                              >
                                {showCurrent ? (
                                  <VisibilityOffIcon size={16} />
                                ) : (
                                  <VisibilityIcon size={16} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box>
                <Typography sx={labelSx}>New Password</Typography>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={fieldSx}
                      autoComplete="off"
                      placeholder="••••••••"
                      type={showNew ? "text" : "password"}
                      fullWidth
                      size="small"
                      error={!!error.newPassword}
                      helperText={error.newPassword?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowNew((s) => !s)}>
                                {showNew ? (
                                  <VisibilityOffIcon size={16} />
                                ) : (
                                  <VisibilityIcon size={16} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography sx={labelSx}>New Password</Typography>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={fieldSx}
                      type={showConfirm ? "text" : "password"}
                      autoComplete="off"
                      placeholder="••••••••"
                      fullWidth
                      size="small"
                      error={!!error.confirmPassword}
                      helperText={error.confirmPassword?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirm((s) => !s)}
                              >
                                {showConfirm ? (
                                  <VisibilityOffIcon size={16} />
                                ) : (
                                  <VisibilityIcon size={16} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Button
                type="submit"
                // fullWidth
                // disableElevation
                // variant="contained"
                sx={{ ...primaryBtnSx, mt: 1, alignSelf: "flex-end" }}
              >
                Update Password
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdatePassword;
