<?php

namespace Database\Factories;

use App\Models\Playstation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PlaystationFactory extends Factory
{
    protected $model = Playstation::class;

    public function definition()
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => $this->faker->randomElement(['PS4', 'PS5']),
        ];
    }
}
