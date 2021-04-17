<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Chitchat;

class ChitchatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Chitchat::truncate();
        \DB::statement("SET foreign_key_checks=1");

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++)
        {
            $chitchat = Chitchat::create([
                'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'description' => $faker->realText($maxNbChars = rand(200, 400), $indexSize = 2),
                'author' => $faker->name,
                'desktop_asset' => 'https://source.unsplash.com/random/1280x800?sig=' . $i,
                'mobile_asset' => 'https://source.unsplash.com/random/400x300?sig=' . $i,
                'published_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
                'category_id' => rand(1, 7),
                'prominent' => false,
                'published' => true,
                'created_by' => 1
            ]);
        }
    }
}
