<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\PersonalAccessToken;
   
class CuentaController extends BaseController
{
    public function guardarPerfil(Request $request)
    {
        if (Auth::check()) {
            $id = $request->input('id');
            $username = $request->input('username');
            $email = $request->input('email');
            $new_password = $request->input('new-password');
            $password = $request->input('password');

            $user = User::find($id);

            if($username != "") {
                $user->username = $username;
            }
            if($email != "") {
                $user->email = $email;
            }
            if($new_password != "") {
                $user->password = Hash::make($new_password);
            }
            
            $user->save();

            return $this->sendResponse(array('status'=>1), 'Los datos fueron actualizados correctamente');

        } else {
            return $this->sendResponse(array('status'=>0), 'Ocurrio un error actualizando los datos');
        }
    }

    public function salir(Request $request): JsonResponse
    {
        $token = PersonalAccessToken::findToken($request->token);
        if($token) {
            $token->delete();
            return $this->sendResponse([], 'Token borrado correctamente');
        } else {
            return $this->sendError('No se encontro token', ['error'=>'No se encontro token']);
        }
    }
}