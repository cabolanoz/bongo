<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        User::truncate();
        \DB::statement("SET foreign_key_checks=1");

        User::create([
            'name' => env('ADMIN_USER'),
            'email' => env('ADMIN_EMAIL'),
            'password' => \Hash::make(env('ADMIN_PASSWORD')),
            'is_admin' => true
        ]);
    }
}
