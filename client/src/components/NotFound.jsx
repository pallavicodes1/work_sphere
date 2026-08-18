import React from 'react'
import { Box, Typography, Button} from "@mui/material";
import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <Box sx={{
        display:"flex",
        height:"100vh",
        justifyContent:"center",
        alignItems:"center",
        border:"1px solid black",
        flexDirection:"column",
        gap:1,
        boxSizing:"border-box",
        
    }}>
     <Typography>Page Not Found</Typography>
     <Link to="/">Go Back To Home Page</Link>
    </Box>
  )
}

export default NotFound
