<?php

namespace App\Services\Admin\AuthService;

use App\Services\Admin\Dtos\OperationResult;
use App\Services\Admin\AuthService\Dtos\AccessToken;

interface AuthServiceInterface
{
    public function signin(string $email, string $password): ?AccessToken;
    public function signout(): OperationResult;
}