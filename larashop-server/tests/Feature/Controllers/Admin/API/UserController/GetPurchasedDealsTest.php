<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\DealController;

use App\Models\{AdminUser, Deal, DealEvent, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetPurchasedDealsTest extends TestCase
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
    public function test_get_purchased_deals(): void
    {
        $buyer = User::factory()->state(['name' => '山田太郎'])->create();
        $seller = User::factory()->state(['name' => '田中花子'])->create();
        $seller2 = User::factory()->state(['name' => '佐藤次郎'])->create();

        $products = Product::factory()->count(3)->create();

        $deals = Deal::factory()->count(3)->state(new Sequence(
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[0]->id, 'status' => 'purchased'],
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[1]->id, 'status' => 'canceled'],
            ['seller_id' => $seller2->id, 'buyer_id' => $buyer->id, 'product_id' => $products[2]->id, 'status' => 'completed']
        ))->create();

        $deals->each(function($deal) use ($seller) {
            DealEvent::factory()->for($deal)->for($seller, 'deal_eventable')->create(['actor_type' => 'seller', 'event_type' => 'listing']);
        });

        DealEvent::factory()->for($deals[0])->for($buyer, 'deal_eventable')->create(['actor_type' => 'buyer', 'event_type' => 'purchase']);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson("/admin/api/users/{$buyer->id}/purchased_deals");

        $response->assertStatus(200)
            ->assertJsonCount(3, 'deals')
            ->assertJsonStructure([
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
            ]);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson("/admin/api/users/{$seller->id}/purchased_deals");
        $response->assertStatus(200)
            ->assertJsonCount(0, 'deals');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson("/admin/api/users/{$seller2->id}/purchased_deals");
        $response->assertStatus(200)
            ->assertJsonCount(0, 'deals');

    }

    /**
     * データが0件の時
     */
    public function test_get_deals_length_zero(): void
    {
        $buyer = User::factory()->state(['name' => '山田太郎'])->create();
        $this->assertDatabaseCount('deals', 0);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson("/admin/api/users/{$buyer->id}/purchased_deals");

        $response->assertStatus(200)
            ->assertJsonCount(0, 'deals');
    }
}
