<?php

namespace Database\Seeders;

use App\Models\Value;
use Illuminate\Database\Seeder;

class ValuesSeeder extends Seeder
{
    public function run(): void
    {
        $values = [
            [
                'title' => 'Excellence',
                'description' => 'Nous nous engageons à dépasser les attentes à chaque projet, en visant la perfection dans chaque détail.',
                'icon' => 'Award',
                'order' => 0,
            ],
            [
                'title' => 'Intégrité',
                'description' => 'Honnêteté, transparence et respect des engagements sont au cœur de toutes nos relations.',
                'icon' => 'ShieldCheck',
                'order' => 1,
            ],
            [
                'title' => 'Innovation',
                'description' => 'Nous adoptons les dernières technologies et méthodes pour créer des solutions avant-gardistes.',
                'icon' => 'Lightbulb',
                'order' => 2,
            ],
            [
                'title' => 'Engagement Client',
                'description' => 'Chaque client est unique et mérite une attention personnalisée pour concrétiser sa vision.',
                'icon' => 'Users',
                'order' => 3,
            ],
            [
                'title' => 'Durabilité',
                'description' => 'Nous construisons pour les générations futures en respectant l\'environnement et les communautés.',
                'icon' => 'Globe',
                'order' => 4,
            ],
            [
                'title' => 'Esprit d\'Équipe',
                'description' => 'La collaboration et le partage d\'expertise sont les piliers de notre succès collectif.',
                'icon' => 'Heart',
                'order' => 5,
            ],
        ];

        foreach ($values as $value) {
            Value::create($value);
        }
    }
}
