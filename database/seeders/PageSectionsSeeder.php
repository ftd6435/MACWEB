<?php

namespace Database\Seeders;

use App\Models\PageSection;
use Illuminate\Database\Seeder;

class PageSectionsSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            // Home page
            [
                'page' => 'home',
                'section_key' => 'cta_section',
                'title' => 'Prêt à Lancer Votre Projet?',
                'subtitle' => 'Contactez-nous dès aujourd\'hui pour discuter de votre vision et découvrir comment nous pouvons la concrétiser.',
                'extra' => json_encode([
                    'cta_text' => 'Contactez-nous Maintenant',
                    'cta_link' => '/contact',
                    'phone' => '+224 622 14 67 14',
                    'email' => 'contact@mac-construction.com',
                ]),
                'order' => 0,
            ],
            [
                'page' => 'home',
                'section_key' => 'services_intro',
                'title' => 'Nos Services',
                'subtitle' => 'Des solutions complètes de construction et de forage pour vos projets d\'envergure.',
                'order' => 1,
            ],
            [
                'page' => 'home',
                'section_key' => 'projects_intro',
                'title' => 'Nos Réalisations',
                'subtitle' => 'Découvrez nos projets emblématiques qui transforment le paysage africain.',
                'order' => 2,
            ],
            [
                'page' => 'home',
                'section_key' => 'testimonials_intro',
                'title' => 'Ce Que Disent Nos Clients',
                'subtitle' => 'La satisfaction de nos clients est notre plus grande fierté.',
                'order' => 3,
            ],

            // About page
            [
                'page' => 'about',
                'section_key' => 'mission',
                'title' => 'Notre Mission',
                'content' => 'Transformer l\'Afrique par des constructions d\'excellence qui allient innovation architecturale, durabilité environnementale et développement humain tout en créant des espaces qui inspirent et perdurent.',
                'order' => 0,
            ],
            [
                'page' => 'about',
                'section_key' => 'story',
                'title' => 'Notre Histoire',
                'image' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200',
                'content' => 'Fondée en 2009 par une équipe d\'ingénieurs et d\'architectes passionnés, MAC est née d\'une conviction claire : l\'Afrique mérite une approche moderne et durable de la construction.'."\n\n".'Notre parcours a été jalonné de défis relevés et d\'innovations introduites. Chaque projet nous a permis d\'affiner notre expertise et de développer des solutions adaptées aux spécificités du continent africain.'."\n\n".'Aujourd\'hui, MAC est bien plus qu\'une entreprise de construction ; nous sommes un acteur incontournable de la construction moderne en Afrique, tout en gardant nos valeurs fondamentales d\'excellence et d\'intégrité.',
                'order' => 1,
            ],
            [
                'page' => 'about',
                'section_key' => 'values_intro',
                'title' => 'Nos Valeurs',
                'subtitle' => 'Les principes qui guident chacune de nos actions.',
                'order' => 2,
            ],
            [
                'page' => 'about',
                'section_key' => 'team_intro',
                'title' => 'Notre Équipe',
                'subtitle' => '150+ professionnels répartis dans nos différents départements : ingénierie, architecture, gestion de projets, qualité et développement durable.',
                'order' => 3,
            ],

            // Services page
            [
                'page' => 'services',
                'section_key' => 'process_intro',
                'title' => 'Notre Processus',
                'subtitle' => 'Une méthodologie éprouvée pour garantir l\'excellence à chaque étape.',
                'order' => 0,
            ],

            // Contact page
            [
                'page' => 'contact',
                'section_key' => 'form_intro',
                'title' => 'Envoyez-nous un Message',
                'subtitle' => 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
                'order' => 0,
            ],
            [
                'page' => 'contact',
                'section_key' => 'social_section',
                'title' => 'Suivez-nous',
                'subtitle' => 'Restez connecté avec MAC sur les réseaux sociaux.',
                'order' => 1,
            ],

            // Careers page
            [
                'page' => 'careers',
                'section_key' => 'why_join',
                'title' => 'Pourquoi Rejoindre MAC?',
                'subtitle' => 'Rejoignez une entreprise qui investit dans ses talents et leurs aspirations.',
                'order' => 0,
            ],
            [
                'page' => 'careers',
                'section_key' => 'spontaneous',
                'title' => 'Candidature Spontanée',
                'subtitle' => 'Aucune offre ne correspond à votre profil? Envoyez-nous votre candidature spontanée.',
                'extra' => json_encode([
                    'email' => 'rh@mac-construction.com',
                    'phone' => '+224 622 14 67 14',
                ]),
                'order' => 1,
            ],

            // Partnership page
            [
                'page' => 'partnership',
                'section_key' => 'intro',
                'title' => 'Collaborons Ensemble',
                'subtitle' => 'MAC recherche des partenaires stratégiques pour construire l\'avenir de l\'Afrique.',
                'order' => 0,
            ],
            [
                'page' => 'partnership',
                'section_key' => 'advantages',
                'title' => 'Avantages du Partenariat',
                'subtitle' => 'Découvrez les bénéfices d\'une collaboration avec MAC.',
                'order' => 1,
            ],
        ];

        foreach ($sections as $section) {
            PageSection::create($section);
        }
    }
}
