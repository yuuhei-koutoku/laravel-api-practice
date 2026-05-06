<?php

namespace Database\Seeders\Production;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = [
          'email' => 'admin@larashop.com',
          'password' => Hash::make('larashop-production-password'),
          'name' => 'Larashop Admin',
        ];
        DB::table('admin_users')->insert($adminUser);
    }
}
