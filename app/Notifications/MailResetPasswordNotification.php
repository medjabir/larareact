<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use Illuminate\Auth\Notifications\ResetPassword;

class MailResetPasswordNotification extends ResetPassword
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        parent::__construct($token);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        // $link = url( "/api/password/reset/".$this->token );
        return ( new MailMessage )
        ->markdown('mail.passwordResetRequest', [
            'token' => $this->token, 
            'expireTime' => config('auth.passwords.users.expire') 
            ]);
            // ->subject( 'Reset Password Notification' )
            // ->line( "Hello! You are receiving this email because we received a password reset request for your account." )
            // ->line( 'Code :  ')
            // ->line($this->token)
            // ->line( "This password reset code will expire in ".config('auth.passwords.users.expire')." minutes" )
            // ->line( "If you did not request a password reset, no further action is required." );  
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
