<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpdateProfile extends Controller
{
    public function updateProfile(Request $request) {
        $request->validate([
           'name' => 'required|string|max:150',
        ]);

        $user = $request->user();

        /*$oldPhoto = $user->photo;
            if ($request->hasFile('photo')) {
                $request->validate([
                    'photo' => 'image|mimes:jpeg,png,jpg|max:5120',
                ]);

                $path =$request->file('photo')->store('profile');
                $user->photo = $path;
            }*/

            $user->name =$request->name;
            $user->about = $request->about;

           /* if ($user->save()) {
                if ($oldPhoto != $user->photo) {
                    Storage::delete($oldPhoto);
                }
                return response()->json($user, 200);
            } 
            
            else {
                return response()->json([
                'message' => 'Error, please try again!'
            ], 500);
        }*/
    }
}
