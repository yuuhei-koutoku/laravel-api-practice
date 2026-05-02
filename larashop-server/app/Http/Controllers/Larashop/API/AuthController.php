<?php

namespace App\Http\Controllers\Larashop\API;

use App\Exceptions\APIBusinessLogicException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Larashop\API\Auth\SignupRequest;
use App\Http\Requests\Larashop\API\Auth\SignupVerifyRequest;
use App\Http\Requests\Larashop\API\Auth\SigninRequest;
use App\Http\Requests\Larashop\API\Auth\SignoutRequest;
use App\Http\Resources\Larashop\API\AccessTokenResource;
use App\Http\Resources\Larashop\API\OperationResultResource;
use App\Services\Larashop\AuthService\AuthServiceInterface;
use App\Services\Larashop\AuthService\Exceptions\InvalidCredentialsException;
use App\Services\Larashop\AuthService\Exceptions\InvalidSignatureException;
use App\Services\Larashop\AuthService\Exceptions\UserAlreadyVerifiedException;

class AuthController extends Controller
{

    /**
    * @var AuthServiceInterface
    */
    private $authService;

    /**
     * @param  AuthServiceInterface $authService
     * @return void
     */
    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    /**
     * 会員仮登録API
     *
     * @param  SignupRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function signup(SignupRequest $request)
    {
        $params = $request->safe()->toArray();
        $email = $params['email'];
        $password = $params['password'];
        $operationResult = $this->authService->signup($email, $password);

        return (new OperationResultResource($operationResult))->response()->setStatusCode(201);
    }
}
