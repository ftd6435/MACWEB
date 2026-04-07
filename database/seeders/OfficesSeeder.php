<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;

class OfficesSeeder extends Seeder
{
    public function run(): void
    {
        $offices = [
            [
                'name' => 'Siège Social',
                'city' => 'Dakar',
                'country' => 'Sénégal',
                'address' => 'Avenue Cheikh Anta Diop, Dakar',
                'phone' => '+224 622 14 67 14',
                'email' => 'dakar@mac-construction.com',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
                'is_headquarters' => true,
                'map_lat' => 14.6937,
                'map_lng' => -17.4727,
                'order' => 0,
            ],
            [
                'name' => 'Bureau Régional',
                'city' => 'Abidjan',
                'country' => 'Côte d\'Ivoire',
                'address' => 'Boulevard Latrille, Cocody, Abidjan',
                'phone' => '+225 27 22 XX XX XX',
                'email' => 'abidjan@mac-construction.com',
                'image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800',
                'is_headquarters' => false,
                'order' => 1,
            ],
            [
                'name' => 'Bureau Local',
                'city' => 'Bamako',
                'country' => 'Mali',
                'address' => 'ACI 2000, Bamako',
                'phone' => '+223 XX XX XX XX',
                'email' => 'bamako@mac-construction.com',
                'image' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800',
                'is_headquarters' => false,
                'order' => 2,
            ],
        ];

        foreach ($offices as $office) {
            Office::create($office);
        }
    }
}
