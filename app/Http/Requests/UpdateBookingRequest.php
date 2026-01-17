<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_id' => 'sometimes|required|uuid|exists:rooms,id',
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'phone_number' => 'nullable|string|max:50',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after:start_time',
            'duration_minutes' => 'sometimes|required|integer|min:1',
            'price_per_hour' => 'sometimes|required|numeric|min:0',
            'total_price' => 'sometimes|required|numeric|min:0',
            'status' => 'nullable|string|in:pending,confirmed,cancelled',
        ];
    }
}
