import React from "react";
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
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import useAuth from "../../auth";
import { userLogin } from "../../app/user/userSlice";

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
  px:2,
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

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3)
    .matches(
      /^[A-Z][a-zA-Z]*( [a-zA-Z]*)*$/,

      "First Letter of name should be capital and name should be string",
    ),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});
function PersonalInfo() {
  const user = useSelector((state) => state.userReducer.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      contactNumber: user?.contactNumber,
    },
  });

  const { request } = useAuth();
  const dispatch = useDispatch();
  const {enqueueSnackbar}=useSnackbar();
  const onSubmit = async (data) => {
    try {
      const res = await request.patch(`/user/${user?._id}`, data);
      if (res.status==200) {
        dispatch(userLogin(res?.data?.data));
        enqueueSnackbar(res?.data?.message,{
          variant:"success"
        })
      }
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message,{
          variant:"error"
        })
         reset()
    }
   
  };

  return (
    <>
      <Card sx={{border:"1px solid rgba(65, 65, 65, 0.18)",borderRadius:"12px"}} elevation={0}>
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                color: "#0f172a",
                fontWeight: 700,
                fontSize:"16px"
              }}
            >
              Profile Information
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.25}>
              <Box>
                <Typography sx={labelSx}>Full name</Typography>
                <TextField
                  fullWidth
                  autoComplete="off"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={fieldSx}
                />
              </Box>
              <Box>
                <Typography sx={labelSx}>Email</Typography>
                <TextField
                  fullWidth
                  type="email"
                  autoComplete="off"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={fieldSx}
                />
              </Box>
              <Box>
                <Typography sx={labelSx}>Contact Number</Typography>
                <TextField
                  fullWidth
                  autoComplete="off"
                  {...register("contactNumber")}
                  placeholder="XXXXXX XXXXX"
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                  sx={fieldSx}
                />
              </Box>
              <Button
                type="submit"
                // fullWidth
                // disableElevation
                // variant="contained"
                sx={{ ...primaryBtnSx, mt: 1,alignSelf:"flex-end" }}
              >
                Update Info
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default PersonalInfo;
