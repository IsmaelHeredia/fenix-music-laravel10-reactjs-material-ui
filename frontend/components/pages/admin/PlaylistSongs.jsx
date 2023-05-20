import React, { Component } from "react";
import ReactDOM from "react-dom";

import Box from '@mui/material/Box';
import '../../../src/App.css'
import History from "../../../src/History";

import Toolbar from '@mui/material/Toolbar';
import Header from "../../layouts/home/header";
import Footer from "../../layouts/home/footer";

import axios from "axios";

import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

import Typography from '@mui/material/Typography';

import logo from '../../../src/logo.svg';

export default class PlaylistSongs extends Component {

  constructor(props){
    super(props);
    this.state = {
      tracks: [],
      isLoaded: false,
    }
  }

  componentDidMount() {

      var url = window.$url_api + "/datos/cargarCancionesPlaylist";

      var history_url = History.location.pathname;
      var playlist_id = history_url.split("playlist/").pop().split("/load").shift();

      axios.post(url, {"playlist_id":playlist_id}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            tracks: res.data.data.songs
          });      
      }).catch(e => {
          console.log(e);
      });

  }

  render() {
    return (
    <div>
      <Header/>
      <div className="fondo">
          <Box className="box_player">
            <Toolbar />
              {this.renderList()}
          </Box>
      </div> 
      <Footer/>
    </div>
    );
  }

  renderList(){

    var { tracks = [] } = this.props;
    var { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div><img src={logo} className="App-logo" alt="logo" /></div>
      )

    } else {

      if(this.state.tracks.length === 0) {
        return(
          <div>
            <Typography variant="h3" gutterBottom className="white">
              Songs not found
            </Typography>
          </div>
        )
      } else {
        return(
          <Player trackList={this.state.tracks} includeTags={false} />
        )
      }

    }

  }

}