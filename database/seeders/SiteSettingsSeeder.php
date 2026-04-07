<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'company_name', 'value' => 'Merveille d\'Afrique Construction', 'type' => 'text', 'group' => 'general'],
            ['key' => 'company_short_name', 'value' => 'MAC', 'type' => 'text', 'group' => 'general'],
            ['key' => 'tagline', 'value' => 'Excellence en Construction, Innovation Architecturale', 'type' => 'text', 'group' => 'general'],
            ['key' => 'founded_year', 'value' => '2009', 'type' => 'text', 'group' => 'general'],
            ['key' => 'header_logo', 'value' => '/img/header_logo.png', 'type' => 'image', 'group' => 'general'],
            ['key' => 'footer_logo', 'value' => '/img/footer_logo.png', 'type' => 'image', 'group' => 'general'],

            // Contact
            ['key' => 'main_phone', 'value' => '+224 622 14 67 14', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'main_email', 'value' => 'contact@mac-construction.com', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'hr_email', 'value' => 'rh@mac-construction.com', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'main_address', 'value' => '12 Avenue Cheikh Anta Diop, Dakar, Sénégal', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'opening_hours', 'value' => json_encode([
                'Lun - Ven' => '8:00 - 17:00',
                'Samedi' => '8:00 - 12:00',
                'Dimanche' => 'Fermé',
            ]), 'type' => 'json', 'group' => 'contact'],
            ['key' => 'response_time', 'value' => '24 heures ouvrées', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'map_coordinates', 'value' => json_encode(['lat' => 14.6937, 'lng' => -17.4727]), 'type' => 'json', 'group' => 'contact'],

            // Footer
            ['key' => 'footer_description', 'value' => 'Votre partenaire de confiance pour tous vos projets de construction et forage en Afrique. Expertise, qualité et engagement.', 'type' => 'text', 'group' => 'global'],
            ['key' => 'copyright_text', 'value' => '© {year} Merveille d\'Afrique Construction. Tous droits réservés.', 'type' => 'text', 'group' => 'global'],

            // About / Mission
            ['key' => 'mission_statement', 'value' => 'Transformer l\'Afrique par des constructions d\'excellence qui allient innovation architecturale, durabilité environnementale et développement humain tout en créant des espaces qui inspirent et perdurent.', 'type' => 'text', 'group' => 'about'],
            ['key' => 'about_story', 'value' => 'Fondée en 2009 par une équipe d\'ingénieurs et d\'architectes passionnés, MAC est née d\'une conviction claire : l\'Afrique mérite une approche moderne et durable de la construction. Notre parcours a été jalonné de défis relevés et d\'innovations introduites. Chaque projet nous a permis d\'affiner notre expertise et de développer des solutions adaptées aux spécificités du continent africain. Aujourd\'hui, MAC est bien plus qu\'une entreprise de construction ; nous sommes un acteur incontournable de la construction moderne en Afrique, tout en gardant nos valeurs fondamentales d\'excellence et d\'intégrité.', 'type' => 'text', 'group' => 'about'],
            ['key' => 'team_size_note', 'value' => '150+ professionnels répartis dans nos différents départements : ingénierie, architecture, gestion de projets, qualité et développement durable.', 'type' => 'text', 'group' => 'about'],

            // Home CTA Section
            ['key' => 'home_cta_title', 'value' => 'Prêt à Lancer Votre Projet?', 'type' => 'text', 'group' => 'home'],
            ['key' => 'home_cta_subtitle', 'value' => 'Contactez-nous dès aujourd\'hui pour discuter de votre vision et découvrir comment nous pouvons la concrétiser.', 'type' => 'text', 'group' => 'home'],

            // Careers
            ['key' => 'careers_spontaneous_email', 'value' => 'rh@mac-construction.com', 'type' => 'text', 'group' => 'careers'],
            ['key' => 'careers_phone', 'value' => '+224 622 14 67 14', 'type' => 'text', 'group' => 'careers'],
            ['key' => 'careers_benefits', 'value' => json_encode([
                ['title' => 'Formation Continue', 'icon' => 'GraduationCap', 'description' => 'Programmes de développement professionnel et certifications.'],
                ['title' => 'Assurance Santé', 'icon' => 'CheckCircle2', 'description' => 'Couverture santé complète pour vous et votre famille.'],
                ['title' => 'Évolution Rapide', 'icon' => 'TrendingUp', 'description' => 'Des opportunités de carrière basées sur le mérite et la performance.'],
                ['title' => 'Esprit d\'Équipe', 'icon' => 'Users', 'description' => 'Un environnement collaboratif et bienveillant.'],
            ]), 'type' => 'json', 'group' => 'careers'],

            // Partnership
            ['key' => 'partnership_models', 'value' => json_encode([
                ['title' => 'Co-traitance', 'icon' => 'Users', 'description' => 'Partenariats sur des projets d\'envergure pour unir nos expertises techniques et logistiques.'],
                ['title' => 'Fournisseur Agréé', 'icon' => 'Building2', 'description' => 'Devenez un fournisseur privilégié de matériaux et équipements de haute qualité.'],
                ['title' => 'Développement Régional', 'icon' => 'Globe', 'description' => 'Collaboration pour l\'expansion de nos activités dans de nouvelles zones géographiques.'],
            ]), 'type' => 'json', 'group' => 'partnership'],
            ['key' => 'partnership_advantages', 'value' => json_encode([
                'Accès à des projets d\'envergure internationale.',
                'Sécurité de paiement et transparence contractuelle.',
                'Vision partagée de l\'excellence architecturale.',
                'Processus de collaboration agiles et efficaces.',
            ]), 'type' => 'json', 'group' => 'partnership'],

            // Services work process
            ['key' => 'work_process', 'value' => json_encode([
                ['number' => '1', 'title' => 'Consultation Initiale', 'description' => 'Analyse de vos besoins et définition des objectifs du projet.'],
                ['number' => '2', 'title' => 'Étude et Devis', 'description' => 'Conception technique détaillée avec devis transparent et planifié.'],
                ['number' => '3', 'title' => 'Planification', 'description' => 'Organisation des ressources, obtention des autorisations et calendrier.'],
                ['number' => '4', 'title' => 'Exécution', 'description' => 'Réalisation avec contrôle qualité continu et communication régulière.'],
                ['number' => '5', 'title' => 'Livraison et Suivi', 'description' => 'Réception finale avec garanties et suivi de maintenance.'],
            ]), 'type' => 'json', 'group' => 'services'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
