<?php

namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatsSeeder extends Seeder
{
    public function run(): void
    {
        $stats = [
            // Home/global stats
            ['label' => 'Années d\'Expérience', 'value' => '15+', 'sub_label' => 'Au service de l\'excellence', 'icon' => 'Calendar', 'group' => 'home', 'order' => 0],
            ['label' => 'Projets Livrés', 'value' => '200+', 'sub_label' => 'Réalisations de qualité', 'icon' => 'Building2', 'group' => 'home', 'order' => 1],
            ['label' => 'Clients Satisfaits', 'value' => '98%', 'sub_label' => 'Taux de satisfaction', 'icon' => 'ThumbsUp', 'group' => 'home', 'order' => 2],
            ['label' => 'Employés', 'value' => '150+', 'sub_label' => 'Experts qualifiés', 'icon' => 'Users', 'group' => 'home', 'order' => 3],

            // About page stats
            ['label' => 'Pays d\'Intervention', 'value' => '8', 'sub_label' => 'Présence régionale', 'icon' => 'Globe', 'group' => 'about', 'order' => 0],
            ['label' => 'Respect des Délais', 'value' => '95%', 'sub_label' => 'Livraison à temps', 'icon' => 'Clock', 'group' => 'about', 'order' => 1],

            // Work progress stats (used in some pages)
            ['label' => 'Projets à Temps', 'value' => '98%', 'sub_label' => 'Respect des délais', 'icon' => 'CheckCircle', 'group' => 'progress', 'order' => 0],
            ['label' => 'Satisfaction Client', 'value' => '100%', 'sub_label' => 'Objectif prioritaire', 'icon' => 'Heart', 'group' => 'progress', 'order' => 1],
        ];

        foreach ($stats as $stat) {
            Stat::create($stat);
        }
    }
}
