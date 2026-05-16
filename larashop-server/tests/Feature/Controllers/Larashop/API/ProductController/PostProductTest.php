<?php

namespace Tests\Feature\Feature\Controllers\Larashop\API\ProductController;

use App\Models\{Product, User};
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class PostProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 正常系
     */
    public function test_post_product(): void
    {
        // ユーザーを作成
        $user = User::factory()->create();

        // publicディスクへの保存を実ファイルではなくテスト用の仮ストレージに切り替え（テストがローカル環境を汚さない）
        Storage::fake('public');

        // リクエストボディを作成
        $data = [
            'name' => 'ABCバッグ',
            'description' => 'ABCバッグです。新品です。',
            'price' => 1234,
            'images' => [
                UploadedFile::fake()->image('image1.jpg'),
                UploadedFile::fake()->image('image2.jpg'),
                UploadedFile::fake()->image('image3.jpg')
            ],
        ];

        // productsが0レコードであることを確認
        $this->assertDatabaseCount('products', 0);

        // ログインした上で、出品APIを呼び出す
        $response = $this->actingAs($user)
                         ->postJson('/larashop/api/products', $data);

        // レスポンスが期待通りであることを確認
        $response->assertStatus(201)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->whereType('id', 'integer')
                ->where('name', $data['name'])
                ->where('description', $data['description'])
                ->whereType('image_url', 'string')
                ->whereType('image_urls', 'array')
                ->has('image_urls', 3) // 画像を3つ送信している
                ->where('price', $data['price'])
                ->whereType('deal.id', 'integer')
                ->where('deal.is_purchasable', true)
                ->where('deal.seller_info.id', $user->id)
                ->where('deal.seller_info.nickname', $user->nickname)
                ->where('deal.seller_info.profile_image_url', $user->present()->profileImageUrl)
                ->where('deal.seller_info.description', $user->description)
        );

        // productsが1レコード増えたことを確認
        $this->assertDatabaseCount('products', 1);

        // 中間テーブル経由で、商品に3件の画像が紐づいていることを確認
        $images = Product::first()->images;
        $this->assertCount(3, $images);

        // publicディスク（本番では通常 storage/app/public 相当）を参照（テストではfakeにより実ファイルは作られない）
        $disk = Storage::disk('public');
        foreach ($images as $image) {
            // 指定したパスに画像ファイルがあることを確認
            $disk->assertExists($image->file_path);
        }
    }

    /**
     * ニックネームが空白の場合は出品できない
     */
    public function test_post_product_nickname_is_empty(): void
    {
        Storage::fake('public');

        // ニックネームが空白のユーザーを作成
        $user = User::factory()->create([
            'nickname' => ''
        ]);

        $data = [
            'name' => 'ABCバッグ',
            'description' => 'ABCバッグです。新品です。',
            'price' => 1234,
            'images' => [
                UploadedFile::fake()->image('image1.jpg'),
                UploadedFile::fake()->image('image2.jpg'),
                UploadedFile::fake()->image('image3.jpg')
            ],
        ];

        // productsが0件であることを確認
        $this->assertDatabaseCount('products', 0);

        // ニックネームが空白のユーザーでログインし、出品APIを呼び出す
        $response = $this->actingAs($user)
                         ->postJson('/larashop/api/products', $data);

        // レスポンスが期待通りであることを確認
        $response->assertStatus(400);

        // productsが0件のままであることを確認
        $this->assertDatabaseCount('products', 0);
    }

    /**
     * バリデーションエラーの時
     */
    public function test_post_product_validation_error(): void
    {
        $user = User::factory()->create();

        // リクエストボディを空（入力必須項目がない）にして、出品APIを呼び出す
        $response = $this->actingAs($user)
                         ->postJson('/larashop/api/products', []);

        // レスポンスが期待通りであることを確認
        $response->assertStatus(422)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->has('message')
                ->has('errors', 4)
                ->has(
                    'errors.0',
                    fn ($json) => $json->where('field', 'name')
                        ->has('detail')
                )
                ->has(
                    'errors.1',
                    fn ($json) => $json->where('field', 'description')
                        ->has('detail')
                )
                ->has(
                    'errors.2',
                    fn ($json) => $json->where('field', 'price')
                        ->has('detail')
                )
                ->has(
                    'errors.3',
                    fn ($json) => $json->where('field', 'images')
                        ->has('detail')
                )
        );
    }
}
