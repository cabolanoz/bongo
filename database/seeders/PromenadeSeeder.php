<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Promenade;

class PromenadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Promenade::truncate();
        \DB::statement("SET foreign_key_checks=1");

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++)
        {
            $latitude = $faker->latitude($min = -90, $max = 90);
            $longitude = $faker->longitude($min = -180, $max = 180);
            $location = \DB::raw("ST_GeomFromText('POINT(" . $latitude . " " . $longitude . ")')");

            $promenade = Promenade::create([
                'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'description' => $faker->realText($maxNbChars = rand(200, 400), $indexSize = 2),
                'host' => $faker->name,
                'desktop_asset' => 'https://source.unsplash.com/random/1280x800?sig=' . $i,
                'mobile_asset' => 'https://source.unsplash.com/random/400x300?sig=' . $i,
                'event_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
                'event_time' => $faker->time($format = 'H:i:s', $max = 'now'),
                'location_name' => $faker->company,
                'location' => $location,
                'category_id' => rand(1, 7),
                'prominent' => false,
                'published' => true,
                'created_by' => 1
            ]);
        }
    }
}
