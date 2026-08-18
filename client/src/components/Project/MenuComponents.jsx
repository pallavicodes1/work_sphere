import React, { useEffect, useState } from "react";
import { Typography, Stack, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../AlertDialog"
export default React.memo(function MenuComponents({owner,projectId,setprojectAsOwner}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open,setOpen]=useState(false);
  const [deleted,setDeleted]=useState(false);
  const openMenu = Boolean(anchorEl);
    const navigate = useNavigate();


    console.log("menu component");
    const handleOpen = (event) => {

    setAnchorEl(event.currentTarget);

  
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleView = () => {

    navigate(`/app/projects/${projectId}`);
    handleClose();
  };

  useEffect(()=>{
    if(deleted){
          setprojectAsOwner(prev=>prev.filter((p)=>p._id!==projectId));
    }
  },[deleted])

   const handleDelete = () => {
    setOpen(true);
    handleClose();
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        transitionDuration={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <VisibilityOutlinedIcon sx={{ fontSize: 16, color: "error" }} />
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              View Project
            </Typography>
          </Stack>
        </MenuItem>

        {owner && (
          <MenuItem
            onClick={handleDelete}
            sx={{ color: "error.main", fontSize: "14px" }}
          >
            <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
              <DeleteOutlineIcon sx={{ fontSize: 16, color: "error" }} />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                }}
              >
                Delete Project
              </Typography>
            </Stack>
          </MenuItem>
        )}
      </Menu>
      <AlertDialog 
        data={"project"}
        open={open}
        setOpen={setOpen}
        toDelete={projectId}
        setDeleted={setDeleted}
      />
    </>
  );
})

