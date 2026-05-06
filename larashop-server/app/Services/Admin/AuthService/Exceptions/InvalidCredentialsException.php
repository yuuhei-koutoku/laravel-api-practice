<?php
namespace App\Services\Admin\AuthService\Exceptions;

use Exception;

class InvalidCredentialsException extends Exception
{
    public function __construct()
    {
        parent::__construct('ログイン情報が正しくありません。');
    }
}