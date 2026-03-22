<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create or update a test user
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ]
        );

        // 2. Create the three brands
        $brands = [
            ['name' => 'Kobe Bryant', 'slug' => 'kobe-bryant'],
            ['name' => 'Michael Jordan', 'slug' => 'michael-jordan'],
            ['name' => 'LeBron James', 'slug' => 'lebron-james'],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['slug' => $brand['slug']],
                ['name' => $brand['name']]
            );
        }

        // 3. Call other seeders (roles, permissions, users)
        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
        ]);
    }
}
