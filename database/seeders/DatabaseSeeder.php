<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create or update a test user
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'email_verified_at' => now(),
                'password' => Hash::make('password'), // or bcrypt('password')
                'remember_token' => Str::random(10),
            ]
        );

        // Create 5 brands
        Brand::factory(5)->create();

        // Create 50 products (each with a random brand from those 5)
        Product::factory(50)->create();

        // Create 20 orders with 1-5 items each
        Order::factory(20)
            ->has(OrderItem::factory()->count(fake()->numberBetween(1,5)), 'items')
            ->create();

        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
            // ... other seeders you may have (brands, products, etc.)
        ]);
    }
}
