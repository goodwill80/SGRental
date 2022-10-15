<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $images = ['building', 'houses', 'huts', 'skyscrapper', 'apartments', 'rooms'];
        return [
            'name' => $this->faker->text(20),
            'description' => $this->faker->text(200),
            'category_id' => rand(1,4),
            'room_category_id' => rand(1,6),
            'user_id' => rand(1,5),
            'price' => rand(100, 10000),
            'thumbnail' => 'https://source.unsplash.com/random/?' . $images[rand(0, 5)]
        ];
    }
}
