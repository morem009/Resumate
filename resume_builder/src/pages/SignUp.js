import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from '@mui/material/FormLabel';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUp() {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [formErrors] = useState({});
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();


  const handleSubmit =  (event) => {
    if (userType === "Admin" && secretKey !== "Mandy") {
      event.preventDefault();
      alert("Invalid Admin");
    } else {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
      const response =  fetch("http://localhost:8080/signup", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
          userType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
            navigate("/SignIn");
          } else {
            alert("User Exist");
          }
        });
      // const result = await  response.json();
      // console.log(result);
    }
  };
   // eslint-disable-next-line no-unused-vars
  const validate = (email) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!regex.test(email)){
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
              "url(https://as2.ftcdn.net/v2/jpg/01/18/61/65/1000_F_118616519_k7bfYYxDnEeem4oIgIGttiCi46xIfIbG.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* <pre> {JSON.stringify(formValues,undefined,2)}</pre> */}
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
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <FormLabel id="demo-radio-buttons-group-label">Register As: </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="User"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  name="UserType"
                  value={"User"}
                  onChange={(e) => setUserType(e.target.value)}
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  name="UserType"
                  value="Admin"
                  onChange={(e) => setUserType(e.target.value)}
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fname"  
                    required
                    error= {formErrors.fname ? true : false}
                    fullWidth
                    id="fname"
                    label="First Name"
                    onChange={e => setfname(e.target.value)}
                    value={fname}
                    helperText= {formErrors.fname}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    error= {formErrors.lname ? true : false}
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    onChange={e => setlname(e.target.value)}
                    value={lname}
                    helperText= {formErrors.lname}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    error= {formErrors.email ? true : false}
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    helperText= {formErrors.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    error= {formErrors.password ? true : false}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    helperText= {formErrors.password}
                    autoComplete="new-password"
                  />
                </Grid>
                {userType === "Admin" ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    error= {formErrors.password ? true : false}
                    fullWidth
                    name="Secret Key"
                    label="Secret Key"
                    type="password"
                    id="secretkey"
                    onChange={(e) => setSecretKey(e.target.value)}
                    value={secretKey}
                    // helperText= {formErrors.password}
                  />
                </Grid>
                ): null}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
