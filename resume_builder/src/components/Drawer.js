import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
 makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "#33236d",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent(props) {
const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./SignIn";
  };
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        
      >
        <List >
         <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText >
              <Link to="/" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/about" className={classes.link}>About</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/contact" className={classes.link}>Contact</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
            {props.isLoggedIn ?(
              <Link to="/SignIn" onClick={logOut} className={classes.link}>Sign-Out</Link>
            ):
            <Link to="/SignIn" className={classes.link}>Sign-In</Link>
            }
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;