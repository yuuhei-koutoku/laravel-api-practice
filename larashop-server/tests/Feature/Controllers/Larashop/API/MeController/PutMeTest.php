<?php

namespace Tests\Feature\Feature\Controllers\Larashop\API\MeController;

use App\Models\{User};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class PutMeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 正常系
     */
    public function test_put_me(): void
    {
        // ユーザーを作成
        $user = User::factory()->create();

        // publicディスクへの保存を実ファイルではなくテスト用の仮ストレージに切り替え（テストがローカル環境を汚さない）
        Storage::fake('public');
        // ダミーの画像ファイルを生成
        $profileImage = UploadedFile::fake()->image('avatar.jpg');

        // ログイン認証を行った上で、ログインユーザー情報更新APIを呼び出す
        $response = $this->actingAs($user)->putJson('/larashop/api/me', [
            'name' => 'test-name',
            'postal_code' => '1008112',
            'address' => '東京都千代田区千代田2-2',
            'tel' => '0312345679',
            'nickname' => 'じろう',
            'description' => 'こんにちは、山田次郎です。',
            'profile_image' => $profileImage,
        ]);

        // レスポンスが期待通りであることを確認
        $response->assertStatus(200)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->where('id', $user->id)
                ->where('email', $user->email)
                ->where('name', 'test-name')
                ->where('postal_code', '1008112')
                ->where('address', '東京都千代田区千代田2-2')
                ->where('tel', '0312345679')
                ->where('nickname', 'じろう')
                ->where('profile_image_url', $user->present()->profileImageUrl)
                ->where('description', 'こんにちは、山田次郎です。')
        );

        // DBから最新状態を取り直す
        $user->refresh();

        // 各カラムが想定通りに更新されたことを確認
        $this->assertEquals($user->name, 'test-name');
        $this->assertEquals($user->postal_code, '1008112');
        $this->assertEquals($user->address, '東京都千代田区千代田2-2');
        $this->assertEquals($user->tel, '0312345679');
        $this->assertEquals($user->nickname, 'じろう');
        $this->assertEquals($user->description, 'こんにちは、山田次郎です。');

        // 画像がpublicディスクのimages/配下に、Laravelが付けるハッシュ名で保存されたことを検証
        /** @var \Illuminate\Filesystem\FilesystemAdapter $storageDisk */
        $storageDisk = Storage::disk('public');
        $storageDisk->assertExists('images/'.$profileImage->hashName());

    }

    /*
     * リクエストボディが空の場合
     */
    public function test_put_me_empty_data()
    {
        // ユーザーを作成
        $user = User::factory()->create();

        // ログイン認証を行った上で、ログインユーザー情報更新APIを呼び出す
        // マイページのUIを踏まえると、全ての任意項目となる（必須項目ではない）
        $response = $this->actingAs($user)->putJson('/larashop/api/me', []);

        // レスポンスが期待通りであることを確認
        $response->assertStatus(200)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->where('id', $user->id)
                ->where('email', $user->email)
                ->where('name', $user->name)
                ->where('postal_code', $user->postal_code)
                ->where('address', $user->address)
                ->where('tel', $user->tel)
                ->where('nickname', $user->nickname)
                ->where('profile_image_url', $user->present()->profileImageUrl)
                ->where('description', $user->description)
        );
    }

    /*
     * バリデーションエラー
     */
    public function test_put_me_validation_error()
    {
        // ユーザーを作成
        $user = User::factory()->create();

        // ログイン認証を行った上で、ログインユーザー情報更新APIを呼び出す
        // フォームリクエストでは、sometimes（リクエストにキーが含まれる時だけ、ルールを設ける）を実装
        $response = $this->actingAs($user)->putJson('/larashop/api/me', [
            'name' => null,
            'postal_code' => '100-8112',
            'address' => null,
            'tel' => '03-1234-5679',
            'nickname' => null,
            'description' => null,
        ]);

        // レスポンスが期待通りであることを確認
        $response->assertStatus(422)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->has('message')
                ->has('errors', 6)
        );
    }
}
