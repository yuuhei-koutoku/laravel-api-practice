<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\UserController;

use App\Models\{AdminUser, Deal, DealEvent, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetUsersTest extends TestCase
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
    public function test_get_users(): void
    {
        $users = User::factory()->count(3)->state(new Sequence(
            ['name' => '山田太郎'],
            ['name' => '田中花子'],
            ['name' => '佐藤次郎']
        ))->create();

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/users');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data.users')
            ->assertJsonStructure([
                'data' => [
                    'users' => [
                        '*' => [
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
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/users?' . http_build_query([
            'keyword' => '山田',
        ]));
        $response->assertStatus(200)->assertJsonCount(1, 'data.users');

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/users?' . http_build_query([
            'keyword' => '鈴木',
        ]));
        $response->assertStatus(200)->assertJsonCount(0, 'data.users');
    }

    /**
     * データが0件の時
     */
    public function test_get_deals_length_zero(): void
    {
        $this->assertDatabaseCount('users', 0);

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/users');

        $response->assertStatus(200)
            ->assertJsonCount(0, 'data.users');
    }
}
