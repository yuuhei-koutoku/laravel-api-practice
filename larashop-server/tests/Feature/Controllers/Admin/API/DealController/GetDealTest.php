<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\DealController;

use App\Models\{AdminUser, Deal, DealEvent, Image, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetDealTest extends TestCase
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
    public function test_get_deal(): void
    {
        $buyer = User::factory()->create();
        $seller = User::factory()->create();
        $products = Product::factory()->count(3)->create();
        $images = Image::factory()->count(3)->create();
        $products->each(function ($product, $index) use ($images) {
            $product->images()->attach($images[$index]);
        });

        $deals = Deal::factory()->count(3)->state(new Sequence(
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[0]->id, 'status' => 'purchased'],
            ['seller_id' => $seller->id, 'buyer_id' => null, 'product_id' => $products[1]->id, 'status' => 'listing'],
            ['seller_id' => $seller->id, 'buyer_id' => null, 'product_id' => $products[2]->id, 'status' => 'listing']
        ))->create();

        $deals->each(function($deal) use ($seller) {
            DealEvent::factory()->for($deal)->for($seller, 'deal_eventable')->create(['actor_type' => 'seller', 'event_type' => 'listing']);
        });
        DealEvent::factory()->for($deals[0])->for($buyer, 'deal_eventable')->create(['actor_type' => 'buyer', 'event_type' => 'purchase']);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals/' . $deals->get(0)->id);
        $deal = $deals->get(0);
        $response->assertStatus(200)
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->where('id', $deal->id)

                    ->where('product.name', $deal->product->name)
                    ->where('product.description', $deal->product->description)
                    ->whereType('product.image_url', 'string') 
                    ->whereType('product.image_urls', 'array')
                    ->where('product.price', $deal->product->price)

                    ->where('seller.id', $deal->seller->id)
                    ->where('seller.email', $deal->seller->email)
                    ->where('seller.name', $deal->seller->name)
                    ->where('seller.postal_code', $deal->seller->postal_code)
                    ->where('seller.address', $deal->seller->address)
                    ->where('seller.tel', $deal->seller->tel)
                    ->where('seller.nickname', $deal->seller->nickname)
                    ->where('seller.profile_image_url', $deal->seller->present()->profileImageUrl)
                    ->where('seller.description', $deal->seller->description)

                    ->where('buyer.id', $deal->buyer->id)
                    ->where('buyer.email', $deal->buyer->email)
                    ->where('buyer.name', $deal->buyer->name)
                    ->where('buyer.postal_code', $deal->buyer->postal_code)
                    ->where('buyer.address', $deal->buyer->address)
                    ->where('buyer.tel', $deal->buyer->tel)
                    ->where('buyer.nickname', $deal->buyer->nickname)
                    ->where('buyer.profile_image_url', $deal->buyer->present()->profileImageUrl)
                    ->where('buyer.description', $deal->buyer->description)

                    ->where('status', $deal->status->value)
                    ->whereType('deal_events', 'array')
        );

        // まだ購入者がいない取引の場合
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals/' . $deals->get(1)->id);
        $response->assertStatus(200)
            ->assertJsonPath('id', $deals->get(1)->id)
            ->assertJsonPath('buyer', null);
    }

    /**
     * 存在しないIDの時
     */
    public function test_get_deal_not_found(): void
    {
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/deals/0');

        $response->assertStatus(404);
    }
}
