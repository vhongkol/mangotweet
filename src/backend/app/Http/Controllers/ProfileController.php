<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function profile(Request $request) {
        $user = $request->user();

        if ($user) {
            return response()->json($user, 200);
        }
        else {
            return response()->json([
                'message'=> 'User not found!'
            ], 400);
        }
    }
}
