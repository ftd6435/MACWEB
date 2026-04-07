<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlidesSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            // Home page — 3 slides carousel
            [
                'page' => 'home',
                'title' => 'Excellence en Construction, Innovation Architecturale',
                'subtitle' => null,
                'description' => 'MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l\'Afrique.',
                'cta_text' => 'Découvrir nos Services',
                'cta_link' => '/services',
                'cta_secondary_text' => 'Voir nos Projets',
                'cta_secondary_link' => '/projects',
                'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000',
                'overlay_opacity' => 60,
                'order' => 0,
            ],
            [
                'page' => 'home',
                'title' => 'Excellence en Construction, Innovation Architecturale',
                'subtitle' => null,
                'description' => 'MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l\'Afrique.',
                'cta_text' => 'Découvrir nos Services',
                'cta_link' => '/services',
                'cta_secondary_text' => 'Voir nos Projets',
                'cta_secondary_link' => '/projects',
                'image' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000',
                'overlay_opacity' => 60,
                'order' => 1,
            ],
            [
                'page' => 'home',
                'title' => 'Excellence en Construction, Innovation Architecturale',
                'subtitle' => null,
                'description' => 'MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l\'Afrique.',
                'cta_text' => 'Découvrir nos Services',
                'cta_link' => '/services',
                'cta_secondary_text' => 'Voir nos Projets',
                'cta_secondary_link' => '/projects',
                'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000',
                'overlay_opacity' => 60,
                'order' => 2,
            ],

            // Services page
            [
                'page' => 'services',
                'title' => 'Nos Services',
                'subtitle' => null,
                'description' => 'Découvrez l\'ensemble de nos compétences en construction et forage, conçues pour répondre à tous vos besoins avec une excellence métier.',
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],

            // Projects page
            [
                'page' => 'projects',
                'title' => 'Nos Réalisations',
                'subtitle' => null,
                'description' => 'Découvrez notre portfolio d\'excellence architecturale et d\'innovation technique à travers l\'Afrique.',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],

            // Blog page
            [
                'page' => 'blog',
                'title' => 'Notre Blog',
                'subtitle' => null,
                'description' => 'Actualités, conseils et tendances de la construction en Afrique.',
                'image' => 'https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],

            // About page
            [
                'page' => 'about',
                'title' => 'À Propos de MAC',
                'subtitle' => null,
                'description' => 'Découvrez l\'histoire, les valeurs et l\'équipe qui font de MAC le leader de la construction moderne en Afrique.',
                'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],

            // Contact page
            [
                'page' => 'contact',
                'title' => 'Contactez-nous',
                'subtitle' => null,
                'description' => 'Nous sommes à votre disposition pour discuter de votre prochain projet de construction ou de forage.',
                'image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],

            // Careers page
            [
                'page' => 'careers',
                'title' => 'Rejoignez MAC',
                'subtitle' => null,
                'description' => 'Construisez votre carrière avec le leader de la construction en Afrique.',
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],

            // Partnership page
            [
                'page' => 'partnership',
                'title' => 'Devenez Partenaire',
                'subtitle' => null,
                'description' => 'Rejoignez notre réseau de partenaires et participez à la transformation de l\'Afrique.',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
                'overlay_opacity' => 60,
                'order' => 0,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::create($slide);
        }
    }
}
