<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class CreateConsoleRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|max:255',
        ];
    }

    // Optional: Define custom messages
    public function messages(): array
    {
        return [
            'type.required' => 'A type is required',
            'type.string' => 'The type must be a string',
            'type.max' => 'The type may not be greater than 255 characters',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        Log::error('Playstation creation failed', [
            'message' => $validator->errors(),
            'time' => now()
        ]);
        throw new HttpResponseException(
            response()->json([
                'status' => 400,
                'message' => 'Bad Request',
            ], 200)
        );
    }
}
