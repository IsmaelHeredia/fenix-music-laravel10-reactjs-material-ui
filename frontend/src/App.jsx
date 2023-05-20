window.$url_api = "http://localhost/fenix-music-api/public/api";
window.$nombre_session = "fenixmusic_session";
window.$id_usuario_session = "fenixmusic_id";
window.$usuario_session = "fenixmusic_username";

import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import RutasNormales from "../components/RutasNormales";
import ProtegerRutas from "../components/ProtegerRutas";

import Ingreso from "../components/pages/ingreso/Ingreso";

import Home from "../components/pages/admin/Home";
import Playlists from "../components/pages/admin/Playlists";
import PlaylistSongs from "../components/pages/admin/PlaylistSongs";
import Stations from "../components/pages/admin/Stations";
import Settings from "../components/pages/admin/Settings";
import Profile from "../components/pages/admin/Profile";
import About from "../components/pages/admin/About";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RutasNormales />}>
          <Route path="/ingreso" element={<Ingreso />} />
        </Route>
        <Route element={<ProtegerRutas />}>
          <Route path="/" element={<Home/>} />
          <Route path="/playlists" element={<Playlists/>} />
          <Route path="/playlist/:id/load" element={<PlaylistSongs/>} />
          <Route path="/stations" element={<Stations/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/about" element={<About/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}