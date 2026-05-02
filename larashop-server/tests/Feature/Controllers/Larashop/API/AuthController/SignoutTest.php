<?php

namespace Tests\Feature\Feature\Controllers\Larashop\API\AuthController;

use App\Models\{User};
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SignoutTest extends TestCase
{
    use RefreshDatabase;

    /*
     * 正常系
     */
    public function test_signout()
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('test-password'),
        ]);
        $this->assertDatabaseCount('personal_access_tokens', 0);

        $loginResponse = $this->postJson('/larashop/api/auth/signin', [
            'email' => 'test@example.com',
            'password' => 'test-password',
        ]);
        $this->assertDatabaseCount('personal_access_tokens', 1);

        $accessToken = $loginResponse['access_token'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
        ])->postJson('/larashop/api/auth/signout');

        /*
         * ログアウトAPIを叩いたら /me APIにアクセスできなくなることをテストしたかったが
         * テスト実行環境の都合でログイン状態が保持されてしまいテストがうまくいかなかったという事情があったため
         * personal_access_tokens テーブルからアクセストークンが削除されていることをテストすることで代替する
         */
        $this->assertDatabaseCount('personal_access_tokens', 0);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
    }
}
