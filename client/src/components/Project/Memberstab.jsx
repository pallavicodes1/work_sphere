import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MembersDialog from "./MembersDialog";
import { useSelector } from "react-redux";
import useAuth from "../../auth";
import { useParams } from "react-router-dom";
import AlertDialog from "../AlertDialog";

export default function Memberstab({}) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentMember,setCurrentMember]=useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const { request } = useAuth();
  const { projectId } = useParams();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const project = useSelector((state) => state.currentProjectReducer.data);
  const user = useSelector((state) => state.userReducer?.user);
  const roleStyles = {
    owner: { bg: "#F3ECFF", text: "#6A3FEA" },
    member: { bg: "#EAF2FF", text: "#2563EB" },
    viewer: { bg: "#EAF9EF", text: "#16A34A" },
    // viewer:{bg: }
  };

  useEffect(() => {
    const getMembers = async () => {
      const result = await request.get(`/project/${projectId}/member`);
      setMembers(result.data.members);
    };
    getMembers();
  }, []);

  const handleEdit = (m) => {
    setCurrentMember(m);
    setOpen(true)
  };
  const handleDelete = (id) => {
    setOpenDelete(true);
    setMemberToDelete(id);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              color: "#64748b",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            }}
          >
            View and Manage Members
          </Typography>

          {project?.ownerId._id === user?._id && (
            <Button
              disableElevation
              variant="contained"
              onClick={() => {
                 setCurrentMember(null);
                setOpen(true);
              }}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#0f172a",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "1px",
                borderRadius: "10px",
                py: 1.2,
                "&:hover": { bgcolor: "#1e293b" },
                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
              }}
            >
              New Member
            </Button>
          )}
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Joined On
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((row, ind) => (
                <TableRow
                  key={ind}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack
                      direction={"row"}
                      sx={{ alignItems: "center" }}
                      spacing={1}
                    >
                      <Avatar sx={{ width: 34, height: 34 }} />{" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontFamily:
                            "Inter, system-ui, -apple-system, sans-serif",
                        }}
                      >
                        {row?.userId?.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {" "}
                    {row?.userId?.email}
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                        backgroundColor: roleStyles[row?.role]?.bg,
                        color: roleStyles[row?.role]?.text,
                        fontSize: "12px",
                        textTransform: "capitalize",
                        display: "inline",
                        p: 1,
                        borderRadius: 1,
                        fontWeight: 600,
                      }}
                    >
                      {row?.role}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {formatDate(row?.joinedDate)}
                  </TableCell>
                  <TableCell align="left">
                    {row.role !== "owner" ? (
                      <>
                        <Tooltip title="Edit Role">
                          <IconButton
                            size="small"
                            sx={{ color: "rgb(62, 62, 151)" }}
                            onClick={() => {
                              handleEdit(row);
                            }}
                          >
                            <EditOutlined fontSize="16px" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove Member">
                          <IconButton
                            size="small"
                            sx={{ color: "error.main" }}
                            onClick={() => {
                              handleDelete(row?._id);
                            }}
                          >
                            <DeleteOutlineOutlined fontSize="16px" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ): '- -'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <MembersDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        member={currentMember}
        setMembers={setMembers}
      />
      <AlertDialog
        data={"member"}
        open={openDelete}
        setOpen={setOpenDelete}
        setData={setMembers}
        toDelete={memberToDelete}
        setDeleted={setMemberToDelete}
      />
    </>
  );
}
