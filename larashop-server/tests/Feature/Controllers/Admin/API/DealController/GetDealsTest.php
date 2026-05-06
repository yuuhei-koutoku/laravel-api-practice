<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\DealController;

use App\Models\{AdminUser, Deal, DealEvent, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetDealsTest extends TestCase
{
    use RefreshDatabase;

    protected $adminUser;

    public function setUp(): void
    {
        parent::setUp();

        $this->adminUser = AdminUser::factory()->create();
    }

    /**
     * 正常系
     */
    public function test_get_deals(): void
    {
        $buyer = User::factory()->state(['name' => '山田太郎'])->create();
        $seller = User::factory()->state(['name' => '田中花子'])->create();
        $seller2 = User::factory()->state(['name' => '佐藤次郎'])->create();

        $products = Product::factory()->count(3)->state(new Sequence(
            ['name' => 'マグカップ', 'price' => 1000],
            ['name' => '財布', 'price' => 2000],
            ['name' => 'かばん', 'price' => 5000],
        ))->create();

        $deals = Deal::factory()->count(3)->state(new Sequence(
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[0]->id, 'status' => 'purchased'],
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[1]->id, 'status' => 'canceled'],
            ['seller_id' => $seller2->id, 'buyer_id' => $buyer->id, 'product_id' => $products[2]->id, 'status' => 'completed']
        ))->create();

        $deals->each(function($deal) use ($seller) {
            DealEvent::factory()->for($deal)->for($seller, 'deal_eventable')->create(['actor_type' => 'seller', 'event_type' => 'listing']);
        });

        DealEvent::factory()->for($deals[0])->for($buyer, 'deal_eventable')->create(['actor_type' => 'buyer', 'event_type' => 'purchase']);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data.deals')
            ->assertJsonStructure([
                'data' => [
                    'deals' => [
                        '*' => [
                            'id',
                            'product' => [
                                'id',
                                'name',
                                'description',
                                'image_url',
                                'image_urls',
                                'price',
                            ],
                            'seller' => [
                                'id',
                                'email',
                                'name',
                                'postal_code',
                                'address',
                                'tel',
                                'nickname',
                                'profile_image_url',
                                'description',
                            ],
                            'buyer' => [
                                'id',
                                'email',
                                'name',
                                'postal_code',
                                'address',
                                'tel',
                                'nickname',
                                'profile_image_url',
                                'description',
                            ],
                            'status',
                        ],
                    ],
                ],
                'meta' => [
                    'current_page',
                    'from',
                    'last_page',
                    'per_page',
                    'to',
                    'total',
                ],
            ]);


        // 検索フィルターのテスト

        // keyword
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'keyword' => '山田',
        ]));
        $response->assertStatus(200)->assertJsonCount(3, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'keyword' => 'マグカップ',
        ]));
        $response->assertStatus(200)->assertJsonCount(1, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'keyword' => 'ペン',
        ]));
        $response->assertStatus(200)->assertJsonCount(0, 'data.deals');

        // min_price, max_price
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'min_price' => 2000,
        ]));
        $response->assertStatus(200)->assertJsonCount(2, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'min_price' => 5001,
        ]));
        $response->assertStatus(200)->assertJsonCount(0, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'max_price' => 1999,
        ]));
        $response->assertStatus(200)->assertJsonCount(1, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'max_price' => 999,
        ]));
        $response->assertStatus(200)->assertJsonCount(0, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'min_price' => 1500,
            'max_price' => 2500,
        ]));
        $response->assertStatus(200)->assertJsonCount(1, 'data.deals');

        // status
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'status' => 'purchased',
        ]));
        $response->assertStatus(200)->assertJsonCount(1, 'data.deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals?' . http_build_query([
            'status' => 'listing',
        ]));
        $response->assertStatus(200)->assertJsonCount(0, 'data.deals');
    }

    /**
     * データが0件の時
     */
    public function test_get_deals_length_zero(): void
    {
        $this->assertDatabaseCount('deals', 0);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals');

        $response->assertStatus(200)
            ->assertJsonCount(0, 'data.deals');
    }
}
