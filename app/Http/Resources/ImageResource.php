<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $path = $this->image_path;

        // ambil file dari storage
        $file = Storage::get($path);

        return [
            'id' => $this->id,
            'image' => 'data:image/png;base64,' . base64_encode($file),
        ];
    }
}
