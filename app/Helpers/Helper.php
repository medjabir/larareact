<?php 

namespace App\Helpers;

class Helper {

    public static function normalized_email(string $email): string
    {
        list($user, $provider) = explode('@', $email);
    
        $user = explode('+', $user)[0];
        $user = str_replace('.', '', strtolower($user));
    
        $provider = strtolower($provider);
    
        return $user . '@' . $provider;
    }
    
}