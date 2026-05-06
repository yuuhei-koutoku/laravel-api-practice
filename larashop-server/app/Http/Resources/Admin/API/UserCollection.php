<?php

namespace App\Http\Resources\Admin\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'users' => $this->collection,
        ];
    }

    /**
     * リソースのペジネーション情報のカスタマイズ
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array $paginated
     * @param  array $default
     * @return array
     */
    public function paginationInformation($request, $paginated, $default)
    {
        $paginationInformation = [
            'meta' => [
                'current_page' => $default['meta']['current_page'],
                'from' => $default['meta']['from'],
                'last_page' => $default['meta']['last_page'],
                'per_page' => $default['meta']['per_page'],
                'to' => $default['meta']['to'],
                'total' => $default['meta']['total'],
            ]
        ];

        return $paginationInformation;
    }
}
