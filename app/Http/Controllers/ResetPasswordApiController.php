<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ResetPasswordApiController extends Controller
{

    use ResetsPasswords;

    /**
	 * Create a new controller instance.
	 */

	public function __construct() {

        $this->middleware('guest');
        
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */

    public function reset(Request $request)
    {

        $validated_request = Validator::make($request->all(), $this->rules());

        if($validated_request->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validated_request->errors()
            ]);
        }

        // $request->validate($this->rules(), $this->validationErrorMessages());

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
                    ? $this->sendResetResponse($request, $response)
                    : $this->sendResetFailedResponse($request, $response);
    }

    protected function sendResetResponse($request, $response) {

        return response()->json([

            'message' => trans($response),
            'status' => true
        ]);
    }

    protected function sendResetFailedResponse($request, $response) {

        return response()->json([

            'errors' => ['token' => [trans($response)]],
            'status' => false
        ]);
    }

    
    /**
     * Get the password reset validation rules.
     *
     * @return array
     */

    protected function rules()
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ];
    }






}
