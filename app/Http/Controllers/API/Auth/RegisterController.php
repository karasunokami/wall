<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class RegisterController extends Controller
{
    /**
     * Create a new user instance
     *
     * @return \App\Models\User
     */
    protected function register(Request $request)
    {
        $data = $request->validate([
            "login" => "required",
            "password" => "required|min:4"
        ]);

        $user = User::create([
            "login" => $data["login"],
            "password" => \Hash::make($data["password"]),
        ]);

        // user role
        $user->roles()->attach(1);

        return response()->json([
            "status" => true,
            "user" => $user
        ]);
    }
}
