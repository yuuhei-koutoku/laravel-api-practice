<?php

namespace App\Http\Controllers\Admin\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\API\User\GetListedDealsRequest;
use App\Http\Requests\Admin\API\User\GetPurchasedDealsRequest;
use App\Http\Requests\Admin\API\User\IndexRequest;
use App\Http\Requests\Admin\API\User\ShowRequest;
use App\Http\Resources\Admin\API\DealCollection;
use App\Http\Resources\Admin\API\UserCollection;
use App\Http\Resources\Admin\API\UserResource;
use App\Services\Admin\UserService\UserServiceInterface;

class UserController extends Controller
{

    /**
    * @var UserServiceInterface
    */
    private $userService;

    /**
     * @param  UserServiceInterface  $userService
     * @return void
     */
    public function __construct(
        UserServiceInterface $userService
    )
    {
        $this->userService = $userService;
    }

    /**
     * ユーザー一覧取得API
     * 
     * @param  IndexRequest  $request
     * @return UserCollection
     */
    public function index(IndexRequest $request)
    {
        $params = $request->safe();

        $page = $params['page'] ?? 1;
        $limit = $params['limit'] ?? 10;
        $conditions = [
            'keyword' => $params['keyword'] ?? null,
        ];
        $users = $this->userService->paginateByConditions($conditions, $page, $limit);

        return new UserCollection($users);
    }

    /**
     * ユーザー詳得API
     * 
     * @param  ShowRequest  $request
     * @return UserResource
     */
    public function show(ShowRequest $request, User $user)
    {
        return new UserResource($user);
    }

    /**
     * ユーザー購入取引一覧API
     * 
     * @param  GetPurchasedDealsRequest  $request
     * @return DealCollection
     */
    public function getPurchasedDeals(GetPurchasedDealsRequest $request, User $user)
    {
        $deals = $this->userService->getPurchasedDeals($user);

        return new DealCollection($deals);
    }

    /**
     * ユーザー出品取引一覧API
     * 
     * @param  GetListedDealsRequest  $request
     * @return DealCollection
     */
    public function getListedDeals(GetListedDealsRequest $request, User $user)
    {
        $deals = $this->userService->getListedDeals($user);

        return new DealCollection($deals);
    }
}
