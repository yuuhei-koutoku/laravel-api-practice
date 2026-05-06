<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Seeders\Production\AdminUserTableSeeder as ProductionAdminUserTableSeeder;

use Database\Seeders\Local\AdminUserTableSeeder as LocalAdminUserTableSeeder;

use Database\Seeders\Development\AdminUserTableSeeder as DevelopmentAdminUserTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (app()->isProduction()) {
            $this->call(ProductionAdminUserTableSeeder::class);
        } elseif (app()->isLocal()) {
            $this->call(LocalAdminUserTableSeeder::class);
        } else {
            $this->call(DevelopmentAdminUserTableSeeder::class);

        }
    }
}
