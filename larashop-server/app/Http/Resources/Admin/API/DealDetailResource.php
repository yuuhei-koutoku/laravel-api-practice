<?php

namespace App\Http\Resources\Admin\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Deal */
class DealDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product' => new ProductResource($this->product),
            'seller' => new UserResource($this->seller),
            'buyer' => new UserResource($this->buyer),
            'status' => $this->status,
            'deal_events' => DealEventResource::collection($this->whenLoaded('dealEvents')),
        ];
    }
}
