<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

//Register routes
Route::post('register',[AuthController::class,'register']);

//Login routes
Route::post('login',[AuthController::class,'login']);

//Forgot Password Routes
Route::post('forgot', [ForgotPassController::class, 'forgot']);

//Reset Password Routes
Route::post('reset', [ForgotPassController::class, 'reset']);
Route::post('update-profile',[UpdateProfile::class,'update-profile']);

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('homepage', [HomeController::class, 'index']);
    Route::get('profile',[ProfileController::class,'profile']);
    Route::put('updateProfile',[ProfileController::class,'update']);
}); 