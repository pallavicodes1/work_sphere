import { Children, useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Avatar from "@mui/material/Avatar";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CustomAutoComplete from "./CustomAutoComplete";
import { useSnackbar } from "notistack";
import useAuth from "../../auth";

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

const MembersDialog = ({ open, onClose, member, setMembers }) => {
  const [selectedmember, setSelectedmember] = useState(null);
  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useAuth();
  const FormSchema = Yup.object().shape({
    userId: Yup.string().required("This field is Required"),
    role: Yup.string(),
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
      userId: "",
      role: !member ? "viewer" : member.role,
    },
  });

  const addMember = async (data) => {
    console.log(data);
    try {
      const result = await request.post(`/project/${projectId}/member`, {
        ...data,
      
      });
      if (result.status === 200) {
        setMembers((prev) => [...prev, result?.data?.data]);
        enqueueSnackbar(result?.data?.message, {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
      console.log(error);
    }
  };

  const editMember = async (data) => {
    console.log(data);
    try {
      const result = await request.patch(`/member/${member._id}`,{ role:data.role});
      if(result.status===200){
        setMembers(prev=>prev.map((m)=>{
          if(m._id===member._id) return result.data.data
          else return m;
        }))
         enqueueSnackbar(result?.data.message,{
        variant:"success"
      })
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message,{
        variant:"error"
      })
    }
  };

  const onSubmit = async (data) => {
    if (member) await editMember(data);
    else await addMember(data);
    handleClose();
  };
  useEffect(() => {
    
    if (member) {
      reset({
        userId: member._id,
        role: member.role,
      });
    }
  }, [member, reset]);
 
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      if (!member) {
        reset({
          userId: "",
          role: "viewer",
        });
      }

      clearErrors();
    }, 300);
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "500px",
        },
      }}
    >
      <DialogTitle>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "22px",
              color: "#0f172a",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            {!member ? "Add New Member" : "Change Role"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.25}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.25}>
              {!member && (
                <Box>
                  <Typography sx={labelSx}>Member</Typography>
                  <CustomAutoComplete
                    member={member}
                    onMemberSelect={(member) => {
                      setSelectedmember(member);
                    }}
                    control={control}
                  />
                </Box>
              )}

              <Box>
                <Controller
                  name="role"
                  control={control}
                  defaultValue={"viewer"}
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
                        Role
                      </FormLabel>

                      <RadioGroup
                        row
                        sx={{ ml: 1 }}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <FormControlLabel
                          value="viewer"
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
                              Viewer
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="member"
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
                              Member
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                disableElevation
                variant="contained"
                sx={{ ...primaryBtnSx, mt: 1 }}
              >
                Add Member
              </Button>
            </Stack>
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MembersDialog;
