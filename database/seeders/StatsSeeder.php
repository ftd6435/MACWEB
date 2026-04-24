<?php

namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatsSeeder extends Seeder
{
    public function run(): void
    {
        $stats = [
            // Home features
            ['label' => 'Expertise Reconnue', 'value' => 'Plus de 15 ans d\'expérience dans la construction en Afrique.', 'sub_label' => null, 'icon' => 'Award', 'group' => 'home_features', 'order' => 0],
            ['label' => 'Délais Respectés', 'value' => '98% de nos projets livrés dans les temps convenus.', 'sub_label' => null, 'icon' => 'Clock', 'group' => 'home_features', 'order' => 1],
            ['label' => 'Qualité Garantie', 'value' => 'Matériaux premium et normes de construction internationales.', 'sub_label' => null, 'icon' => 'Shield', 'group' => 'home_features', 'order' => 2],
            ['label' => 'Accompagnement Personnalisé', 'value' => 'Équipe dédiée pour chaque projet du début à la fin.', 'sub_label' => null, 'icon' => 'Users', 'group' => 'home_features', 'order' => 3],

            // Careers benefits
            ['label' => 'Formation Continue', 'value' => 'Programmes de développement professionnel et certifications.', 'sub_label' => null, 'icon' => 'GraduationCap', 'group' => 'careers_benefits', 'order' => 0],
            ['label' => 'Assurance Santé', 'value' => 'Couverture santé complète pour vous et votre famille.', 'sub_label' => null, 'icon' => 'CheckCircle2', 'group' => 'careers_benefits', 'order' => 1],
            ['label' => 'Évolution Rapide', 'value' => 'Des opportunités de carrière basées sur le mérite et la performance.', 'sub_label' => null, 'icon' => 'TrendingUp', 'group' => 'careers_benefits', 'order' => 2],
            ['label' => 'Esprit d\'Équipe', 'value' => 'Un environnement collaboratif et bienveillant.', 'sub_label' => null, 'icon' => 'Users', 'group' => 'careers_benefits', 'order' => 3],

            // Partnership: Why partner with us
            ['label' => 'Accès à des projets d\'envergure internationale.', 'value' => 'Accès à des projets d\'envergure internationale.', 'sub_label' => null, 'icon' => 'TrendingUp', 'group' => 'partnership_advantages', 'order' => 0],
            ['label' => 'Sécurité de paiement et transparence contractuelle.', 'value' => 'Sécurité de paiement et transparence contractuelle.', 'sub_label' => null, 'icon' => 'Shield', 'group' => 'partnership_advantages', 'order' => 1],
            ['label' => 'Vision partagée de l\'excellence architecturale.', 'value' => 'Vision partagée de l\'excellence architecturale.', 'sub_label' => null, 'icon' => 'Target', 'group' => 'partnership_advantages', 'order' => 2],
            ['label' => 'Processus de collaboration agiles et efficaces.', 'value' => 'Processus de collaboration agiles et efficaces.', 'sub_label' => null, 'icon' => 'Zap', 'group' => 'partnership_advantages', 'order' => 3],

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
