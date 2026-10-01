import {
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Select,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

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

const labelSx = {
  fontSize: "13px",
  color: "#0f172a",
  mb: 0.75,
  fontFamily: "Inter, system-ui, -apple-syxstem, sans-serif",
};

// isEdit / members / maxDate are the only "external" inputs the fields need
export default function TaskFormFields({ isEdit, members = [], maxDate }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={2.25}>
      {/* Title */}
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

      {/* Date + Priority */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box>
          <Typography sx={labelSx}>Due Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  minDate={new Date()}
                  maxDate={maxDate}
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
            render={({ field }) => (
              <TextField
                {...field}
                select
                sx={fieldSx}
                size="small"
                fullWidth
                error={!!errors?.priority}
                helperText={errors?.priority?.message}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            )}
          />
        </Box>
      </Box>

      {/* Edit-only fields */}
      {isEdit && (
        <>
          <Box>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <FormLabel sx={{ fontSize: "13px", mb: 1, ml: 1, color: "#0f172a" }}>
                    Status
                  </FormLabel>
                  <RadioGroup row sx={{ ml: 1 }} value={field.value} onChange={field.onChange}>
                    <FormControlLabel value="pending" control={<Radio size="small" />} label="Pending" />
                    <FormControlLabel value="in-progress" control={<Radio size="small" />} label="In Progress" />
                    <FormControlLabel value="completed" control={<Radio size="small" />} label="Completed" />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Box>

          <Box>
            <FormControl fullWidth>
              <Typography sx={labelSx}>Assign To</Typography>
             
<Controller
  name="assignedTo"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      select
      fullWidth
      sx={fieldSx}
      error={!!errors.assignedTo}
      helperText={errors.assignedTo?.message}
      value={field.value || ""}
    >
      {members?.map((member) => (
        <MenuItem
          key={member.userId._id}
          value={member.userId._id}
        >
          {member.userId.name}
        </MenuItem>
      ))}
    </TextField>
  )}
/>

            </FormControl>
          </Box>
        </>
      )}

      {/* Description */}
      <Box>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Add details about this task..."
              fullWidth
              sx={fieldSx}
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
  );
}