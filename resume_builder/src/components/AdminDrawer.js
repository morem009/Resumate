import React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from "react-router-dom";

const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function AdminDrawer() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }} style={{zIndex:"1"}}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
        <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/admindashboard" style={{ color: 'inherit', textDecoration: 'inherit' }}>
        Dashboard
        </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link to="/admindashboard/addtemplates" style={{ color: 'inherit', textDecoration: 'inherit' }}>
      Add Templates
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/admindashboard/Users" style={{ color: 'inherit', textDecoration: 'inherit' }}>
      Users
      </Link>
    </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
  )
}

export default AdminDrawer
