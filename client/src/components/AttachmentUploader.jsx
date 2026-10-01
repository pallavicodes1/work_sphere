import  { useRef, useState, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Avatar,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import AddIcon from "@mui/icons-material/Add"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../auth";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB


const API_BASE_URL = "http://localhost:8000";

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return fileUrl;
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://"))
    return fileUrl;
  return `${API_BASE_URL}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
};


const { request } = useAuth();

const uploadAttachment = async(projectId, file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await request.post(
    `/project/${projectId}/attachments`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    },
  );

  return response.data;
};


const fetchAttachments = async (projectId) => {
  const response = await request.get(`/project/${projectId}/attachments`);
  return response.data;
};


const deleteAttachment = async (attachmentId) => {
  console.log(attachmentId);
  await request.delete(`/attachment/${attachmentId}`);
};


const downloadFile = async (attachmentId, fileName) => {
  try {
    const response = await request.get(`/attachment/${attachmentId}/download`, {
      responseType: "blob",
    });
    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName || "attachment";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    // Log the real cause (CORS error, 404, network error, etc.) so it's
    // visible in devtools instead of failing silently.
    console.error("Download failed for", resolvedUrl, err);
    throw err;
  }
};

/** Picks an icon based on mimetype, so non-image files still look right. */
const getFileIcon = (fileType = "") => {
  if (fileType.startsWith("image/"))
    return <ImageOutlinedIcon fontSize="small" />;
  if (fileType === "application/pdf")
    return <PictureAsPdfOutlinedIcon fontSize="small" />;
  if (fileType.includes("spreadsheet") || fileType.includes("excel"))
    return <TableChartOutlinedIcon fontSize="small" />;
  if (fileType.includes("presentation") || fileType.includes("powerpoint"))
    return <SlideshowOutlinedIcon fontSize="small" />;
  if (fileType.includes("word") || fileType.includes("document"))
    return <DescriptionOutlinedIcon fontSize="small" />;
  return <InsertDriveFileOutlinedIcon fontSize="small" />;
};

const formatFileSize = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function AttachmentUploader({ onUploaded }) {
  const fileInputRef = useRef(null);
  const [uploads, setUploads] = useState([]); 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [previewItem, setPreviewItem] = useState(null); 
  const [downloadError, setDownloadError] = useState(null);
  const [search,setSearch]=useState(null);

  const hasItems = items.length > 0;

  const { projectId } = useParams();

 
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await fetchAttachments(projectId);
        if (isMounted) setItems(data);
      } catch (err) {
        console.error("Failed to load attachments for project", projectId, err);
        if (isMounted) setLoadError("Could not load attachments");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (projectId) load();
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const filteredUploads=useMemo(()=>{
    var list=items
      const value = search?.trim().toLowerCase();
      console.log(value)
    if (value) list = list?.filter((file) => file.originalName.toLowerCase().includes(value));
    console.log('list',list)
    return list;
  },[items,search])



  useEffect(()=>{
    console.log(items,filteredUploads)
  })
    // const filteredUploads=use

  const handleDelete = async (attachmentId) => {
    console.log(attachmentId);
    setDeletingId(attachmentId);
    try {
      await deleteAttachment(attachmentId);
      setItems((prev) => prev.filter((item) => item._id !== attachmentId));
    } catch (err) {
      console.error("Failed to delete attachment", attachmentId, err);
      setLoadError("Could not delete attachment");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (item) => {
    setDownloadError(null);
    try {
      await downloadFile(item._id, item.originalName || item.fileName);
    } catch (err) {
      setDownloadError(
        `Could not download "${item.originalName || item.fileName}"`,
      );
    }
  };

  const handleFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (files.length === 0) return;

      files.forEach((file) => {
        const uploadId = `${file.name}-${Date.now()}-${Math.random()}`;

        if (file.size > MAX_FILE_SIZE) {
          // setUploads((prev) => [
          //   ...prev,
          //   {
          //     id: uploadId,
          //     name: file.name,
          //     progress: 0,
          //     status: 'error',
          //     error: 'File exceeds 10MB limit',
          //   },
          // ]);
          return;
        }

        // setUploads((prev) => [
        //   ...prev,
        //   { id: uploadId, name: file.name, progress: 0, status: 'uploading', error: null },
        // ]);

        uploadAttachment(projectId, file, (progress) => {
          // setUploads((prev) =>
          //   prev.map((u) => (u.id === uploadId ? { ...u, progress } : u))
          // );
        })
          .then((attachment) => {
            // setUploads((prev) =>
            //   prev.map((u) =>
            //     u.id === uploadId ? { ...u, progress: 100, status: 'done' } : u
            //   )
            // );
            setItems((prev) => [...prev, attachment]);
            onUploaded?.(attachment);
          })
          .catch((err) => {
            // setUploads((prev) =>
            //   prev.map((u) =>
            //     u.id === uploadId
            //       ? {
            //           ...u,
            //           status: 'error',
            //           error: err.response?.data?.message || 'Upload failed',
            //         }
            //       : u
            //   )
            // );
          });
      });
    },
    [projectId, onUploaded],
  );

  const openFileDialog = () => fileInputRef.current?.click();

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = ""; // allow re-selecting the same file
  };

  const handleDrop = (e) => {
    e.preventDefault();
  
    handleFiles(e.dataTransfer.files);
  };

  const handlePaste = (e) => {
    const pastedFiles = Array.from(e.clipboardData?.files || []);
    if (pastedFiles.length) handleFiles(pastedFiles);
  };

  const dismissUpload = (id) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={openFileDialog}
           startIcon={<AddIcon />}
          sx={{
            bgcolor: "#0f172a",
            color: "#fff",
            borderRadius: "10px",
            py: 1,
            px: 2,
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "1px",
            textTransform: "none",
            "&:hover": { bgcolor: "#1e293b" },
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Upload
        </Button>
        {uploads.length!==0 &&    <TextField
          placeholder="Search files by name"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            maxWidth: 420,
            minWidth: 320,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#fff",
              "& fieldset": { borderColor: "#e5e7eb" },
              fontSize: "14px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94a3b8", fontSize: "16px" }} />
                </InputAdornment>
              ),
            },
          }}
        />}
      
      </Stack>
      <Box
        sx={{
          textAlign: "center",
          transition: "border-color 0.15s ease, background-color 0.15s ease",
        }}
        onDragOver={(e) => {
          e.preventDefault();
       
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onPaste={handlePaste}
      >
        {/* Hidden native file input, opened directly by the Upload button */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleInputChange}
        />

        {!loading && !hasItems && uploads.length === 0 && (
          <>
          <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", minHeight:"26vw"}}>
             <InsertDriveFileOutlinedIcon
              sx={{ fontSize: 56, color: "action.disabled", mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 ,  fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif"}}>
              No attachments yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 ,  fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",}}>
              Get started by adding or creating a file using the options below.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif", }}>
              You can also{" "}
              <Box
                component="span"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                drag and drop
              </Box>{" "}
              or{" "}
              <Box
                component="span"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                paste
              </Box>{" "}
              files directly here.
            </Typography>
          </Box>
           
          </>
        )}

        {/* Loading state while fetching existing attachments */}
        {/* {loading && (
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <CircularProgress size={22} />
        </Stack>
      )}

      {loadError && (
        <Alert severity="error" sx={{ mt: 2, maxWidth: 480, mx: 'auto', textAlign: 'left' }}>
          {loadError}
        </Alert>
      )} */}

        {/* List of existing + newly uploaded attachments, pulled from the DB */}
        {!loading && hasItems && (
          <Stack spacing={2} sx={{ mt: 3, textAlign: "left", maxWidth: 680 }}>
            {filteredUploads?.map((item) => {
              const isImage = item.fileType?.startsWith("image/");
              return (
                <Stack
                  key={item._id || item.fileUrl}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {/* Thumbnail for images, icon for everything else */}
                  {isImage ? (
                    <Avatar
                      variant="rounded"
                      src={resolveFileUrl(item.fileUrl)}
                      alt={item.originalName}
                      sx={{ width: 36, height: 36 }}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{ width: 36, height: 36, bgcolor: "action.hover" }}
                    >
                      {getFileIcon(item.fileType)}
                    </Avatar>
                  )}

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body2" noWrap>
                      {item.originalName || item.fileName}
                    </Typography>
                    {item.fileSize != null && (
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(item.fileSize)}
                      </Typography>
                    )}
                  </Box>

                  <Stack direction={"row"} sx={{ alignItems: "center" }}>
                    {item.fileUrl && (
                      <Tooltip title="View">
                        <IconButton
                          size="small"
                          onClick={() => setPreviewItem(item)}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {item.fileUrl && (
                      <Tooltip title="Download">
                        <IconButton
                          size="small"
                          onClick={() => handleDownload(item)}
                        >
                          <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Delete">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                        >
                          {deletingId === item._id ? (
                            <CircularProgress size={16} />
                          ) : (
                            <DeleteOutlineIcon fontSize="small" />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        )}
        {downloadError && (
          <Alert
            severity="error"
            sx={{ mt: 2, maxWidth: 480, mx: "auto", textAlign: "left" }}
            onClose={() => setDownloadError(null)}
          >
            {downloadError}
          </Alert>
        )}
      </Box>

      {/* View dialog: renders a different preview depending on file type */}
      <Dialog
        open={Boolean(previewItem)}
        onClose={() => setPreviewItem(null)}
        maxWidth="md"
        fullWidth
      >
        {previewItem && (
          <>
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {previewItem.originalName || previewItem.fileName}
              </Box>
              <IconButton size="small" onClick={() => setPreviewItem(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>

            <DialogContent
              dividers
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
                bgcolor: "#fafafa",
              }}
            >
              {(() => {
                const resolvedPreviewUrl = resolveFileUrl(previewItem.fileUrl);
                return (
                  <>
                    {previewItem.fileType?.startsWith("image/") && (
                      <Box
                        component="img"
                        src={resolvedPreviewUrl}
                        alt={previewItem.originalName}
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "70vh",
                          objectFit: "contain",
                        }}
                      />
                    )}

                    {previewItem.fileType === "application/pdf" && (
                      <Box
                        component="iframe"
                        src={resolvedPreviewUrl}
                        title={previewItem.originalName}
                        sx={{ width: "100%", height: "70vh", border: "none" }}
                      />
                    )}

                    {previewItem.fileType?.startsWith("video/") && (
                      <Box
                        component="video"
                        src={resolvedPreviewUrl}
                        controls
                        sx={{ maxWidth: "100%", maxHeight: "70vh" }}
                      />
                    )}

                    {previewItem.fileType?.startsWith("audio/") && (
                      <Box
                        component="audio"
                        src={resolvedPreviewUrl}
                        controls
                        sx={{ width: "100%" }}
                      />
                    )}

                    {previewItem.fileType?.startsWith("text/") && (
                      <Box
                        component="iframe"
                        src={resolvedPreviewUrl}
                        title={previewItem.originalName}
                        sx={{
                          width: "100%",
                          height: "70vh",
                          border: "none",
                          bgcolor: "white",
                        }}
                      />
                    )}
                  </>
                );
              })()}

              {/* Fallback for types with no inline preview (Word, Excel, zip, etc.) */}
              {previewItem.fileType &&
                !previewItem.fileType.startsWith("image/") &&
                previewItem.fileType !== "application/pdf" &&
                !previewItem.fileType.startsWith("video/") &&
                !previewItem.fileType.startsWith("audio/") &&
                !previewItem.fileType.startsWith("text/") && (
                  <Stack alignItems="center" spacing={1.5}>
                    <Avatar
                      variant="rounded"
                      sx={{ width: 56, height: 56, bgcolor: "action.hover" }}
                    >
                      {getFileIcon(previewItem.fileType)}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      No preview available for this file type.
                    </Typography>
                  </Stack>
                )}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => setPreviewItem(null)}
                sx={{ textTransform: "none" }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
