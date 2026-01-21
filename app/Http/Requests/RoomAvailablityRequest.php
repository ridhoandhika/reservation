<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class RoomAvailablityRequest extends FormRequest
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
            'date'     => 'required|date',
            'duration' => 'nullable|integer|min:60',
            'interval' => 'nullable|integer|min:5',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        Log::error('Room availability request failed', [
            'message' => $validator->errors(),
            'time' => now()
        ]);
        throw new HttpResponseException(
            response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ], 200)
        );
    }
}
