<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class UpdateRoomRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'price_per_hour' => 'required|numeric|min:0',
            'playstation_id' => 'nullable|uuid|exists:playstations,id',

            'type' => 'required|string|in:reguler,vip,vvip',
            'consoles' => 'nullable|array', // opsional
            'consoles.*' => 'uuid|exists:consoles,id',
            'images' => 'nullable|array|max:5', // max 5 images (opsional)
            'images.*' => ['string', function ($attribute, $value, $fail) {
                $this->validateBase64Image($value, $fail);
            }],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        Log::error('Room creation failed', [
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

    private function validateBase64Image(string $base64, callable $fail): void
    {
       
        // kalau string kosong, skip
        if (empty($base64)) {
            return;
        }

        if (! preg_match('/^data:image\/(jpg|jpeg|png|webp);base64,/', $base64)) {
            $fail('Image must be a valid base64 image (jpg, jpeg, png, webp).');
            return;
        }
 
        $image = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $decoded = base64_decode($image, true);

        if ($decoded === false) {
            $fail('Invalid base64 image.');
            return;
        }

        // max 2MB
        if (strlen($decoded) > 2 * 1024 * 1024) {
            $fail('Image size must not exceed 2MB.');
            return;
        }

        // pastikan benar-benar image
        if (! @getimagesizefromstring($decoded)) {
            $fail('Invalid image content.');
        }
    }
}
