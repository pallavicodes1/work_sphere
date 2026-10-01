import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Stack, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../../auth";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import TaskFormFields from "./TaskFormFields";

const primaryBtnSx = {
  bgcolor: "#0f172a",
  color: "#fff",
  borderRadius: "10px",
  py: 1.5,
  fontWeight: 600,
  fontSize: "13px",
  textTransform: "none",
  "&:hover": { bgcolor: "#1e293b" },
};

const AddPTask = ({ open, onClose, task, setTasks, members }) => {
  const isEdit = Boolean(task);
  const { projectId } = useParams();
  const project = useSelector((state) => state.currentProjectReducer.data);
  const { request } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const FormSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required").max(20, "Title should not be more than 20 characters"),
    priority: Yup.string().required("Priority is required"),
    date: Yup.date().nullable().required("Date is required"),
    description: Yup.string().trim().required("Description is required").min(20, "Description must be at least 30 characters long"),
    status: isEdit ? Yup.string().nullable() : Yup.string(),
    assignedTo: isEdit ? Yup.string().required("This field is required") : Yup.string().nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      priority: "low",
      date: null,
      description: "",
      assignedTo: null,
      status: "pending",
    },
  });

  const { handleSubmit, clearErrors, reset } = methods;

  const updateTaskfunc = async (dataToSend) => {
    try {
      const updatedTask = { _id: task._id, ...dataToSend };
      const result = await request.patch(`/task/${task?._id}`, updatedTask);
      if (result?.status === 200) {
        setTasks((prev) =>
          prev.map((t) => (t._id === result?.data?.updatedTask?._id ? result?.data?.updatedTask : t))
        );
        enqueueSnackbar(result?.data?.message, { variant: "success" });
      }
    } catch (error) {
      if (error.response) enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const addTaskfunc = async (data) => {
    try {
      const res = await request.post("/task", data);
      if (res?.status === 201) {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setTasks((prev) => [...prev, res?.data?.task]);
      }
      reset();
    } catch (error) {
      if (error.response) enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const onSubmit = async (dataToSend) => {
    console.log('mnsmnmnms')
    if (!isEdit) {
      await addTaskfunc({ ...dataToSend, project: projectId });
    } else {
      await updateTaskfunc({ ...dataToSend, project: projectId });
    }
    onClose();
  };

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        priority: task.priority,
        date: task.date ? new Date(task.date) : null,
        status: task?.status,
        description: task.description,
        assignedTo: task.assignedTo?._id || task.assignedTo || null,
      });
    } else {
      reset({
        title: "",
        priority: "low",
        date: null,
        description: "",
        assignedTo: null,
        status: "pending",
      });
    }
  }, [task, reset]);



  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ transition: { onExited: () => { clearErrors(); reset(); } } }}
      sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: "560px" } }}
    >
      <DialogTitle>
        <Stack spacing={0.5} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "24px", color: "#0f172a" }}>
            {isEdit ? "Edit Task" : "Add Task"}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#94a3b8" }}>
            {isEdit ? "Update your Task" : "Enter your details to add new task"}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.25}>
              <TaskFormFields
                isEdit={isEdit}
                members={members}
                maxDate={project?.endDate ? new Date(project.endDate) : undefined}
              />
              <Button type="submit" fullWidth disableElevation variant="contained" sx={{ ...primaryBtnSx, mt: 1 }}>
                {isEdit ? "Edit Task" : "Add Task"}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddPTask;