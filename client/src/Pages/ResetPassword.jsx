import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import useAuth from "../auth";
import { useSnackbar } from "notistack";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(15,23,42,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&.Mui-focused fieldset": { borderColor: "#0f172a", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input": {
    py: 1.4,
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
  py: 1.1,
  letterSpacing:"1px",
  fontWeight: 600,
  fontSize:"13px",
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

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const FormSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
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
    confirmNewPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmNewPassword: "",
    },
  });

  const { request } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paramData=useParams("token");
  const onSubmit = async(data) => {
    try {
      const res = await request.post(`/user/reset-password/${paramData?.token}`, data);
      enqueueSnackbar("Password Reset Successfully, Login into your account", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",        
        });
      }
    }

    reset();
    // console.log(data);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
            mx: "auto",
            p: { xs: 3, sm: 4.5 },
            borderRadius: "14px",
            border: "1px solid rgba(15,23,42,0.08)",
            bgcolor: "#fff",
          }}
        >
          <Stack spacing={0.5} sx={{ textAlign: "center", mb: 3.5 }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                color: "#0f172a",
                letterSpacing: "-0.02em",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              Update Password
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "rgb(107, 114, 128)",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              Enter your new password below to reset your password.
            </Typography>
          </Stack>

          <Stack spacing={2.25}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.25}>
                <Box>
                  <Typography sx={labelSx}>New Password</Typography>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        autoComplete="off"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={field.value}
                        {...register("password")}
                        error={!!errors.password}
                        sx={fieldSx}
                        helperText={errors.password?.message}
                        inputRef={field.ref}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                {/* <IconButton onClick={() => setShowPassword((s) => !s)}>
                                           {showPassword ? (
                                             <EyeOff size={16} />
                                           ) : (
                                             <Eye size={16} />
                                           )}
                                         </IconButton> */}
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Typography sx={labelSx}>Confirm New password</Typography>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    type="password"
                    {...register("confirmNewPassword")}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword?.message}
                    placeholder="••••••••"
                    sx={fieldSx}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{ ...primaryBtnSx, mt: 1 }}
                >
                  Update
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
