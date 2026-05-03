<?php
namespace App\Services\Larashop\AuthService\Exceptions;

use Exception;

class UserNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct('ユーザーが見つかりません。');
    }
}