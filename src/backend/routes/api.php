<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

//Register routes
Route::post('register',[AuthController::class,'register']);

//Login routes
Route::post('login',[AuthController::class,'login']);

//Forgot Password Routes
Route::post('forgot', [ForgotPassController::class, 'forgot']);

//Reset Password Routes
Route::post('reset', [ForgotPassController::class, 'reset']);


Route::group(['middleware' => ['auth:api']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('homepage', [HomeController::class, 'index']);

    Route::get('user',[AuthController::class,'user']);
});