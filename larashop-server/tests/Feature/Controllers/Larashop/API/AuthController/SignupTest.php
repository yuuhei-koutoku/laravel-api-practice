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
        Notification::fake();

        // ユーザーがまだ作成されていないことを確認
        $this->assertDatabaseMissing('users', [
            'email' => 'test@example.com',
        ]);

        $response = $this->postJson('/larashop/api/auth/signup', [
            'email' => 'test@example.com',
            'password' => 'test-password',
        ]);

        Notification::assertSentTo(
            [User::first()],
            SignupVerify::class
        );

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
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $response = $this->postJson('/larashop/api/auth/signup', [
            'email' => 'test@example.com',
            'password' => 'test-password',
        ]);

        $response->assertStatus(422);
    }

    /*
     * バリデーションエラー
     */
    public function test_signup_validation_error()
    {
        $response = $this->postJson('/larashop/api/auth/signup', []);

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
