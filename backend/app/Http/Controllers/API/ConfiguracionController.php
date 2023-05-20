<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use Illuminate\Http\JsonResponse;
use App\Services;
   
class ConfiguracionController extends BaseController
{
    public function buscarCanciones(Request $request): JsonResponse
    {
        $services = new \App\Functions\Services();

        $directory = $request->input("directory");

        $count = $services->scanSongs($directory);
        $message = $count . ' songs scanned';
                
        return $this->sendResponse(array(), $message);
    }

    public function reiniciarBD(Request $request): JsonResponse
    {
        $services = new \App\Functions\Services();

        $directory = $request->input("directory");

        $services->restartDatabase();
        $message = 'Database restarted';
        
        return $this->sendResponse(array(), $message);
    }

    public function importarEstaciones(Request $request): JsonResponse
    {
        $services = new \App\Functions\Services();

        $filename = $request->input("filename");

        $count = $services->importStations($filename);

        return $this->sendResponse(array(), $count . ' stations imported');
    }

}