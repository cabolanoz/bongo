<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Album;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Album::truncate();
        \DB::statement("SET foreign_key_checks=1");

        $faker = \Faker\Factory::create();

        Album::create([
            'name' => $faker->title,
            'description' => $faker->text,
            'spectacle_thumbnail' => 'http://nosjuimos.com/Gallery/thumbnail/128/img1754-800x445-58e87.jpg',
            'spectacle_date' => \Carbon\Carbon::now(),
            'published' => true,
            'created_by' => 1
        ]);
    }
}
