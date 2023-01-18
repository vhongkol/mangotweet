<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Helper\HasApiResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{   
    use HasApiResponse;
    
    public function register(Request $request, User $user)
    {
        $rules = [    
            'username' => 'required|alpha_num',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ];
        
        $messages = [
            'username.required' => 'First name is required field!',
            'username.alpha_num' => 'Username nimo jade!',

            'first_name.required' => 'First name is required field!',
            'first_name.string' => 'First name must be string!',

            'last_name.require' => 'Last name is required field!',
            'last_name.string' => 'Last name must be string!', 

            'email.required' => 'Email is required field!',
            'email.email' => 'Email is Invalid!',
            'email.unique:users' => 'Email is required field!',

            'password' => 'Password is required!',
            
            'confirm_password.required' => 'Password is required!',
            'confirm_password.same:password' => 'Password and confirm password must match!',
        ];

        $validation = Validator::make($request->all(), $rules, $messages);
        if($validation->fails())
        {
            return $this->httpBadRequestError($validation->errors(), []);
        } 
   
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
        return $this->httpUnauthorizedError('Unauthorised', ['error'=>'Username or email is not matched in our records!']);
    }

    public function profile(Request $request) {
        $user = $request->json();
        if ($user) {
            return response()->json([
                'Success' => 'User Profile'
            ], 200);
        }
    }

    public function logout(User $user) {
        $user->logout();

        return response()->json(['Success' => 'Logged out'], 200);
    }
}