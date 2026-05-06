<?php

namespace App\Http\Controllers\Admin\API;

use App\Exceptions\APIBusinessLogicException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\API\Auth\SigninRequest;
use App\Http\Requests\Admin\API\Auth\SignoutRequest;
use App\Http\Requests\Admin\API\Auth\GetMeRequest;
use App\Http\Resources\Admin\API\AccessTokenResource;
use App\Http\Resources\Admin\API\AdminUserResource;
use App\Http\Resources\Admin\API\OperationResultResource;
use App\Services\Admin\AuthService\AuthServiceInterface;
use App\Services\Admin\AuthService\Exceptions\InvalidCredentialsException;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /**
    * @var AuthServiceInterface
    */
    private $authService;

    /**
     * @param  AuthServiceInterface  $authService
     * @return void
     */
    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    /**
     * ログインAPI
     * 
     * @param  SigninRequest  $request
     * @return AccessTokenResource
     */
    public function signin(SigninRequest $request)
    {
        $params = $request->safe()->toArray();
        $email = $params['email'];
        $password = $params['password'];

        try {
            $accessToken = $this->authService->signin($email, $password);
        } catch (InvalidCredentialsException $e) {
            throw new APIBusinessLogicException($e->getMessage(), 400);
        }

        return new AccessTokenResource($accessToken);
    }

    /**
     * ログアウトAPI
     * 
     * @return OperationResultResource
     */
    public function signout(SignoutRequest $request)
    {
        $operationResult = $this->authService->signout();

        return new OperationResultResource($operationResult);
    }

    /**
     * ログインユーザー情報取得API
     * 
     * @param  GetMeRequest  $request
     * @return AdminUserResource
     */
    public function getMe(GetMeRequest $request)
    {
        $adminUser = Auth::user();

        return new AdminUserResource($adminUser);
    }
}