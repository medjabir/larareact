<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;

class VerificationApiController extends Controller
{


    use VerifiesEmails;
    /**
    * Show the email verification notice.
    *
    */
    public function show()
    {
    //
    }

    /**
    * Mark the authenticated user’s email address as verified.
    *
    * @param \Illuminate\Http\Request $request
    * @return \Illuminate\Http\Response
    */

    public function verify(Request $request) {
        
            $userID = $request['id'];
            $user = User::findOrFail($userID);

        if($user->hasVerifiedEmail()) {
            
            return response()->json('User has already verified email!');

        } else {

            if(hash_equals((string) $request['hash'], sha1($user->getEmailForVerification()))) {

                $date = date('Y-m-d g:i:s');
                $user->email_verified_at = $date; // to enable the “email_verified_at field of that user be a current time stamp by mimicing the must verify email feature
                $user->save();

                return redirect('/home');
    
            } else {
                return response()->json('Email Verification Failed');
            }

        }

    }

    /**
    * Resend the email verification notification.
    *
    * @param \Illuminate\Http\Request $request
    * @return \Illuminate\Http\Response
    */

    public function resend(Request $request){

        if ($request->user()->hasVerifiedEmail()) {
        return response()->json('User already have verified email!', 422);
        // return redirect($this->redirectPath());
        }

        $request->user()->sendApiEmailVerificationNotification();
        return response()->json([
            'message' => 'Email verification has been resent',
            'resent' => true
        ]);
        // return back()->with('resent', true);

    }
}