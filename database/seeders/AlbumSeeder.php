<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Album;
use App\Models\Photo;

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
        Photo::truncate();
        \DB::statement("SET foreign_key_checks=1");

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 20; $i++)
        {
            $album = Album::create([
                'name' => $faker->name,
                'description' => $faker->text,
                'spectacle_thumbnail' => 'https://source.unsplash.com/random/400x300',
                'spectacle_date' => \Carbon\Carbon::now(),
                'published' => true,
                'created_by' => 1
            ]);

            for ($j = 0; $j < 10; $j++)
            {
                Photo::create([
                    'desktop_asset' => 'https://source.unsplash.com/random/1280x800',
                    'mobile_asset' => 'https://source.unsplash.com/random/400x300',
                    'album_id' => $album->id,
                    'created_by' => 1,
                ]);
            }
        }
    }
}
