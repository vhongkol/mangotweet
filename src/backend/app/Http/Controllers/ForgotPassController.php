<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgetRequest;
use App\Http\Requests\ResetRequest;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetMail;
use Exception;
use Illuminate\support\Facades\Hash;

use Illuminate\Http\Request;

class ForgotPassController extends Controller
{
    public function forgot(ForgetRequest $request) {
        $email = $request->email;

        if (User::where('email', $email)->doesntExist()) {
            return response([
                'message' => 'Incorrect Email!'
            ], 401);

        } //generate random token
        $token = rand(10, 100000);

        try{

            $del = DB::table('password_resets')->where('email', $email);

            $del->delete();

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            //mail send to user
            Mail::to($email)->send(new ForgetMail($token));
                return response([
                    'messege' => 'Reset your Password!'
                ], 200);

        }catch (Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }


    } //end method

    public function reset(ResetRequest $req) {

        $otp = DB::table('password_resets')->where('email', $req->email)->get('token')->first();
        
        // \Log::info($otp->token);
        // \Log::info($req->otp);
        if (strcmp($otp->token, $req->otp) != 0) {

            return response([
                'message' => 'Invalid Token!'
            ], 400);
        }

        DB::table('users')->where('email', $req->email)->update(['password' => Hash::make($req->password)]);
        // $user->update(['password' => Hash::make($req->password)]);

        return response([
            'message' => 'DONE'
        ], 200);
    }
}