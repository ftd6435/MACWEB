<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        // Create service categories
        $residentiel = Category::firstOrCreate(
            ['slug' => 'residentiel'],
            ['name' => 'Résidentiel', 'type' => 'project', 'description' => 'Projets de construction résidentielle']
        );
        $commercial = Category::firstOrCreate(
            ['slug' => 'commercial'],
            ['name' => 'Commercial', 'type' => 'project', 'description' => 'Projets de construction commerciale']
        );
        $industriel = Category::firstOrCreate(
            ['slug' => 'industriel'],
            ['name' => 'Industriel', 'type' => 'project', 'description' => 'Projets de construction industrielle']
        );
        $forage = Category::firstOrCreate(
            ['slug' => 'forage'],
            ['name' => 'Forage', 'type' => 'project', 'description' => 'Services de forage d\'eau et d\'exploration']
        );

        $services = [
            [
                'title' => 'Construction Résidentielle',
                'slug' => 'construction-residentielle',
                'description' => 'Villas, immeubles d\'habitations modernes.',
                'long_description' => 'Nous créons des espaces de vie exceptionnels, du logement individuel aux complexes résidentiels de grande envergure. Notre approche intègre l\'architecture moderne et le respect des standards internationaux de qualité et de confort.',
                'icon' => 'Home',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
                'features' => json_encode(['Villas et Maisons Individuelles', 'Complexes Résidentiels', 'Aménagement de Lotissements']),
                'sub_services' => json_encode([
                    ['title' => 'Villas et Maisons Individuelles', 'description' => 'Construction sur mesure de villas modernes et traditionnelles.'],
                    ['title' => 'Complexes Résidentiels', 'description' => 'Immeubles d\'appartements et résidences de standing.'],
                    ['title' => 'Aménagement de Lotissements', 'description' => 'Viabilisation et aménagement de terrains résidentiels.'],
                ]),
                'is_active' => true,
                'order' => 0,
            ],
            [
                'title' => 'Construction Commerciale',
                'slug' => 'construction-commerciale',
                'description' => 'Bureaux, centres commerciaux et espaces d\'affaires contemporains.',
                'long_description' => 'Nous concevons et réalisons des espaces commerciaux qui allient fonctionnalité, esthétique et performance énergétique. Chaque projet est pensé pour optimiser l\'expérience utilisateur et la rentabilité.',
                'icon' => 'Building2',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
                'features' => json_encode(['Bureaux et Tours d\'Affaires', 'Centres Commerciaux', 'Hôtels et Hospitalité']),
                'sub_services' => json_encode([
                    ['title' => 'Bureaux et Tours d\'Affaires', 'description' => 'Espaces de travail modernes et intelligents.'],
                    ['title' => 'Centres Commerciaux', 'description' => 'Complexes commerciaux et galeries marchandes.'],
                    ['title' => 'Hôtels et Hospitalité', 'description' => 'Hôtels, resorts et établissements d\'accueil haut de gamme.'],
                ]),
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Construction Industrielle',
                'slug' => 'construction-industrielle',
                'description' => 'Usines, entrepôts et installations industrielles adaptées.',
                'long_description' => 'Nos installations industrielles sont conçues pour répondre aux exigences les plus strictes en termes de sécurité, efficacité et durabilité. Nous maîtrisons les normes internationales et les spécificités techniques.',
                'icon' => 'Factory',
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
                'features' => json_encode(['Usines et Unités de Production', 'Entrepôts et Centres Logistiques', 'Infrastructures Spécialisées']),
                'sub_services' => json_encode([
                    ['title' => 'Usines et Unités de Production', 'description' => 'Complexes industriels de production et transformation.'],
                    ['title' => 'Entrepôts et Centres Logistiques', 'description' => 'Espaces de stockage et plateformes logistiques.'],
                    ['title' => 'Infrastructures Spécialisées', 'description' => 'Installations techniques et équipements industriels.'],
                ]),
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Services de Forage',
                'slug' => 'services-de-forage',
                'description' => 'Forage d\'eau, performances et exploration.',
                'long_description' => 'MAC offre des services complets de forage couvrant l\'eau potable, l\'exploration géotechnique et minérale. Nos équipes interviennent dans toute l\'Afrique de l\'Ouest avec des équipements de pointe et une expertise reconnue.',
                'icon' => 'Droplets',
                'image' => 'https://images.unsplash.com/photo-1533241242276-888998064956?q=80&w=1000&auto=format&fit=crop',
                'features' => json_encode(['Forage d\'Eau', 'Forage Géotechnique', 'Forage d\'Exploration']),
                'sub_services' => json_encode([
                    ['title' => 'Forage d\'Eau', 'description' => 'Puits pour particuliers, irrigation et usage industriel avec analyse géophysique complète.'],
                    ['title' => 'Forage Géotechnique', 'description' => 'Solutions d\'exploration du sol pour vos projets d\'infrastructure et d\'ingénierie.'],
                    ['title' => 'Forage d\'Exploration', 'description' => 'Études géologiques et minérales pour des solutions de projets de grande envergure.'],
                ]),
                'process_steps' => json_encode(['Sénégal', 'Mali', 'Guinée', 'Côte d\'Ivoire']),
                'is_active' => true,
                'order' => 3,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
