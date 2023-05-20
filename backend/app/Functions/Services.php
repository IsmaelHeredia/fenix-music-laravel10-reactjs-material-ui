<?php

namespace App\Functions;

ini_set('max_execution_time', 3600);

use Illuminate\Support\Facades\DB;
use App\Models\Song;
use App\Models\Playlist;
use App\Models\SongPlaylist;
use App\Models\Station;
use App\Functions;

class Services {

    function saveSong($file,$url) 
    {
        $util = new \App\Functions\Util();

        $name = basename($file, '.mp3');
        $datetime = date("Y-m-d H:i:s", filectime($file));
                
        $song = new Song;
        $song->name = $name;
        $song->path = $file;
        $song->url = $url;
        $song->creation_date = $datetime;

        $song->save();

        return $song->id;
    }

    function savePlaylist($dirname) {
        $playlist = new Playlist;
        $playlist->name = $dirname;
        
        $playlist->save();
        
        return $playlist->id;
    }

    function saveSongPlaylist($playlist_id,$song_id) {
        $songPlaylist = new SongPlaylist;
        $songPlaylist->playlist_id = $playlist_id;
        $songPlaylist->song_id = $song_id;
        
        $songPlaylist->save();
        
        return $songPlaylist->id;
    }

    function saveStation($name,$link,$categories) {
        $station = new Station;
        $station->name = $name;
        $station->link = $link;
        $station->categories = $categories;
        
        $station->save();
        
        return $station->id;
    }

    function scanSongs($directory) {
        $count = 0;

        $music_library_music = env('MUSIC_LIBRARY_URL');

        if(is_dir($directory)) {

            $list_db = array();
            $list_local = array();

            $songs_playlist = SongPlaylist::orderBy('id','ASC')->get()->toArray();
            
            foreach($songs_playlist as $song_playlist) {
                $sp_playlist_id = $song_playlist["playlist_id"];
                $sp_song_id = $song_playlist["song_id"];
                $song = Song::find($sp_song_id);
                $playlist = Playlist::find($sp_playlist_id);
                array_push($list_db, $song->path . "[separator]" . $playlist->name);
            }
                        
            $directories = glob($directory . '/*' , GLOB_ONLYDIR);
            
            foreach($directories as $directory) {            
                $files = glob($directory . '/*.mp3');
            
                foreach($files as $file) {
                    array_push($list_local, $file . "[separator]" . basename($directory));
                }
            } 
            
            $new_songs = array_diff($list_local, $list_db);

            foreach($new_songs as $new_song) {
                $split = explode("[separator]",$new_song);
                $song = $split[0];
                $playlist = $split[1];
                $song_id = "";
                $playlist_id = "";

                $url =  $music_library_music . "/" . $playlist . "/" . basename($song);

                if (Playlist::where('name', '=', $playlist)->count() > 0) {
                    $playlist_id = Playlist::where('name', '=', $playlist)->first()->id;
                } else {
                    $playlist_id = $this->savePlaylist($playlist);
                }
                if (Song::where('path', '=', $song)->count() > 0) {
                    $song_id = Song::where('path', '=', $song)->first()->id;
                } else {
                    $song_id = $this->saveSong($song,$url);
                }

                $playlistSong_id = $this->saveSongPlaylist($playlist_id,$song_id);
            }

            $count = count($new_songs);
        }
        return $count;
    }

    function importStations($json_file) {
        $stations = json_decode(file_get_contents($json_file), true);
        $count = 0;
        foreach($stations as $station) {
            $name = $station["name"];
            $link = $station["link"];
            $categories = $station["categories"];
            if (Station::where('name', '=', $name)->count() == 0) {
                $station_id = $this->saveStation($name,$link,$categories);
                $count++;
            }
        }
        return $count;
    }

    function restartDatabase() {

        DB::statement("DELETE FROM songs_playlist;");
        DB::statement("DELETE FROM songs;");
        DB::statement("DELETE FROM playlists;");
        DB::statement("DELETE FROM stations;");
        DB::statement("ALTER TABLE songs_playlist AUTO_INCREMENT = 1;");
        DB::statement("ALTER TABLE songs AUTO_INCREMENT = 1;");
        DB::statement("ALTER TABLE playlists AUTO_INCREMENT = 1;");
        DB::statement("ALTER TABLE stations AUTO_INCREMENT = 1;");
        
    }

    function convertirTracks($tracks) {
        $resultado = array();
        foreach($tracks as $track) {
            $id = $track->id;
            $title = $track->name;
            $url = $track->url;
            $datos = array();
            $datos["id"] = $id;
            $datos["url"] = $url;
            $datos["title"] = $title;
            $datos["tags"] = array("All");
            array_push($resultado,$datos);
        }
        return $resultado;
    }

}