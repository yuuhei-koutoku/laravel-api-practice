<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\AuthController;

use App\Models\{AdminUser};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/*
 * ログインAPI
 */
class SigninTest extends TestCase
{
    use RefreshDatabase;

    /*
     * 正常系
     */
    public function test_signin()
    {
        $adminUser = AdminUser::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('test-password'),
        ]);

        $response = $this->postJson('/admin/api/auth/signin', [
            'email' => 'test@example.com',
            'password' => 'test-password',
        ]);

        $response->assertStatus(200)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->whereType('access_token', 'string')
                ->where('admin_user.id', $adminUser->id)
                ->where('admin_user.email', $adminUser->email)
                ->where('admin_user.name', $adminUser->name)
        );
        $accessToken = $response['access_token'];

        $response = $this->getJson('/admin/api/auth/me', [
            'Authorization' => 'Bearer ' . $accessToken,
        ]);
        $response->assertStatus(200)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->where('id', $adminUser->id)
                ->where('email', $adminUser->email)
                ->where('name', $adminUser->name)
        );

    }

    /*
     * ログイン情報が誤っているケース
     */
    public function test_signin_invalid_info()
    {
        $adminUser = AdminUser::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('test-password'),
        ]);

        // メールアドレスが誤っている
        $response = $this->postJson('/admin/api/auth/signin', [
            'email' => 'test-invalid@example.com',
            'password' => 'test-password',
        ]);
        $response->assertStatus(400);

        // パスワードが誤っている
        $response = $this->postJson('/admin/api/auth/signin', [
            'email' => 'test@example.com',
            'password' => 'invalid-password',
        ]);
        $response->assertStatus(400);
    }

    /*
     * バリデーションエラー
     */
    public function test_signin_validation_error()
    {
        $response = $this->postJson('/admin/api/auth/signin', []);

        $response->assertStatus(422)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->has('message')
                ->has('errors', 2)
                ->has(
                    'errors.0',
                    fn ($json) => $json->where('field', 'email')
                        ->has('detail')
                )
                ->has(
                    'errors.1',
                    fn ($json) => $json->where('field', 'password')
                        ->has('detail')
                )
        );
    } 
}