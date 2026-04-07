<?php

namespace Database\Seeders;

use App\Models\TimelineMilestone;
use Illuminate\Database\Seeder;

class TimelineSeeder extends Seeder
{
    public function run(): void
    {
        $milestones = [
            [
                'year' => '2009',
                'title' => 'Création de MAC',
                'description' => 'Fondation de l\'entreprise avec une vision forte : révolutionner la construction en Afrique.',
                'icon' => 'Building2',
                'order' => 0,
            ],
            [
                'year' => '2013',
                'title' => 'Expansion Régionale',
                'description' => 'Extension de nos activités dans 5 pays d\'Afrique de l\'Ouest avec plus de 50 projets réalisés.',
                'icon' => 'TrendingUp',
                'order' => 1,
            ],
            [
                'year' => '2024',
                'title' => 'Leader Reconnu',
                'description' => 'Plus de 200 projets livrés avec une reconnaissance internationale de l\'innovation et de la qualité.',
                'icon' => 'Award',
                'order' => 2,
            ],
        ];

        foreach ($milestones as $milestone) {
            TimelineMilestone::create($milestone);
        }
    }
}
