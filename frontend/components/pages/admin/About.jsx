import React, {useState,Component} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';

import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
 
const Profile = () => {
     
    return ( 
        <div>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header />
            <div className="profile">
              <form autoComplete="off">
                <Card sx={{ minWidth: 275 }}>
                    <Typography align="center" variant="h3" component="div" style={{ marginTop: "10px" }}>
                        About
                    </Typography>
                  <CardContent>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                        Program : Fenix Music
                    </Typography>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                        Version : 1.0
                    </Typography>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                        Description : MP3 Player and streaming radio
                    </Typography>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                        Author : Ismael Heredia
                    </Typography>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                        Credits : Component audio-player made by madzadev
                    </Typography>
                  </CardContent>
                </Card>
              </form>
            </div>
          <Footer />
          </ThemeProvider>
        </div>
     );
}
 
export default Profile;