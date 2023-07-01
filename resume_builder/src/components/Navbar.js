import React from "react";
import logo from '../resources/Resumate.png';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#33236d",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "#da5382",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const logOut = () => {
    props.showAlert("Logout Successful","success")
    props.togglelogin()
  };

  // console.log(props.isLoggedIn)
  
  return (
    <AppBar  position="fixed" style={{background: "#d3f2fb"}}>
      <CssBaseline />
      <Toolbar >
        <Typography variant="h4" className={classes.logo}>
        <a href="/"><img src={logo} alt="Logo"/></a>
        </Typography>
        {isMobile ? (
          <DrawerComponent isLoggedIn={props.isLoggedIn} />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
            {
            props.isLoggedIn ?(
              <Link to="/userdetails"  className={classes.link}>
              Dashboard
               </Link>
            ):
            (
              <div />
            )
          }
            {
            props.isLoggedIn ?(
                <Link to="/SignIn" onClick={logOut} className={classes.link}>
              SignOut
               </Link>
            ):
            <Link to="/SignIn" className={classes.link}>
             Sign-In
            </Link>
          }
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;