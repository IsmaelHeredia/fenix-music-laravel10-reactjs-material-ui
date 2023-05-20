<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Song;
use App\Models\Playlist;
use App\Models\SongPlaylist;
use App\Models\Station;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Services;

class DatosController extends BaseController
{
    public function cargarCanciones(Request $request): JsonResponse
    {
        $services = new \App\Functions\Services();

        $songs = Song::orderBy('creation_date','DESC')->get();
           
        return $this->sendResponse(array('songs'=>$services->convertirTracks($songs)), 'Los datos fueron enviados correctamente');
    }

    public function cargarPlaylists(Request $request): JsonResponse
    {
        $playlists = Playlist::orderBy('name','ASC')->get();
           
        return $this->sendResponse(array('playlists'=>$playlists), 'Los datos fueron enviados correctamente');
    }

    public function cargarCancionesPlaylist(Request $request): JsonResponse
    {
        $services = new \App\Functions\Services();
        
        $playlist_id = $request->input('playlist_id');

        $songs_playlist = DB::select('SELECT s.id,s.name,s.path,s.url,s.creation_date,sp.id AS song_playlist_id FROM songs s,songs_playlist sp WHERE s.id = sp.song_id AND sp.playlist_id = :playlist_id ORDER BY s.creation_date DESC', ['playlist_id' => $playlist_id]);
           
        return $this->sendResponse(array('songs'=>$services->convertirTracks($songs_playlist)), 'Los datos fueron enviados correctamente');
    }

    public function cargarEstaciones(Request $request): JsonResponse
    {
        $stations = Station::orderBy('name','ASC')->get();
           
        return $this->sendResponse(array('stations'=>$stations), 'Los datos fueron enviados correctamente');
    }

}