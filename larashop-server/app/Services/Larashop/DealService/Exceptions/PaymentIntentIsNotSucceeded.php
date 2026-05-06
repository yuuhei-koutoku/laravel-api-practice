<?php
namespace App\Services\Larashop\DealService\Exceptions;

use Exception;

class PaymentIntentIsNotSucceededException extends Exception
{
    public function __construct()
    {
        parent::__construct('決済処理が完了していません。');
    }
}