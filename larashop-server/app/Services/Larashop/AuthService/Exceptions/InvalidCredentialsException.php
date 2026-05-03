<?php
namespace App\Services\Larashop\AuthService\Exceptions;

use Exception;

class InvalidCredentialsException extends Exception
{
    public function __construct()
    {
        parent::__construct('ログイン情報が正しくありません。');
    }
}