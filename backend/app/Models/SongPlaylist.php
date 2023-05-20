<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongPlaylist extends Model
{
    use HasFactory;

    protected $table = "songs_playlist";
    protected $fillable = ["playlist_id", "song_id"];

	public function playlist()
    {
        return $this->belongsTo("App\Playlist");
    }

    public function song()
    {
        return $this->belongsTo("App\Song");
    }
}
