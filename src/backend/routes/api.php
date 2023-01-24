<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ReactionsController;
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
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('homepage', [HomeController::class, 'index']);
    Route::get('profile',[ProfileController::class,'profile']);
    Route::put('updateProfile',[ProfileController::class,'update']);
}); 

Route::group(['middleware' => ['auth:api']], function () {
    Route::apiResource('/posts', PostsController::class);    
    Route::apiResource('/comments', CommentsController::class);    
    Route::apiResource('/reactions', ReactionsController::class);

    Route::get('/posts-reaction-list/{post}', [PostsController::class, 'reactionList']);
    Route::get('/comments-reaction-list/{post}', [CommentsController::class, 'reactionList']);

});