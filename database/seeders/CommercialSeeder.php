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
        Commercial::insert(
            [
                [
                    'name' => "Valenti's Pizza",
                    'desktop_picture' => 'http://nosjuimos.com/images/advertisement/SR_Valentis_Nina&Sebastian_Principal.jpg',
                    'mobile_picture' => 'http://nosjuimos.com/images/advertisement/SR_Valentis_Nina&Sebastian_Principal.jpg',
                    'picture_url' => 'https://www.facebook.com/valentispizza',
                    'start_date' => \Carbon\Carbon::now()->subDays(30),
                    'end_date' => Null,
                    'created_by' => 1
                ],
                [
                    'name' => 'Nicaragua 505',
                    'desktop_picture' => 'http://nosjuimos.com/images/advertisement/SR_505.jpg',
                    'mobile_picture' => 'http://nosjuimos.com/images/advertisement/SR_505.jpg',
                    'picture_url' => 'https://nicaragua505.com/',
                    'start_date' => \Carbon\Carbon::now()->subDays(30),
                    'end_date' => Null,
                    'created_by' => 1
                ],
                [
                    'name' => 'La Pulga',
                    'desktop_picture' => 'http://nosjuimos.com/images/advertisement/NJ_LPULGA_MAIN.jpg',
                    'mobile_picture' => 'http://nosjuimos.com/images/advertisement/NJ_LPULGA_MAIN.jpg',
                    'picture_url' => 'http://lapulga.com.ni/',
                    'start_date' => \Carbon\Carbon::now()->subDays(30),
                    'end_date' => Null,
                    'created_by' => 1
                ],
                [
                    'name' => 'Sofá Rojo',
                    'desktop_picture' => 'http://nosjuimos.com/images/advertisement/NJ_SR_MAIN.jpg',
                    'mobile_picture' => 'http://nosjuimos.com/images/advertisement/NJ_SR_MAIN.jpg',
                    'picture_url' => 'http://www.detrasdelsofarojo.com',
                    'start_date' => \Carbon\Carbon::now()->subDays(30),
                    'end_date' => Null,
                    'created_by' => 1
                ],
            ]
        );
    }
}
