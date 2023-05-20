<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\PersonalAccessToken;
   
class AccesoController extends BaseController
{
    public function registrar(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'email' => 'required|email',
            'role' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Error de validacion', $validator->errors());       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $usuario = User::create($input);
        $respuesta['token'] =  $usuario->createToken('MyApp')->plainTextToken;
        $respuesta['username'] =  $usuario->username;
   
        return $this->sendResponse($respuesta, 'Usuario registrado correctamente');
    }

    public function ingreso(Request $request): JsonResponse
    {
        if(Auth::attempt(['username' => $request->username, 'password' => $request->password])){ 
            $usuario = Auth::user(); 
            $respuesta['token'] =  $usuario->createToken('MyApp')->plainTextToken; 
            $respuesta['id'] =  $usuario->id;
            $respuesta['username'] =  $usuario->username;
   
            return $this->sendResponse($respuesta, 'Ingreso validado correctamente');
        } 
        else{ 
            return $this->sendError('Acceso Denegado', ['error'=>'Acceso Denegado']);
        } 
    }

    public function validar(Request $request): JsonResponse
    {
        $token = PersonalAccessToken::findToken($request->token);
        if($token) {

            $usuario = $token->tokenable;

            $respuesta['id'] =  $usuario->id;
            $respuesta['name'] =  $usuario->name;
            $respuesta['username'] =  $usuario->username;
            $respuesta['role'] =  $usuario->role;

            return $this->sendResponse($respuesta, 'Token validado correctamente');
        } else {
            return $this->sendError('Acceso Denegado', ['error'=>'Acceso Denegado']);
        }
    }
}