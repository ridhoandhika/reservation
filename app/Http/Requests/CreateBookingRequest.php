<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class CreateBookingRequest extends FormRequest
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
            'room_id'               => ['required', 'uuid', 'exists:rooms,id'],
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'email'],
            'phone_number'          => ['string', 'max:13'],

            'slots'                 => ['required', 'array', 'min:1'],
            'slots.*.start_time'    => ['required', 'date'],
            'slots.*.end_time'      => ['required', 'date', 'after:slots.*.start_time'],
            'slots.*.price'         => ['required', 'numeric', 'min:0'],
        ];
    }

       // Optional: Define custom messages
    public function messages(): array
    {
       return [
            'slots.required' => 'Minimal 1 slot harus dipilih',
            'slots.*.end_time.after' => 'End time harus setelah start time',
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        Log::error('Booking creation failed', [
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
