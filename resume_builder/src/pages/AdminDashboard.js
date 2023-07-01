import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";  
import AdminDrawer from "../components/AdminDrawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { autocompleteClasses } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const mystyle = {
  "marginLeft": "30px",
  "fontSize": "15px",
  "marginTop": "10px",

};

function Copyright(props) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Resumate
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const mdTheme = createTheme();
const AdminDashboard = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/templates/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((pdfs) => setPdfs(pdfs));
  }, []);

  return (
    <>
     <ThemeProvider theme={mdTheme}>
    <Box   sx={{ display: "flex" }} style={{marginTop: "66px"}}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
          padding: "0px",
          height: "100%",
          display: "flex"
        }}
      >
          <AdminDrawer  />
          <Grid container spacing={2}>
            {/* Template Preview */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                  padding: "2rem", // added padding to increase white background length
                  height: "100%",
                }}
              >
                <h1 style={{ textAlign: "center", marginTop: "50px"}}>Templates</h1>
                {pdfs.length > 0 ? (
                  <ul
                    style={{
                      padding: "1px",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {pdfs.map((pdf) => (
                       <div className="pdf-wrapper" style={mystyle}>
                      <li key={pdf._id} type="1" style={mystyle}>
                          <h2 style={mystyle} >{pdf.name.split(".")[0]}</h2>
                          <Document
                            file={{ data: new Uint8Array(pdf.data.data) }}
                          >
                            <Page 
                             pageNumber={1}
                              width={350}
                              height= {autocompleteClasses}
                              renderMode="canvas"
                              style={{
                                display: "flex",
                              }}
                            ></Page>
                          </Document>
                      </li>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p>No Templates available</p>
                )}
              </Paper>
            </Grid>
          </Grid>
      </Box>
    </Box>
  </ThemeProvider>
  <Copyright sx={{ pt: 4 }} />
    </>
  );
};

export default AdminDashboard;
