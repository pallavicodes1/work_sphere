import { useEffect } from "react";
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
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import useAuth from "../../auth";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../app/user/taskSlice";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(15,23,42,0.24)" },
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
  py: 1.5,
  fontWeight: 600,
  letterSpacing: "1px",
  fontSize: "13px",
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

const AddPTask = ({ open, onClose, task, setTasks}) => {
  const isEdit = Boolean(task);
  const { projectId } = useParams();
  const project = useSelector((state) => state.currentProjectReducer.data);
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is Required")
      .max(20, "Title should not be more than 20 characters"),
    priority: Yup.string().required("Priority is required"),
    date: Yup.date().nullable().required("Date is required"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .min(20, "Description must be al least 30 characters long"),
    status: isEdit ? Yup.string().nullable() : Yup.string(),
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
      date: null,
      description: "",
    },
  });
  const { request } = useAuth();
  const dispatch = useDispatch();
  const updateTaskfunc = async (dataToSend) => {
    try {
      const updatedTask = {
        _id: task._id,
        ...dataToSend,
      };
      const result = await request.patch(
        `/task/update/${task?._id}`,
        updatedTask,
      );
      if (result?.status === 200) {
        setTasks((prev) =>
          prev.map((t) => {
            if (t._id === result?.data?.updatedTask?._id)
              return (t = result?.data?.updatedTask);
            else return t;
          }),
        );
        
        enqueueSnackbar(result?.data?.message, {
          variant: "success",
        });
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      }
    }
  };
  const { enqueueSnackbar } = useSnackbar();
  const addTaskfunc = async (data) => {
    try {
      const res = await request.post("/task", data);
      if (res?.status === 201) {
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
        });
        let data = res?.data?.task;
        setTasks((prev) => [...prev, data]);
      }
      reset({
        title: "",
        priority: "low",
        date: null,
        description: "",
      });
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      }
    }
  };

  const onSubmit = async (dataToSend) => {
    if (!isEdit) {
      await addTaskfunc({ ...dataToSend, project: projectId });
    } else {
      await updateTaskfunc({ ...dataToSend, project: projectId });
    }
    setOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        priority: task.priority,
        date: task.date ? new Date(task.date) : null,
        status: task?.status,
        description: task.description,
      });
    } else {
      reset({
        title: "",
        priority: "low",
        date: null,
        description: "",
      });
    }
  }, [task, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        transition: {
          onExited: () => {
            clearErrors();
            reset();
          },
        },
      }}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "560px",
        },
      }}
    >
      <DialogTitle>
        <Stack spacing={0.5} sx={{ textAlign: "center" }}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              color: "#0f172a",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            {isEdit ? "Edit Task" : "Add Task"}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#94a3b8",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            {isEdit ? "Update your Task" : "Enter your details to add new task"}
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
                <Box>
                  <Typography sx={labelSx}>Due Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          minDate={new Date()}
                          maxDate={new Date(project?.endDate)}
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
                              error: !!errors.date,
                              helperText: errors?.date?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ flex: 1 }}>
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
                            "& fieldset": {
                              borderColor: "rgba(15,23,42,0.24)",
                            },
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
              </Box>
              {isEdit && (
                <Box>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={task?.status || "pending"}
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
              )}
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
                {isEdit ? "Edit Task" : "Add Task"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPTask;
