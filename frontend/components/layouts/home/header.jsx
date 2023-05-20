import * as React from 'react';
import axios from "axios";
import History from "../../../src/History";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RssfeedIcon from '@mui/icons-material/Rssfeed';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function ClippedDrawer() {

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCerrarSesion = () => {

    var url = window.$url_api + "/cuenta/salir";

    axios.post(url, {"token" : sessionStorage.getItem(window.$nombre_session)}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        sessionStorage.setItem(window.$nombre_session, "");
        sessionStorage.setItem(window.$id_usuario_session, "");
        sessionStorage.setItem(window.$usuario_session, "");
        History.push("/ingreso");      
        History.go();       
    }).catch(e => {
        console.log(e);
    });

  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Fenix Music 0.5
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
            <AccountCircleIcon /> 
            <ListItemText primary={sessionStorage.getItem(window.$usuario_session)} style={{paddingLeft: 5 }} sx={{ opacit: open ? 1 : 0 }}/>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleCerrarSesion}
              color="inherit"
            >
              <LogoutIcon />
              <ListItemText primary="Logout" style={{paddingLeft: 5 }} sx={{ opacit: open ? 1 : 0 }}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding sx={{display:"block"}} component={Link} href="/">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px:2.5
                }}
              >
              <ListItemIcon
                sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
              <MusicNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Songs" sx={{ opacit: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{display:"block"}} component={Link} href="/playlists">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px:2.5
                }}
              >
              <ListItemIcon
                sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
              <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText primary="Playlists" sx={{ opacit: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{display:"block"}} component={Link} href="/stations">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px:2.5
                }}
              >
              <ListItemIcon
                sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
              <RssfeedIcon />
                </ListItemIcon>
                <ListItemText primary="Stations" sx={{ opacit: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{display:"block"}} component={Link} href="/settings">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px:2.5
                }}
              >
              <ListItemIcon
                sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
              <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ opacit: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{display:"block"}} component={Link} href="/profile">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px:2.5
                }}
              >
              <ListItemIcon
                sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
              <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ opacit: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{display:"block"}} component={Link} href="/about">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px:2.5
                }}
              >
              <ListItemIcon
                sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
              <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" sx={{ opacit: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main">
        <Typography paragraph>
        </Typography>
      </Box>
      </ThemeProvider>
    </Box>
  );
}