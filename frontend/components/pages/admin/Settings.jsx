import React, {useState,Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import History from "../../../src/History";

import { TextField, FormControl, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import Typography from '@mui/material/Typography';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
 
const Settings = () => {

    const [directory, setDirectory] = useState("")
    const [fullPath, setFullPath] = useState("")

    const [directoryError, setDirectoryError] = useState(false)
    const [fullPathError, setFullPathError] = useState(false)

    const [message_dialog, setMessageDialog] = useState("")
    const [message_dialog_type, setMessageTypeDialog] = useState("")
    const [openDialog, setOpenDialog] = React.useState(false)
 
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenDialog(false);
    };

    const HandleScan = (event) => {

      var url = window.$url_api + "/configuracion/buscarCanciones";

      axios.post(url, {"directory" : directory }, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data.data);   
          if(res.data.data.token != null) {
            var token = res.data.data.token; 
            sessionStorage.setItem(window.$nombre_session, token);
            History.push("/");      
            History.go();
          } else {
            setMessageDialog("Song search finished successfully");
            setMessageTypeDialog("success");
            setOpenDialog(true);
          }     
      }).catch(e => {
          console.log(e);
          setMessageDialog("An error occurred while searching for songs");
          setMessageTypeDialog("danger");
          setOpenDialog(true);
      });
      
    }

    const HandleRestartDatabase = (event) => {

      var url = window.$url_api + "/configuracion/reiniciarBD";

      axios.post(url, {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data.data);   
          if(res.data.data.token != null) {
            var token = res.data.data.token; 
            sessionStorage.setItem(window.$nombre_session, token);
            History.push("/");      
            History.go();
          } else {
            setMessageDialog("The database restarted successfully");
            setMessageTypeDialog("success");
            setOpenDialog(true);
          }     
      }).catch(e => {
          console.log(e);
          setMessageDialog("An error occurred restarting the database");
          setMessageTypeDialog("danger");
          setOpenDialog(true);
      });
      
    }

    const HandleImportStations = (event) => {

      var url = window.$url_api + "/configuracion/importarEstaciones";

      axios.post(url, {"filename" : fullPath}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data.data);   
          if(res.data.data.token != null) {
            var token = res.data.data.token; 
            sessionStorage.setItem(window.$nombre_session, token);
            History.push("/");      
            History.go();
          } else {
            setMessageDialog("The radio streams were imported correctly");
            setMessageTypeDialog("success");
            setOpenDialog(true);
          }     
      }).catch(e => {
          console.log(e);
          setMessageDialog("An error occurred importing the radio streams");
          setMessageTypeDialog("danger");
          setOpenDialog(true);
      });
      
    }
     
    return ( 
        <div>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header />
            <div className="settings-1">
              <form autoComplete="off">
                <Card sx={{ minWidth: 275 }}>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                    Scan songs
                    </Typography>
                  <CardContent>
                    <TextField 
                              label="Enter directory"
                              onChange={e => setDirectory(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="text"
                              sx={{mb: 3}}
                              fullWidth
                              value={directory}
                              error={directoryError}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { HandleScan() }}>Scan</Button>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { HandleRestartDatabase() }}>Restart database</Button>
                  </CardActions>
                </Card>
              </form>
            </div>

            <div className="settings-2">
              <form autoComplete="off">
                <Card sx={{ minWidth: 275 }}>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                        Import stations
                    </Typography>
                  <CardContent>
                    <TextField 
                              label="Enter fullpath"
                              onChange={e => setFullPath(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="text"
                              sx={{mb: 3}}
                              fullWidth
                              value={fullPath}
                              error={fullPathError}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { HandleImportStations() }}>Import</Button>
                  </CardActions>
                </Card>
              </form>
            </div>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openDialog} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message_dialog_type} sx={{ width: '100%' }}>
              {message_dialog}
            </Alert>
          </Snackbar>
          <Footer />
          </ThemeProvider>
        </div>
     );
}
 
export default Settings;