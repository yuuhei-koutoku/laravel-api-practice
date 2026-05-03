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
        $user = User::factory()->create();
        Storage::fake('public');

        $profileImage = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->actingAs($user)->putJson('/larashop/api/me', [
            'name' => 'test-name',
            'postal_code' => '1008112',
            'address' => '東京都千代田区千代田2-2',
            'tel' => '0312345679',
            'nickname' => 'じろう',
            'description' => 'こんにちは、山田次郎です。',
            'profile_image' => $profileImage,
        ]);

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

        $user->refresh();
        $this->assertEquals($user->name, 'test-name');
        $this->assertEquals($user->postal_code, '1008112');
        $this->assertEquals($user->address, '東京都千代田区千代田2-2');
        $this->assertEquals($user->tel, '0312345679');
        $this->assertEquals($user->nickname, 'じろう');
        $this->assertEquals($user->description, 'こんにちは、山田次郎です。');

        /** @var \Illuminate\Filesystem\FilesystemAdapter $storageDisk */
        $storageDisk = Storage::disk('public');
        $storageDisk->assertExists('images/'.$profileImage->hashName());

    }

    /*
     * リクエストボディが空の場合
     */
    public function test_put_me_empty_data()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson('/larashop/api/me', []);

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
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson('/larashop/api/me', [
            'name' => null,
            'postal_code' => '100-8112',
            'address' =>null,
            'tel' => '03-1234-5679',
            'nickname' => null,
            'description' => null,
        ]);

        $response->assertStatus(422)
        ->assertJson(
            fn (AssertableJson $json) =>
            $json->has('message')
                ->has('errors', 6)
        );
    }
}
