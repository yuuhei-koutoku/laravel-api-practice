<?php

namespace App\Http\Resources\Admin\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Services\Admin\AuthService\Dtos\AccessToken */
class AccessTokenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'access_token' => $this->accessToken,
            'admin_user' => new AdminUserResource($this->adminUser)
        ];
    }
}
