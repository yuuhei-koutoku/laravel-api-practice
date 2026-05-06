<?php

namespace App\Services\Admin\UserService;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class UserService implements UserServiceInterface
{
    /*
     * Userを条件に応じてページネーションして返す
     * 
     * @param array $conditions{keyword?: ?string}
     * @param int $page
     * @param int $limit
     * @return LengthAwarePaginator
     */
    public function paginateByConditions(array $conditions, int $page, int $limit): LengthAwarePaginator
    {
        $query = User::query();

        if (isset($conditions['keyword'])) {
            $query->where('name', 'like', '%' . $conditions['keyword'] . '%');
        }

        $paginator = $query->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);

        return $paginator;
    }

    /*
     * Userが購入した取引のリストを返す
     * 
     * @param User $user
     * @return Collection<Deal>
     */
    public function getPurchasedDeals(User $user): Collection
    {
        return $user->dealsAsBuyer;
    }

    /*
     * Userが出品した取引のリストを返す
     * 
     * @param User $user
     * @return Collection<Deal>
     */
    public function getListedDeals(User $user): Collection
    {
        return $user->dealsAsSeller;
    }
    
}
