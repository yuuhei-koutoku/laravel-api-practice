<?php

namespace App\Services\Admin\AuthService;

use App\Models\AdminUser;
use App\Services\Admin\Dtos\OperationResult;
use App\Services\Admin\AuthService\Dtos\AccessToken;
use App\Services\Admin\AuthService\Exceptions\InvalidCredentialsException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService implements AuthServiceInterface
{

    const API_TOKEN_NAME = 'adminApiAccessToken';

    /**
     * ログインする＝ログイン情報が正しければアクセストークンを返す
     *
     * @param  string  $email
     * @param  string  $password
     * @exception InvalidCredentialsException
     * @return AccessToken
     */
    public function signin(string $email, string $password): AccessToken
    {
        $adminUser = AdminUser::where('email', $email)->first();

        if (!$adminUser || !Hash::check($password, $adminUser->password)) {
            throw new InvalidCredentialsException();
        }
    
        $plainTextToken = $adminUser->createToken(self::API_TOKEN_NAME)->plainTextToken;
    
        return new AccessToken($plainTextToken, $adminUser);
    }

    /**
     * ログアウトする＝ユーザーの発行済みアクセストークンを削除する
     * 
     * @return OperationResult
     */
    public function signout(): OperationResult
    {
        if (!Auth::check()) {
            return new OperationResult(false);
        }

        /** @var \App\Models\AdminUser $adminUser **/
        $adminUser = Auth::user();
        $adminUser->tokens()->delete();

        return new OperationResult(true);
    }
}
