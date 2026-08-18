import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Stack,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import useAuth from "../../auth";
import { addOProject } from "../../app/user/projectSlice";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&:hover fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&.Mui-focused fieldset": { borderColor: "#0f172a", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input": {
    py: 1.45,
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
  py: 1.5,
  fontWeight: 600,
  fontSize: "13px",
  textTransform: "none",
  "&:hover": { bgcolor: "#1e293b" },
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

const labelSx = {
  fontSize: "13px",
  letterSpacing: "1px",
  color: "#0f172a",
  mb: 0.75,
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};


const AddProject = ({ open, onClose,setprojectAsOwner }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required("Title is Required")
      .max(40, "Title should not be more than 40 characters"),
    priority: Yup.string().required("Priority is required"),
    startDate: Yup.date().nullable().required("Start Date is required"),
    endDate: Yup.date().nullable().required("End Date is required"),
    members: Yup.array()
      .of(
        Yup.object({
          _id: Yup.string().required(),
        }),
      )
      .default([]),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .min(100, "Description must be at least 100 characters long")
      .max(150,"Description must be less than 150 characters"),
  });

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      priority: "low",
      startDate: null,
      endDate: null,
      description: "",
    },
  });

  const { request } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        members: data.members.map((member) => member._id),
      };
      const result = await request.post("/project", payload);
      if (result.status === 201) {
        setprojectAsOwner(prev=>[...prev,result?.data?.result])
      }
    } catch (error) {
      console.log("in catch block");
    }
    reset({
      title: "",
      priority: "low",
      startDate: null,
      endDate: null,
      description: "",
    });
    onClose();
  };

  useEffect(() => {
    reset({
      title: "",
      priority: "low",
      startDate: null,
      endDate: null,
      description: "",
    });
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth style={{ borderRadius: 4 }}>
      <DialogTitle>
        <Stack spacing={0.5} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              color: "#0f172a",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Add Project
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#94a3b8",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Enter your details to add new project
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.25}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.25}>
              <Box>
                <Typography sx={labelSx}>Title</Typography>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={fieldSx}
                      {...field}
                      placeholder="e.g. Finish project proposal"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={labelSx}>Start Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          minDate={new Date()}
                          format="dd/MM/yyyy"
                          value={field.value}
                          onChange={(date) => {
                            if (date) {
                              const localDate = new Date(date);
                              localDate.setHours(12, 0, 0, 0);
                              field.onChange(localDate);
                            } else {
                              field.onChange(null);
                            }
                          }}
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!errors.startDate,
                              helperText: errors?.startDate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={labelSx}>End Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          minDate={new Date()}
                          format="dd/MM/yyyy"
                          value={field.value}
                          onChange={(date) => {
                            if (date) {
                              const localDate = new Date(date);
                              localDate.setHours(12, 0, 0, 0);
                              field.onChange(localDate);
                            } else {
                              field.onChange(null);
                            }
                          }}
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!errors.endDate,
                              helperText: errors?.endDate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box>
                <Typography sx={labelSx}>Priority</Typography>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          bgcolor: "#fff",
                          "& fieldset": { borderColor: "rgba(15,23,42,0.24)" },
                          "&:hover fieldset": {
                            borderColor: "rgba(15,23,42,0.24)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#0f172a",
                            borderWidth: 1,
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          py: 1.2,
                          px: 1.6,
                          fontSize: "13px",
                          color: "#0f172a",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                      size="small"
                      fullWidth
                      error={!!errors?.priority}
                      helperText={errors?.priority?.message}
                    >
                      <MenuItem
                        value="low"
                        sx={{
                          fontSize: "14px",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        }}
                      >
                        Low
                      </MenuItem>
                      <MenuItem
                        value="medium"
                        sx={{
                          fontSize: "14px",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        }}
                      >
                        Medium
                      </MenuItem>
                      <MenuItem
                        value="high"
                        sx={{
                          fontSize: "14px",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        }}
                      >
                        High
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Box>

              <Box>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Add details about this task..."
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          bgcolor: "#fff",
                          "& fieldset": { borderColor: "rgba(15,23,42,0.24)" },
                          "&:hover fieldset": {
                            borderColor: "rgba(15,23,42,0.24)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#0f172a",
                            borderWidth: 1,
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          py: 0.5,
                          px: 0,
                          fontSize: "13px",
                          color: "#0f172a",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          color: "#94a3b8",
                          opacity: 1,
                        },
                      }}
                      multiline
                      minRows={3}
                      size="small"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Box>
              {/* <Button
                type="submit"
                  fullWidth
                  disableElevation
                  variant="contained"
                  sx={{ ...primaryBtnSx, mt: 1 }}
                >
                  Add
                </Button> */}
              <Button
                type="submit"
                fullWidth
                disableElevation
                variant="contained"
                sx={{ ...primaryBtnSx, mt: 1 }}
              >
                Add Project
              </Button>
            </Stack>
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
