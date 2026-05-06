<?php

namespace App\Http\Controllers\Admin\API;

use App\Models\Deal;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\API\Deal\IndexRequest;
use App\Http\Requests\Admin\API\Deal\ShowRequest;
use App\Http\Resources\Admin\API\DealCollection;
use App\Http\Resources\Admin\API\DealDetailResource;
use App\Services\Admin\DealService\DealServiceInterface;

class DealController extends Controller
{

    /**
    * @var DealServiceInterface
    */
    private $dealService;

    /**
     * @param  DealServiceInterface  $dealService
     * @return void
     */
    public function __construct(
        DealServiceInterface $dealService
    )
    {
        $this->dealService = $dealService;
    }

    /**
     * 取引一覧取得API
     *
     * @param  IndexRequest  $request
     * @return DealCollection
     */
    public function index(IndexRequest $request)
    {
        $params = $request->safe();

        $page = $params['page'] ?? 1;
        $limit = $params['limit'] ?? 10;
        $conditions = [
            'keyword' => $params['keyword'] ?? null,
            'min_price' => $params['min_price'] ?? null,
            'max_price' => $params['max_price'] ?? null,
            'status' => $params['status'] ?? null,
        ];

        $deals = $this->dealService->paginateByConditions($conditions, $page, $limit);

        return new DealCollection($deals);
    }


    /**
     * 取引詳得API
     *
     * @param  ShowRequest  $request
     * @return DealDetailResource
     */
    public function show(ShowRequest $request, Deal $deal)
    {
        $deal->load('dealEvents');
        return new DealDetailResource($deal);
    }
}
