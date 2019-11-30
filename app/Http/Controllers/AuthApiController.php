<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Support\Facades\Auth;
use Helper;

class AuthApiController extends Controller
{
    use VerifiesEmails;

    public function register(Request $request) {

        // Gmail address normalization
        $normalized_email = Helper::normalized_email($request->email);

        $validation = Validator::make([
            'name' => $request->name,
            'email' => $normalized_email,
            'password' => $request->password,
            'password_confirmation' => $request->password_confirmation
        ], [
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        if($validation->fails()) {
            return response()->json([
                'isRegistered' => false,
                'errors' => $validation->errors()
            ]);

        } else {
            
            $request['password'] = Hash::make($request->password);

            // $user = User::create($request->all());

            $user = new User;
            $user->name = $request->name;
            $user->email = $normalized_email;
            $user->unnormalized_email = $request->email;
            $user->password = $request->password;
            $user->save();

            // $accessToken = $user->createToken('userToken')->accessToken;

            $user->sendApiEmailVerificationNotification();

            return response()->json([
                'isRegistered' => true,
                'user' => $user,
                // 'access_token' => $accessToken
            ]);

        }

    }

    public function login(Request $request) {

        // Gmail address normalization
        $normalized_email = Helper::normalized_email($request->email);

        $validatedLoginData = Validator::make([

            'email' => $normalized_email,
            'password' => $request->password
        ], [
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if($validatedLoginData->fails()) {
            return response()->json([
                'isLogged' => false,
                'errors' => $validatedLoginData->errors()
            ]);

        } else {

            if(!auth()->attempt($validatedLoginData->valid())) {
                return response()->json([
                    'isLogged' => false,
                    'errors' => 'Invalid Credentials'
                ]);

            } else {

                // $accessToken = auth()->user()->createToken('userToken')->accessToken;

                return response()->json([
                    'isLogged' => true,
                    'user' => auth()->user(),
                    // 'access_token' => $accessToken
                ]);


            }

        }

    }

    public function logout() {
        
        Auth::logout();
    }

    public function sendPasswordResetNotification($token) {
        $this->notify(new \App\Notifications\MailResetPasswordNotification($token));
    }
}
