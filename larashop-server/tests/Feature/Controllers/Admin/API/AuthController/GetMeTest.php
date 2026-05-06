<?php

namespace Tests\Feature\Feature\Controllers\Admin\API\AuthController;

use App\Models\{AdminUser};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class GetMeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 正常系
     */
    public function test_get_me(): void
    {
        $adminUser = AdminUser::factory()->create();
        $response = $this->actingAs($adminUser, 'admin_api')->getJson('/admin/api/auth/me');

        $response->assertStatus(200)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->where('id', $adminUser->id)
                ->where('email', $adminUser->email)
                ->where('name', $adminUser->name)
        );
    }
}
