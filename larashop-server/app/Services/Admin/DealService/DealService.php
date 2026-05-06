<?php

namespace App\Services\Admin\DealService;

use App\Models\Deal;
use Illuminate\Pagination\LengthAwarePaginator;


class DealService implements DealServiceInterface
{
    /*
     * Dealを条件に応じてページネーションして返す
     * 
     * @param array $conditions
     * @param array $conditions{keyword?: ?string, min_price?: ?int, max_price?: ?int, status?: ?string}
     * @param int $page
     * @param int $limit
     * @return LengthAwarePaginator
     */
    public function paginateByConditions(array $conditions, int $page, int $limit): LengthAwarePaginator
    {
        $query = Deal::query();

        if (isset($conditions['keyword'])) {
            $query->where(function ($query) use ($conditions) {
                $query->whereHas('product', function ($q) use ($conditions) {
                    $q->where('name', 'like', '%' . $conditions['keyword'] . '%');
                })->orWhereHas('seller', function ($q) use ($conditions) {
                    $q->where('name', 'like', '%' . $conditions['keyword'] . '%');
                })->orWhereHas('buyer', function ($q) use ($conditions) {
                    $q->where('name', 'like', '%' . $conditions['keyword'] . '%');
                });
            });
        }

        if (isset($conditions['min_price'])) {
            $query->whereHas('product', function ($q) use ($conditions) {
                $q->where('price', '>=', $conditions['min_price']);
            });
        }

        if (isset($conditions['max_price'])) {
            $query->whereHas('product', function ($q) use ($conditions) {
                $q->where('price', '<=', $conditions['max_price']);
            });
        }

        if (isset($conditions['status'])) {
            $query->where('status', $conditions['status']);
        }

        $paginator = $query->orderBy('id', 'desc')->paginate($limit, ['*'], 'page', $page);

        return $paginator;
    }
}
