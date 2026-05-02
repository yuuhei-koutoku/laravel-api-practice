<?php
namespace App\Services\Larashop\AuthService\Exceptions;

use Exception;

class UserAlreadyVerifiedException extends Exception
{
    public function __construct()
    {
        parent::__construct('すでに本登録されています。');
    }
}