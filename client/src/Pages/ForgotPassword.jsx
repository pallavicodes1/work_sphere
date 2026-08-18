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
import { Link, useNavigate } from "react-router-dom";
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
  fontWeight: 600,
  fontSize: "14px",
  letterSpacing:"1px",
  textTransform: "none",
  "&:hover": { bgcolor: "#1e293b" },
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

const labelSx = {
  fontSize: "14px",
  color: "#0f172a",
  mb: 0.75,
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

export default function ForgotPassword() {

  const FormSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"), 
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
      email: ""
    },
  });

  const { request } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit =  async(data) => {
    try {
      const res = await request.post("/user/forgot-password", data);
    if(res?.status===200){
       if(!res.data.success){
    enqueueSnackbar(res?.data?.message,{
        variant: "error",
      });
       }
    else{
        enqueueSnackbar(res?.data?.message, {
        variant: "success",
      });
    }
    }
    reset();
    } catch (error) {
      console.log("Control reached here")
      enqueueSnackbar(error?.response?.data.message, {
        variant: "error",
      });
    }
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
              Forgot Password
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "rgb(107, 114, 128)",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
             Enter your email to find your account
            </Typography>
          </Stack>

          <Stack spacing={2.25}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.25}>
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


                <Button
                type="submit"
                  fullWidth
                  disableElevation
                  variant="contained"
                  sx={{ ...primaryBtnSx, mt: 1 }}
                >
                  Continue
                </Button>
              </Stack>
            </form>

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
                  fontSize:"13px"
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
