<?php

namespace Tests\Feature\Controllers\Larashop\API\MeListedProductController;

use App\Models\{Deal, DealEvent, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetListedProductsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 正常系
     */
    public function test_get_listed_products(): void
    {
        $buyer = User::factory()->create();
        $seller = User::factory()->create();
        $other = User::factory()->create();

        $products = Product::factory()->count(3)->create();

        $deals = Deal::factory()->count(3)->state(new Sequence(
            ['seller_id' => $seller->id, 'buyer_id' => $buyer->id, 'product_id' => $products[0]->id, 'status' => 'purchased'],
            ['seller_id' => $seller->id, 'buyer_id' => null, 'product_id' => $products[1]->id, 'status' => 'listing'],
            ['seller_id' => $other->id, 'buyer_id' => $buyer->id, 'product_id' => $products[2]->id, 'status' => 'listing']
        ))->create();

        $response = $this->actingAs($buyer)->getJson('/larashop/api/me/listed_products');
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) => $json->has('products', 0));

        $response = $this->actingAs($seller)->getJson('/larashop/api/me/listed_products');
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) => $json->has('products', 2));

        $response = $this->actingAs($other)->getJson('/larashop/api/me/listed_products');
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) => $json->has('products', 1));
    }
}
