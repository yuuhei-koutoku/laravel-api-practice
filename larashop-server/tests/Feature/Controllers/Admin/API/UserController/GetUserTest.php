<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\UserController;

use App\Models\{AdminUser, Deal, DealEvent, Image, Product, User};
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetUserTest extends TestCase
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
    public function test_get_user(): void
    {
        $users = User::factory()->count(3)->state(new Sequence(
            ['name' => '山田太郎'],
            ['name' => '田中花子'],
            ['name' => '佐藤次郎']
        ))->create();

        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/users/' . $users->get(0)->id);
        $user = $users->get(0);
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

    /**
     * 存在しないIDの時
     */
    public function test_get_user_not_found(): void
    {
        $response = $this->actingAs($this->adminUser, 'admin_api')->getJson('/admin/api/users/0');

        $response->assertStatus(404);
    }
}
