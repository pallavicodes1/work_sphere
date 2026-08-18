import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Stack,
  Box,
  TextField,
  Button,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  LinearProgress,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";
import useAuth from "../../auth";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { addCurrentProject } from "../../app/user/currentProjectSlice";

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
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
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

export default function ProjectSettings() {
  const [canEditEndDate, setCanEditEndDate] = useState(false);
  const currentProject = useSelector(
    (state) => state.currentProjectReducer.data,
  );
  const dispatch = useDispatch();
  const { request } = useAuth();
  const {enqueueSnackbar} = useSnackbar();
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is Required")
      .max(20, "Title should not be more than 20 characters"),
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
      .min(100, "Description must be al least 100 characters long")
      .max(150, "Description must be less than 150 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      priority: "",
      startDate: null,
      endDate: null,
      description: "",
    },
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  useEffect(() => {
    if (currentProject) {
      reset({
        title: currentProject.title ?? "",
        priority: currentProject.priority ?? "",
        startDate: currentProject.startDate
          ? new Date(currentProject.startDate)
          : null,
        endDate: currentProject.endDate
          ? new Date(currentProject.endDate)
          : null,
        description: currentProject.description ?? "",
        status: currentProject?.status ?? "",
      });
    }
  }, [currentProject, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await request.patch(`/project/${currentProject._id}`, data);
      if (res.status == 200) {
        dispatch(addCurrentProject(res?.data?.updatedProject));
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
        });
      }
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, {
        variant: "error",
      });
      reset();
    }
    console.log(data);
  };
  return (
    <Card
      sx={{
        borderRadius: "12px",

        // flexGrow:1,
      }}
      elevation={0}
    >
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={{xs:"column",lg:"row"}} spacing={6}>
            <Stack spacing={3} sx={{ flex: 1 }}>
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
                          disabled
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
                              sx: fieldSx,
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography sx={labelSx}>End Date</Typography>
                    <Typography
                      onClick={() => {
                        setCanEditEndDate(true);
                        setValue("endDate", null);
                      }}
                      sx={{
                        fontSize: "13px",
                        color: "#64748b",
                        mb: 0.75,
                        cursor: "pointer",
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Change End Date ?
                    </Typography>
                  </Stack>

                  {!canEditEndDate ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disabled
                        value={watch("endDate")}
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value}
                            minDate={today}
                            format="dd/MM/yyyy"
                            onChange={field.onChange}
                            slotProps={{
                              textField: {
                                size: "small",
                                fullWidth: true,
                                error: !!errors.endDate,
                                helperText: errors.endDate?.message,
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Box>
              </Box>

              <Box>
                {" "}
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
                          py: 1.0,
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
                  name="status"
                  control={control}
                  defaultValue={currentProject?.status || "pending"}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <FormLabel
                        sx={{
                          fontSize: "13px",
                          letterSpacing: "1px",
                          mb: 1,
                          ml: 1,
                          color: "#0f172a",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",

                          "&.Mui-focused": {
                            color: "#0f172a",
                          },
                        }}
                      >
                        Status
                      </FormLabel>

                      <RadioGroup
                        row
                        sx={{ ml: 1 }}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <FormControlLabel
                          value="pending"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily:
                                  "Inter, system-ui, -apple-system, sans-serif",
                                color: "#0f172a",
                              }}
                            >
                              Pending
                            </Typography>
                          }
                        />

                        <FormControlLabel
                          value="in-progress"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily:
                                  "Inter, system-ui, -apple-system, sans-serif",
                                color: "#0f172a",
                              }}
                            >
                              In Progress
                            </Typography>
                          }
                        />

                        <FormControlLabel
                          value="completed"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontFamily:
                                  "Inter, system-ui, -apple-system, sans-serif",
                                color: "#0f172a",
                              }}
                            >
                              Completed
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
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
            </Stack>
            <Stack spacing={3} sx={{ flex: 1 }}>
              <Box>
                <Typography sx={labelSx}>Owner Name</Typography>
                <TextField
                  disabled
                  sx={fieldSx}
                  value={currentProject?.ownerId?.name}
                  fullWidth
                />
              </Box>
              <Box>
                <Typography sx={labelSx}>Owner Email</Typography>
                <TextField
                  disabled
                  sx={fieldSx}
                  value={currentProject?.ownerId?.email}
                  fullWidth
                />
              </Box>
              <Box>
                <Typography sx={labelSx}>Description</Typography>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Add details about this project..."
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
                          fontSize: "14px",
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
            </Stack>
          </Stack>
          <Button
            type="submit"
            disableElevation
            variant="contained"
            sx={{ ...primaryBtnSx, mt: 1, float: "right" }}
          >
            Update Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
