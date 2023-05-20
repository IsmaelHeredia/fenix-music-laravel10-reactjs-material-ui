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

import ReactHowler from 'react-howler';

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

export default class Stations extends Component {


  constructor(props){
    super(props);
    this.state = {
      list_stations: [],
      url:"",
      playing:false,
      isLoaded: false,
    }
  }

  componentDidMount() {

      var url = window.$url_api + "/datos/cargarEstaciones";

      axios.post(url, {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res.data.data.stations);
          this.setState({
            isLoaded: true,
            list_stations: res.data.data.stations
          });      
      }).catch(e => {
          console.log(e);
      });

  }

  play_station (station) {
    var url_station = station.link;
    console.log("inicio");
    console.log(url_station);
    this.setState({
        url: url_station,
        playing: true
    })
  }

  stop_station () {
    this.setState({
      playing: false
    })
  }

  render() {
    return (
    <div className="box-stations">
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
        <div><img src={logo} className="App-logo" alt="logo" /></div>
      )

    } else {


      if(this.state.list_stations.length === 0) {
        return(
          <div>
            <Typography variant="h3" gutterBottom className="white">
              Stations not found
            </Typography>
          </div>
        )
      } else {

        return (
            <div>
                <ReactHowler
                src={[this.state.url]}
                playing={this.state.playing}
                html5={true}
                ref={(ref) => (this.player = ref)}
                />
                <div className="scrollbar-stations">
                    <ThemeProvider theme={darkTheme}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Categories</TableCell>
                            <TableCell>Option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.list_stations.map((station) => (
                            <TableRow
                                key={station.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{station.name}</TableCell>
                                <TableCell>{station.categories}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => this.play_station(station)} >Play</Button> <Button variant="contained" color="primary" onClick={() => this.stop_station()} >Stop</Button>
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