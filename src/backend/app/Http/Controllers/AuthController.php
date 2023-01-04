<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Helper\HasApiResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{   
    use HasApiResponse;
    
    public function register(RegisterRequest $request, User $user)
    {
        $user = $user->saveUser($request);

        return $this->httpCreated($user, 'User created successfully!');
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if(Auth::attempt($credentials)){ 
            $user['user'] = Auth::user(); 
            $user['token'] =  Auth::user()->createToken('myApp')->accessToken; 
            return $this->httpSuccess($user, 'User login successfully.');
        } 
        return $this->httpUnauthorizedError('Unauthorised.', ['error'=>'Username or email is not matched in our records!']);
    }

    public function logout(User $user)
    {
        $user->logout();

        return response()->json(['Success' => 'Logged out'], 200);
    }
}