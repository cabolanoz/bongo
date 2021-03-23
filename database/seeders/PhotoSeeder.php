<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Photo;

class PhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Photo::truncate();
        \DB::statement("SET foreign_key_checks=1");

        Photo::insert(
            [
                [
                    'desktop_asset' => 'http://nosjuimos.com/Gallery/thumbnail/128/img1754-800x445-58e87.jpg',
                    'album_id' => 1,
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'desktop_asset' => 'http://nosjuimos.com/Gallery/thumbnail/128/p-8efed.jpg',
                    'album_id' => 1,
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'desktop_asset' => 'http://nosjuimos.com/Gallery/thumbnail/128/t-ee0e1.jpg',
                    'album_id' => 1,
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'desktop_asset' => 'http://nosjuimos.com/Gallery/thumbnail/128/y-87ef6.jpg',
                    'album_id' => 1,
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'desktop_asset' => 'http://nosjuimos.com/Gallery/thumbnail/128/i-b6c06.jpg',
                    'album_id' => 1,
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
            ]
        );
    }
}
