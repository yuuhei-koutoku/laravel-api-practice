<?php

namespace Database\Seeders\Local;

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
          'email' => 'test@example.com',
          'password' => Hash::make('password'),
          'name' => 'Larashop Admin',
        ];
        DB::table('admin_users')->insert($adminUser);
    }
}
