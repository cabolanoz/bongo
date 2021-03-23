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
        Category::insert(
            [
                [
                    'name' => 'Cultura',
                    'css_class' => 'culture',
                    'created_by' => 1
                ],
                [
                    'name' => 'Música',
                    'css_class' => 'music',
                    'created_by' => 1
                ],
                [
                    'name' => 'Danza',
                    'css_class' => 'dance',
                    'created_by' => 1
                ],
                [
                    'name' => 'Teatro',
                    'css_class' => 'theater',
                    'created_by' => 1
                ],
                [
                    'name' => 'Cine',
                    'css_class' => 'cinema',
                    'created_by' => 1
                ],
                [
                    'name' => 'Aventura',
                    'css_class' => 'adventure',
                    'created_by' => 1
                ],
                [
                    'name' => 'Voluntariado',
                    'css_class' => 'volunteering',
                    'created_by' => 1
                ],
            ]
        );
    }
}
