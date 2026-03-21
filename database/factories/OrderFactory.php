<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_number' => Str::upper(Str::random(10)),
            'status' => fake()->randomElement(['pending', 'paid', 'shipped', 'completed']),
            'total' => fake()->randomFloat(2, 20, 500),
        ];
    }
}
