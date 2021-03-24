<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Commercial;

class CommercialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Commercial::truncate();
        \DB::statement("SET foreign_key_checks=1");

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 4; $i++)
        {
            Commercial::create([
                'name' => $faker->name,
                'desktop_picture' => 'https://source.unsplash.com/random/1280x130',
                'mobile_picture' => 'https://source.unsplash.com/random/600x200',
                'picture_url' => $faker->url,
                'start_date' => \Carbon\Carbon::now()->subDays(30),
                'end_date' => null,
                'created_by' => 1,
            ]);
        }
    }
}
