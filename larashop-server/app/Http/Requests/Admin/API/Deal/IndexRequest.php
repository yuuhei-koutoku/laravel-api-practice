<?php

namespace App\Http\Requests\Admin\API\Deal;

use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'page' => 'integer|nullable',
            'limit' => 'integer|nullable',
            'keyword' => 'string|nullable',
            'min_price' => 'integer|nullable',
            'max_price' => 'integer|nullable',
            'status' => 'string|nullable',
        ];
    }
}
