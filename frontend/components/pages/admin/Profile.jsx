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
 
const Profile = () => {

    const [id, setId] = useState(sessionStorage.getItem(window.$id_usuario_session))
    const [username, setUsername] = useState(sessionStorage.getItem(window.$usuario_session))
    const [email, setEmail] = useState("")
    const [new_password, setNewPassword] = useState("")
    const [password, setPassword] = useState("")
    
    const [idError, setIdError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [new_passwordError, setNewPasswordError] = useState(false)
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
            .then(res1 => {
              console.log(res1);
              console.log(res1.data.data);   
              if(res1.data.data.token != null) {

                var url_guardar = window.$url_api + "/cuenta/guardarPerfil";

                axios.post(url_guardar, {
                  "id" : id, "username" : username, "email" : email, "password" : password, "new-password" : new_password},
                  {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }}
                  )
                  .then(res2 => {
                    console.log(res2);
                    console.log(res2.data.data);   
                    if(res2.data.data.status == 1) {
      
                      var url_logout = window.$url_api + "/cuenta/salir";
      
                      axios.post(url_logout, {"token" : sessionStorage.getItem(window.$nombre_session)}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
                      .then(res3 => {
                        History.push("/ingreso");      
                        History.go();       
                      }).catch(e => {
                          console.log(e);
                      });
      
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
            <Header />
            <div className="profile">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Card sx={{ minWidth: 275 }}>
                    <Typography align="center" variant="h5" component="div" style={{ marginTop: "10px" }}>
                    Data
                    </Typography>
                  <CardContent>
                    <TextField 
                              label="Enter username"
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
                              label="Enter email"
                              onChange={e => setEmail(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="text"
                              sx={{mb: 3}}
                              fullWidth
                              value={email}
                              error={emailError}
                    />
                    <TextField 
                              label="Enter new password"
                              onChange={e => setNewPassword(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="password"
                              sx={{mb: 3}}
                              fullWidth
                              value={new_password}
                              error={new_passwordError}
                    />
                    <TextField 
                              label="Enter password"
                              onChange={e => setPassword(e.target.value)}
                              required
                              variant="outlined"
                              color="primary"
                              type="password"
                              sx={{mb: 3}}
                              fullWidth
                              value={password}
                              error={passwordError}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" type="submit" fullWidth>Save</Button>
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
 
export default Profile;