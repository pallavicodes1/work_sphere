import React, { useState, useEffect, useCallback } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import useAuth from "../../auth";
import { Controller } from "react-hook-form";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&:hover fieldset": { borderColor: "rgba(15,23,42,0.24)" },
    "&.Mui-focused fieldset": { borderColor: "#0f172a", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "13px",
    color: "#0f172a",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  "& .MuiOutlinedInput-input::placeholder": { color: "#94a3b8", opacity: 1 },
};

// Simple debounce helper to limit API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function CustomAutoComplete({
  onMemberSelect,
  register,
  control,
  errors,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const { request } = useAuth();
  useEffect(() => {
    let active = true;
    if (debouncedSearchTerm.length < 2) {
      setOptions([]);
      return undefined;
    }
    setLoading(true);
    request
      .get(`/user/?input=${debouncedSearchTerm}`)
      .then((response) => {
        if (active) {
          setOptions(response?.data?.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [debouncedSearchTerm]);

  // Clear options when dropdown closes
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Controller
      name="userId"
      control={control}
      render={({ field :{onChange,value,ref}, fieldState:{error}}) => (
        <Autocomplete
          sx={fieldSx}
          id="remote-member-search"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(option) => `${option.name} (${option.email})`}
          options={options}
          loading={loading}
          onChange={(event, newValue) => {
            onChange(newValue?._id)
          }}
          // Track the user typing state
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search members by name or email"
              variant="outlined"
              inputRef={ref}
              error={!!error}
              helperText={error ? error?.message : ""}
              inputprops={{
                ...params.inputprops,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.inputprops?.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
