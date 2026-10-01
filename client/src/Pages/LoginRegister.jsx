import { useEffect, useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../auth";
import { useSnackbar } from "notistack";
import {
  userLogin,
} from "../app/user/userSlice";
import { useDispatch } from "react-redux";
import { userTask } from "../app/user/taskSlice";
import { userProjectsAsMember, userProjectsAsOwner } from "../app/user/projectSlice";

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
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  "& .MuiOutlinedInput-input::placeholder": { color: "#94a3b8", opacity: 1 },
};

const primaryBtnSx = {
  bgcolor: "#0f172a",
  color: "#fff",
  borderRadius: "10px",
  py: 1.1,
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

export default function LoginRegister({ about }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showLPassword, setShowLPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { request } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const FormSchema = Yup.object().shape({
    name:
      about === "register"
        ? Yup.string()
            .required("Name is required")
            .min(3)
            .matches(
              /^[A-Z][a-zA-Z]*( [a-zA-Z]*)*$/,

              "First Letter of name should be capital and name should be string",
            )
        : Yup.string(),
    email: about==="register" ? Yup.string().email("Invalid Email").required("Email is Required") : Yup.string().required("Email is required"),
    password:
      about === "register"
        ? Yup.string()
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
            )
        : Yup.string().required("Password is required"),
    confirmPassword:
      about === "register"
        ? Yup.string()
            .required("Confirm Password is required")
            .oneOf(
              [Yup.ref("password")],
              "Password and Confirm Password do not match",
            )
        : Yup.string(),
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (about === "register") {
      try {
        const res = await request.post("/user/signup", data);
        if (res.status === 201) {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        }
      }
    } else {
      const data2send = {
        email: data.email,
        password: data?.password,
      };
      try {
        const res = await request.post("/user", data2send);
        enqueueSnackbar("Logged In Successfully", {
          variant: "success",
        });
        dispatch(userLogin(res?.data?.user));
        dispatch(userTask(res?.data?.tasks));
        dispatch(userProjectsAsOwner(res?.data?.projectsAsOwner));
        dispatch(userProjectsAsMember(res?.data?.projectAsMembers))
        navigate("/app");
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.response?.data?.message, {
          variant: "error",
        });
        // toast.error(err?.response?.data?.message);
      }
    }
    reset();
  };

  useEffect(() => {
    reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [about, reset]);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
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
                {about === "register" ? "Create an account" : "Welcome Back"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "rgb(107, 114, 128)",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                {about === "register"
                  ? "Get started with Task Manager today"
                  : "Sign in to your account to continue"}
              </Typography>
            </Stack>

            <Stack spacing={2.25}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.25}>
                  {about === "register" && (
                    <Box>
                      <Typography sx={labelSx}>Name</Typography>
                      <TextField
                        fullWidth
                        placeholder="John Doe"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={fieldSx}
                      />
                    </Box>
                  )}
                  <Box>
                    <Typography sx={labelSx}>Email</Typography>
                    <TextField
                      fullWidth
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={fieldSx}
                    />
                  </Box>
                  {about === "register" ? (
                    <>
                      {" "}
                      <Box>
                        <Typography sx={labelSx}>Password</Typography>
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
                                      <IconButton
                                        onClick={() =>
                                          setShowPassword((s) => !s)
                                        }
                                      >
                                        {showPassword ? (
                                          <VisibilityOffIcon size={12} />
                                        ) : (
                                          <VisibilityIcon size={12} />
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
                    </>
                  ) : (
                    <>
                      <Box>
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 0.75,
                          }}
                        >
                          <Typography sx={{ ...labelSx, mb: 0 }}>
                            Password
                          </Typography>
                          <Link
                            to="/forgot-password"
                            style={{
                              fontSize: "13px",
                              color: "#64748b",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Forgot password ?
                          </Link>
                        </Stack>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              autoComplete="off"
                              placeholder="••••••••"
                              type={showLPassword ? "text" : "password"}
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
                                      <IconButton
                                        onClick={() =>
                                          setShowLPassword((s) => !s)
                                        }
                                      >
                                        {showLPassword ? (
                                          <VisibilityOffIcon size={12} />
                                        ) : (
                                          <VisibilityIcon size={12} />
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
                    </>
                  )}

                  {about === "register" && (
                    <Box>
                      <Typography sx={labelSx}>Confirm password</Typography>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            autoComplete="off"
                            placeholder="••••••••"
                            type={showConfirmPassword ? "text" : "password"}
                            fullWidth
                            value={field.value}
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            sx={fieldSx}
                            helperText={errors.confirmPassword?.message}
                            inputRef={field.ref}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowConfirmPassword((s) => !s)
                                      }
                                    >
                                      {showConfirmPassword ? (
                                        <VisibilityOffIcon size={12} />
                                      ) : (
                                        <VisibilityIcon size={12} />
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
                  )}

                  <Button
                    type="submit"
                    // fullWidth
                    // disableElevation
                    // variant="contained"
                    sx={{ ...primaryBtnSx, mt: 1 }}
                  >
                    {about === "register" ? "Create account" : "Sign In"}
                  </Button>
                </Stack>
              </form>

              {about === "register" ? (
                <>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "rgb(107, 114, 128)",
                      textAlign: "center",
                      mt: 1,
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: "#0f172a",
                        fontWeight: 700,
                        fontSize: "13px",
                        textDecoration: "none",
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#64748b",
                      textAlign: "center",
                      mt: 1,
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      style={{
                        color: "#0f172a",
                        fontWeight: 700,
                        textDecoration: "none",
                        fontSize: "13px",
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </>
              )}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
