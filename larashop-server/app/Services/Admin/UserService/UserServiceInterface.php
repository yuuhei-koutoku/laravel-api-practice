<?php

namespace App\Services\Admin\UserService;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface UserServiceInterface
{
    public function paginateByConditions(array $conditions, int $page, int $limit): LengthAwarePaginator;
    public function getPurchasedDeals(User $user): Collection;
    public function getListedDeals(User $user): Collection;
}