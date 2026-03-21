<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions, If you don’t clear it, new permissions might not work immediately
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view dashboard',
            'manage products',
            'manage orders',
            'manage users',
        ];

        //Loop to save them, ✔ Prevents duplicates
        //firstOrCreate() means: If permission exists → use it, If not → create it
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo($permissions);

        // Optionally create a customer role
        $customerRole = Role::firstOrCreate(['name' => 'customer']);
        // Customer might not need any permissions initially, Customers don’t have special backend permissions yet
    }
}
