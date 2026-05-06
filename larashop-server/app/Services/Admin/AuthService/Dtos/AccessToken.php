<?php

namespace App\Services\Admin\AuthService\Dtos;

use App\Models\AdminUser;

class AccessToken
{
    public string $accessToken;
    public AdminUser $adminUser;

    public function __construct(string $accessToken, AdminUser $adminUser)
    {
        $this->accessToken = $accessToken;
        $this->adminUser = $adminUser;
    }
}