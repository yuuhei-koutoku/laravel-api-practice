<?php

namespace App\Services\Larashop\AuthService\Dtos;

use App\Models\User;

class AccessToken
{
    public string $accessToken;
    public User $user;

    public function __construct(string $accessToken, User $user)
    {
        $this->accessToken = $accessToken;
        $this->user = $user;
    }
}