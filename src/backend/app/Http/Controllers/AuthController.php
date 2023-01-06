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

            'name' => 'required|string|max:50',

            'first_name' => 'required|string',

            'last_name' => 'required|string',

            'address' => 'required|string',

            'email' => 'required|email|unique:users',

            'password' => 'required',

            'c_password' => 'required|same:password',

        ];

       

        $messages = [

            'name' => 'Name is required field!',

            'first_name' => 'First name is required field!',

            'last_name' => 'Last name is required field!',

            'address' => 'Address is required field!',

            'email' => 'Email is required field!',

            'password' => 'Password is required!',

            'c_password' => 'Password and confirm password must be same!'

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

        return $this->httpUnauthorizedError('Unauthorised.', ['error'=>'Username or email is not matched in our records!']);

    }



    public function logout(User $user)

    {

        $user->logout();



        return response()->json(['Success' => 'Logged out'], 200);

    }

}