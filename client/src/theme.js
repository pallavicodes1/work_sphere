import { createTheme } from "@mui/material";
const theme=createTheme({
    typography:{
        fontFamily:"Inter, system-ui, -apple-system, sans-serif",
      
    },
      button:{
        fontFamily:"Inter, system-ui, -apple-system, sans-serif",
      
    },
    components:{
        MuiDialogTitle:{
            styleOverrides:{
                root:{
                fontFamily:"Inter, system-ui, -apple-system, sans-serif",

                }
            }
        },
         MuiDialogContentText:{
            styleOverrides:{
                root:{
                fontFamily:"Inter, system-ui, -apple-system, sans-serif",

                }
            }
        }
    }
});

export default theme;