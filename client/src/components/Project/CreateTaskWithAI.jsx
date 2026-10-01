import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesome";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import TaskFormFields from "d:/workSphere/client/src/components/Project/TaskFormFields";
import useAuth from "../../auth";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const INK = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const SURFACE = "#f8f7ff";
const ACCENT_FROM = "#7c5cff";
const ACCENT_TO = "#6d4bff";

const EXAMPLE_PROMPTS = [
  "Schedule a meeting with the design team tomorrow at 11 AM",
  "Remind me to submit the project report by next Monday",
  "Create a task to call the client and discuss the proposal",
];

const MAX_LENGTH = 500;

/**
 * CreateTaskWithAI
 *
 * A modal that lets a user describe a task in plain English and have it
 * parsed into a structured task (title, due date, priority, etc).
 *
 * Props:
 * - open: boolean — controls dialog visibility
 * - onClose: () => void — called when the user dismisses the modal
 * - onParse: (description: string) => void | Promise<void>
 *      Called when the user submits text to be parsed. Wire this up to
 *      your NLP/LLM parsing endpoint, then create the task from the result.
 * - loading: boolean — optional, shows a busy state on the submit button
 */

const FormSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required").max(30),
  priority: Yup.string().required("Priority is required"),
  date: Yup.date().nullable().required("Date is required"),
  description: Yup.string().trim().required("Description is required").min(20),
});

export default function CreateTaskWithAI({ open, onClose,setTasks, }) {
  const [description, setDescription] = useState("");
  const [parsed, setParsed] = useState(null);
  const [parsing, setParsing] = useState(false);

  const { request } = useAuth();
  const {projectId}=useParams();
    const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) setDescription(value);
  };

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: { title: "", priority: "low", date: null, description: "" },
  });

  const { handleSubmit, reset } = methods;

  const handleExampleClick = (prompt) => {
    setDescription(prompt);
  };

  const handleParse = async () => {
    if (!description.trim()) return;

    try {
      setParsing(true);
      const res = await request.post("/task/parse", { text: description });
      const result = res?.data?.parsed;
      console.log(result);
      reset({
        title: result.title || "",
        priority: result.priority || "low",
        date: result.date ? new Date(result.date) : null,
        description: result.description || "",
      });
      setParsed(true);
    } catch (err) {
      // setError("Couldn't parse that — try rephrasing or fill in manually.");
      // Fallback: let the user still create a task from raw text
      // setParsed({ title: input, assignee: null, dueDate: null, priority: null, tags: [] });
      // setRawInput(input);
    } finally {
      setParsing(false);
    }
  };

  const handleClose = () => {
    setDescription("");
    setParsed(false);
    reset({ title: "", priority: "low", date: null, description: "" });
    onClose();
  };

  const onSubmit = async (dataToSend) => {
    try {
      const res = await request.post("/task", { ...dataToSend, project: projectId });
      if (res?.status === 201) {
        console.log('skjbkjnnkjdcnj')
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setTasks((prev) => [...prev, res?.data?.task]);
      }

      console.log(dataToSend);
    } catch (error) {
      // if (error.response) enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          bgcolor: "#ffffff",
          p: 0,
          overflow: "visible",
          "& .MuiPaper-root": { width: "100%", maxWidth: "400px" },
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        {/* <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}> */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            color: INK,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            mb: 1,
          }}
        >
          Create Task with AI
        </Typography>
        {/* </Stack> */}

        {/* Input card */}

        {!parsed ? (
          <>
            <Box
              sx={{
                border: `1px solid ${BORDER}`,
                borderRadius: "14px",
                bgcolor: SURFACE,
                p: 2,
                mb: 3,
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="flex-start">
                <AutoAwesomeRoundedIcon
                  sx={{ fontSize: 20, color: ACCENT_TO, mt: 0.25 }}
                />
                <TextField
                  value={description}
                  onChange={handleChange}
                  placeholder="Describe your task in natural language..."
                  helperText='e.g. "Remind Sarah to review the contract by Friday and add it to the legal folder."'
                  multiline
                  minRows={3}
                  variant="standard"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: INK,
                      fontSize: 14,
                      "&::placeholder": { color: MUTED, opacity: 1 },
                    },
                    "& .MuiFormHelperText-root": {
                      color: MUTED,
                      fontSize: 12,
                      ml: 0,
                      mt: 1,
                    },
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: 12,
                  color: MUTED,
                  mt: 1,
                }}
              >
                {description.length}/{MAX_LENGTH}
              </Typography>
            </Box>

            {/* Example prompts */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 14,
                color: INK,
                mb: 1.25,
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              Example prompts:
            </Typography>

            <Stack spacing={1} sx={{ mb: 3 }}>
              {EXAMPLE_PROMPTS.map((prompt) => (
                <Box
                  key={prompt}
                  onClick={() => handleExampleClick(prompt)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    px: 1.5,
                    py: 1.1,
                    borderRadius: "10px",
                    bgcolor: SURFACE,
                    cursor: "pointer",
                    transition: "background-color 120ms ease",
                    "&:hover": { bgcolor: "#efeaff" },
                  }}
                >
                  <AutoAwesomeRoundedIcon
                    sx={{ fontSize: 16, color: ACCENT_TO, flexShrink: 0 }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: "#4c4a63",
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {prompt}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Submit */}
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button
                onClick={handleParse}
                disabled={!description.trim() || parsing}
                // endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  bgcolor: "#0f172a",
                  color: "#fff",
                  borderRadius: "10px",
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#1e293b" },
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  "&:hover": {
                    bgcolor: "#0f172a",
                  },
                  "&.Mui-disabled": {
                    background: "#d8d4f5",
                    color: "#fff",
                  },
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                {parsing ? "Parsing..." : "Parse with AI"}
              </Button>
            </Stack>
          </>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.25}>
                <TaskFormFields isEdit={false} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "#0f172a",
                    color: "#fff",
                    borderRadius: "10px",
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "1px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#1e293b" },
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Confirm & Add Task
                </Button>
              </Stack>
            </form>
          </FormProvider>
        )}
      </Box>
    </Dialog>
  );
}
