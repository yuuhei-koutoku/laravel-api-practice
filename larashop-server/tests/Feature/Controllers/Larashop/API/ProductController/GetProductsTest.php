<?php

namespace Tests\Feature\Feature\Controllers\Larashop\API\ProductController;

use App\Models\{Deal, DealEvent, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetProductsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 正常系
     */
    public function test_get_products(): void
    {
        $buyer = User::factory()->create();
        $seller = User::factory()->create();

        // 3件のProductを作成
        $products = Product::factory()->count(3)->create();

        // 3件のDealを作成
        $deals = Deal::factory()->count(3)->state(new Sequence(
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[0]->id, 'status' => 'purchased'],
            ['seller_id' => $seller->id, 'buyer_id' => null, 'product_id' => $products[1]->id, 'status' => 'listing'],
            ['seller_id' => $seller->id, 'buyer_id' => null, 'product_id' => $products[2]->id, 'status' => 'listing']
        ))->create();

        $deals->each(function($deal) use ($seller) {
            // 3つのDealそれぞれに、出品者による出品ログ（DealEvent）を1つずつ紐づける
            // `->for($seller, 'deal_eventable')`では、deal_eventable_typeとdeal_eventable_idの両方をセット
            DealEvent::factory()->for($deal)->for($seller, 'deal_eventable')->create(['actor_type' => 'seller', 'event_type' => 'listing']);
        });

        // 1つ目のDealに、購入者による購入イベントを1つ追加する
        DealEvent::factory()->for($deals[0])->for($buyer, 'deal_eventable')->create(['actor_type' => 'buyer', 'event_type' => 'purchase']);

        // 商品一覧取得APIを呼び出す
        $response = $this->getJson('/larashop/api/products');

        // レスポンスが期待通りであることを確認
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) => $json->has('products', 3))
            ->assertJsonStructure([
                'products' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'image_url',
                        'image_urls',
                        'price',
                        'deal' => [
                            'id',
                            'is_purchasable',
                            'seller_info' => [
                                'id',
                                'nickname',
                                'profile_image_url',
                                'description',
                            ],
                        ],
                    ],
                ],
            ]);
    }

    /**
     * データが0件の時
     */
    public function test_get_products_length_zero(): void
    {
        $this->assertDatabaseCount('products', 0);

        $response = $this->getJson('/larashop/api/products');

        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) => $json->has('products', 0));
    }
}
