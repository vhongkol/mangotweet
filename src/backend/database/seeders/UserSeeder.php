<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder

{
    public function run()
    {
        DB::table('users')->insert([
            'name' => "Al Mhuranas",
            'email' => "pradilla01@gmail.com",
            'password' => Hash::make('password'),
            'first_name' => "Al",
            'last_name' => "Mhuranas",
        ]);
    }
}