import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AdminDrawer from "../components/AdminDrawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

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

function Users(props) {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "UserData");
        setUserData(data); // Store the user data in state
      });
  }, []);
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }} style={{ marginTop: "66px" }}>
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
              display: "flex",
            }}
          >
            <AdminDrawer />
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
                  <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                    Users
                  </h1>
                  <div
                    className="pdf-wrapper"
                    style={{ textAlign: "center", marginTop: "50px" }}
                  >
                    <table class="table align-middle mb-0 bg-white table-hover">
                      <thead class="bg-light">
                        <tr class="table-info">
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>User Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.map((user, index) => (
                          <tr class="table-Secondary" key={index}>
                            <td>
                            <p class="fw-normal mb-1">{user.fname}</p>
                            </td>
                            <td>
                              <p class="fw-normal mb-1">{user.lname}</p>
                            </td>
                              <td>
                                <p class="fw-normal mb-1 ">{user.email}</p>
                              </td>
                            <td>
                            <p class="fw-normal mb-1"> {user.userType}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
      <Copyright sx={{ pt: 4 }} />
    </>
  );
}

export default Users;
