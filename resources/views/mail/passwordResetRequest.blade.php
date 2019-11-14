@component('mail::message')
# Hello

Hello! You are receiving this email because we received a password reset request for your account.<br /><br />
Code : <br />
<div class="tokenHolder"><strong>{{ $token }}</strong></div><br /><br />
This password reset code will expire in {{ $expireTime }} minutes.<br />
If you did not request a password reset, no further action is required.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
