<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Spectacle;

class SpectacleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Spectacle::truncate();
        \DB::statement("SET foreign_key_checks=1");

        $faker = \Faker\Factory::create();
        $types = array('promenade', 'chitchat');

        for ($i = 0; $i < 100; $i++)
        {
            Spectacle::create([
                'title' => $faker->name,
                'description' => $faker->realText($maxNbChars = rand(200, 400), $indexSize = 2),
                'author' => $faker->name,
                'desktop_asset' => 'https://source.unsplash.com/random/1280x800?sig=' . $i,
                'mobile_asset' => 'https://source.unsplash.com/random/400x300?sig=' . $i,
                'start_date' => \Carbon\Carbon::now(),
                'end_date' => \Carbon\Carbon::now(),
                'type' => $types[array_rand($types, 1)],
                'category_id' => rand(1, 7),
                'published' => true,
                'created_by' => 1,
            ]);
        }
    }
}
