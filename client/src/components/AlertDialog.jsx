import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "../auth";
import { useDispatch } from "react-redux";
import { userLogout } from "../app/user/userSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { removeUserTask } from "../app/user/taskSlice";
import { removeOProjects } from "../app/user/projectSlice";
import { removeCurrentProject } from "../app/user/currentProjectSlice";

export default function AlertDialog({
  data,
  open,
  setOpen,
  setData,
  toDelete,
  setToDelete,
  setDeleted,
}) {
  const { request } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const deleteData = async () => {
    try {
      if (data === "task") {
        const data = await request.delete(`/task/${toDelete}`);
        if (data.status === 200) {
          enqueueSnackbar(data?.data?.message, {
            variant: "success",
          });
          setData((prev) => prev.filter((t) => t._id !== toDelete));
        }
        setToDelete(null);
      } else if (data === "project") {
        const res = await request.delete(`/project/${toDelete}`);
        if (res.status === 200) {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          setDeleted(true);
        }
      } else if (data === "member") {
        const result = await request.delete(`/member/${toDelete}`);
        if (result.status === 200) {
          enqueueSnackbar(result?.data?.message, {
            variant: "success",
          });
            setData((prev) => prev.filter((t) => t._id !== toDelete));
        }
      } else {
        const res = await request.delete(`/user/${toDelete}`);
        await request.post("/logout");
        dispatch(userLogout());
        dispatch(removeUserTask());
        dispatch(removeCurrentProject());
        dispatch(removeOProjects());
        enqueueSnackbar(res?.data?.message, {
          variant: "error",
        });

        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    }
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            color: "rgba(255, 0, 0, 0.85)",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          {data && `Delete ${data} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: "14px",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            Are you sure you want to delete ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                data === "task" && setToDelete(null);
              }
              handleClose();
            }}
            autoFocus
            sx={{ textTransform: "none", color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteData}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "hsl(0, 84%, 60%)",
              "&:hover": { backgroundColor: "hsl(0, 84%, 52%)" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
