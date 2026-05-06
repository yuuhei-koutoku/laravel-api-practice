<?php

namespace App\Services\Admin\DealService;

use Illuminate\Pagination\LengthAwarePaginator;

interface DealServiceInterface
{
    public function paginateByConditions(array $conditions, int $page, int $limit): LengthAwarePaginator;
}