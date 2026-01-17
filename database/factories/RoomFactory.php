<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\Playstation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition()
    {
        return [
            'id' => (string) Str::uuid(),
            'name' => 'Room ' . $this->faker->word,
            'playstation_id' => Playstation::factory(),
            'price_per_hour' => $this->faker->randomFloat(2, 20000, 150000),
        ];
    }
}
