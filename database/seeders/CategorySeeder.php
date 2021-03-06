<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement("SET foreign_key_checks=0");
        Category::truncate();
        \DB::statement("SET foreign_key_checks=1");

        Category::insert(
            [
                [
                    'name' => 'Cultura',
                    'css_class' => 'culture',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'name' => 'Música',
                    'css_class' => 'music',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'name' => 'Danza',
                    'css_class' => 'dance',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'name' => 'Teatro',
                    'css_class' => 'theater',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'name' => 'Cine',
                    'css_class' => 'cinema',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'name' => 'Aventura',
                    'css_class' => 'adventure',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
                [
                    'name' => 'Voluntariado',
                    'css_class' => 'volunteering',
                    'created_by' => 1,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ],
            ]
        );
    }
}
