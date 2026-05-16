<?php

namespace Tests\Feature\Feature\Controllers\Larashop\API\AuthController;

use App\Models\{User};
use App\Notifications\Larashop\SignupVerify;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

/*
 * 会員仮登録API
 */
class SignupTest extends TestCase
{
    use RefreshDatabase;

    /*
     * 正常系
     */
    public function test_signup()
    {
        // 通知が送られるのを防ぐ（テストなのでメール送信しない）
        Notification::fake();

        // ユーザーがまだ作成されていないことを確認
        $this->assertDatabaseMissing('users', [
            'email' => 'test@example.com',
        ]);

        // 会員仮登録APIを呼び出す
        $response = $this->postJson('/larashop/api/auth/signup', [
            'email' => 'test@example.com',
            'password' => 'test-password',
        ]);

        // 通知が指定したユーザーへ送られたことを宣言
        Notification::assertSentTo(
            [User::first()],
            SignupVerify::class
        );

        // レスポンスが期待通りであることを確認
        $response->assertStatus(201)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->where('success', true)
        );

        // ユーザーが作成されたことを確認
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'email_verified_at' => null,
        ]);
    }

    /*
     * メールアドレス重複のケース
     */
    public function test_signup_duplicated_email()
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        // ユーザーが作成されていることを確認
        $this->assertDatabaseCount('users', 1);

        // 既に登録されているメールアドレスで会員仮登録APIを呼び出す
        $response = $this->postJson('/larashop/api/auth/signup', [
            'email' => 'test@example.com',
            'password' => 'test-password',
        ]);

        // バリデーションエラーが発生したことを確認
        $response->assertStatus(422);

        // ユーザーが作成されていないことを確認
        $this->assertDatabaseCount('users', 1);
    }

    /*
     * バリデーションエラー
     */
    public function test_signup_validation_error()
    {
        // メールアドレスもパスワードも未入力で会員仮登録APIを呼び出す
        $response = $this->postJson('/larashop/api/auth/signup', []);

        // バリデーションエラーが発生したことを確認
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

        // ユーザーが作成されていないことを確認
        $this->assertDatabaseCount('users', 0);
    }
}
