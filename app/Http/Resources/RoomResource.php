<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'price_per_hour' => $this->price_per_hour,
            'consoles' => $this->consoles->map(fn($c) => [
                'id' => $c->id,
                'type' => $c->type
            ]),
            'files' => ImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
