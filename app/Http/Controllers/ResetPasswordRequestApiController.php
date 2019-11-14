<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;

class ResetPasswordRequestApiController extends Controller
{

    use SendsPasswordResetEmails;

    /**
	 * Create a new controller instance.
	 */

	public function __construct() {

        $this->middleware('guest');
        
    }
    
    public function sendResetLinkEmail(Request $request) {

        $this->validateEmail($request);
        
		// We will send the password reset link to this user. Once we have attempted
		// to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        
		$response = $this->broker()->sendResetLink($request->only('email'));
        
        return $response == Password::RESET_LINK_SENT
        
            ? $this->sendResetLinkResponse($request, $response)
            
			: $this->sendResetLinkFailedResponse($request, $response);
    }

  
    /**
     * Get the response for a successful password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */

    protected function sendResetLinkResponse(Request $request, $response) {

        return response()->json([

            'message' => 'Password reset email sent.',
            'data' => trans($response),
            'status' => true
        ]);
    }

    /**
     * Get the response for a failed password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */

    protected function sendResetLinkFailedResponse(Request $request, $response) {

        return response()->json([
            'message' => 'Email could not be sent to this email address.',
            'status' => false
            ]);
    }






}
