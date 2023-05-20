<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AccesoController;
use App\Http\Controllers\API\ConfiguracionController;
use App\Http\Controllers\API\DatosController;
use App\Http\Controllers\API\CuentaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::controller(AccesoController::class)->group(function(){
    Route::post('registrar', 'registrar');
    Route::post('ingreso', 'ingreso');
    Route::post('validar', 'validar');
});
        
Route::middleware('auth:sanctum')->group( function () {

    Route::post('/datos/cargarCanciones', [DatosController::class, 'cargarCanciones'])->name('cargarCanciones');
    Route::post('/datos/cargarPlaylists', [DatosController::class, 'cargarPlaylists'])->name('cargarPlaylists');
    Route::post('/datos/cargarEstaciones', [DatosController::class, 'cargarEstaciones'])->name('cargarEstaciones');

    Route::post('/datos/cargarCancionesPlaylist', [DatosController::class, 'cargarCancionesPlaylist'])->name('cargarCancionesPlaylist');

    Route::post('/configuracion/buscarCanciones', [ConfiguracionController::class, 'buscarCanciones'])->name('buscarCanciones');
    Route::post('/configuracion/reiniciarBD', [ConfiguracionController::class, 'reiniciarBD'])->name('reiniciarBD');
    Route::post('/configuracion/importarEstaciones', [ConfiguracionController::class, 'importarEstaciones'])->name('importarEstaciones');

    Route::post('/cuenta/guardarPerfil', [CuentaController::class, 'guardarPerfil'])->name('guardarPerfil');
    Route::post('/cuenta/salir', [CuentaController::class, 'salir'])->name('salir');
});
