import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
       // eslint-disable-next-line no-unused-vars
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data, "userRegister");
          if (data.status === "Login Successful") {
            props.showAlert("Login Successful","success")
            // alert("Login Successful");
            window.localStorage.setItem("token", data.data);
            props.togglelogin()
            // window.localStorage.setItem("loggedIn", true);
            navigate("/userdetails");
          } else {
            alert("Incorrect password");
          }
        });
  };
   // eslint-disable-next-line no-unused-vars
  const validate = (email) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(email)) {
      errors.email = "Enter Valid Email Address";
    }
    return errors;
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://as1.ftcdn.net/v2/jpg/01/22/71/96/1000_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                error={formErrors.email ? true : false}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                helperText={formErrors.email}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                error={formErrors.password ? true : false}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                helperText={formErrors.password}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
