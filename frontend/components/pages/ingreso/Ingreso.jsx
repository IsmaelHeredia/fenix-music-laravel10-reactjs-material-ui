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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
 
const Ingreso = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

 
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

    const handleSubmit = (event) => {
        event.preventDefault()
 
        setUsernameError(false)
        setPasswordError(false)
 
        if (username == '') {
            setUsernameError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
 
        if (username && password) {

          var url = window.$url_api + "/ingreso";

          axios.post(url, {"username" : username, "password" : password})
            .then(res => {
              console.log(res);
              console.log(res.data.data);   
              if(res.data.data.token != null) {
                var token = res.data.data.token; 
                var id = res.data.data.id;
                sessionStorage.setItem(window.$nombre_session, token);
                sessionStorage.setItem(window.$usuario_session, username);
                sessionStorage.setItem(window.$id_usuario_session, id);

                History.push("/");      
                History.go();
              } else {
                setMessageDialog("Login failed");
                setMessageTypeDialog("warning");
                setOpenDialog(true);
              }     
          }).catch(e => {
              console.log(e);
              setMessageDialog("Login failed");
              setMessageTypeDialog("warning");
              setOpenDialog(true);
          });

        }
    }
     
    return ( 
        <div>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="ingreso">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia
                    sx={{ height: 300 }}
                    image="fenix.jpg"
                  />
                  <CardContent>
                    <TextField 
                              label="Username"
                              onChange={e => setUsername(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="text"
                              sx={{mb: 3}}
                              fullWidth
                              value={username}
                              error={usernameError}
                          />
                          <TextField 
                              label="Password"
                              onChange={e => setPassword(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="password"
                              value={password}
                              error={passwordError}
                              fullWidth
                              sx={{mb: 1}}
                      />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
                  </CardActions>
                </Card>
              </form>
            </div>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openDialog} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message_dialog_type} sx={{ width: '100%' }}>
              {message_dialog}
            </Alert>
          </Snackbar>
          </ThemeProvider>
        </div>
     );
}
 
export default Ingreso;