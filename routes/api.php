<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:api'], function() {

    Route::post('logout', 'AuthApiController@logout');
});

Route::post('login', 'AuthApiController@login');
Route::post('register', 'AuthApiController@register');

Route::get('email/verify/{id}/{hash}', 'VerificationApiController@verify')->name('verificationapi.verify');
Route::get('email/resend', 'VerificationApiController@resend')->middleware('auth:api')->name('verificationapi.resend');

Route::post('password/email', 'ResetPasswordRequestApiController@sendResetLinkEmail');
Route::post('password/reset', 'ResetPasswordApiController@reset');
