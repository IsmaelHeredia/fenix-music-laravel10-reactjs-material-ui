import React, { Component } from "react";
import ReactDOM from "react-dom";

import Box from '@mui/material/Box';
import '../../../src/App.css'
import History from "../../../src/History";

import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import axios from "axios";

import Toolbar from '@mui/material/Toolbar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TextField, FormControl, Button } from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';

import logo from '../../../src/logo.svg';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default class Playlists extends Component {


  constructor(props){
    super(props);
    this.state = {
      list_playlists: [],
      isLoaded: false,
    }
  }

  componentDidMount() {

      var url = window.$url_api + "/datos/cargarPlaylists";

      axios.post(url, {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res.data.data.playlists);
          this.setState({
            isLoaded: true,
            list_playlists: res.data.data.playlists
          });      
      }).catch(e => {
          console.log(e);
      });

  }

  render() {
    return (
    <div>
      <Header />
        <Box>
          <Toolbar />
            {this.renderList()}
        </Box>
      <footer />
    </div> 
    );
  }

  renderList(){

    var { list_playlists = [] } = this.props;
    var { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div><img src={logo} className="App-logo-playlist" alt="logo" /></div>
      )

    } else {

      if(this.state.list_playlists.length === 0) {
        return(
          <div>
            <Typography variant="h3" gutterBottom className="white">
              Playlists not found
            </Typography>
          </div>
        )
      } else {

        return (
          <div className="box-playlists">
            <div className="scrollbar-playlists">
              <ThemeProvider theme={darkTheme}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Opcion</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.list_playlists.map((playlist) => (
                        <TableRow
                          key={playlist.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{playlist.name}</TableCell>
                          <TableCell>
                          <Button variant="contained" color="primary" fullWidth onClick={() => { History.push("/playlist/" + playlist.id + "/load");History.go(); }}>Load</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ThemeProvider>
            </div>
          </div>
        );

      }
        
    }

  }

}