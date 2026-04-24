<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    public function run(): void
    {
        $residentiel = Category::where('slug', 'residentiel')->first();
        $commercial = Category::where('slug', 'commercial')->first();
        $industriel = Category::where('slug', 'industriel')->first();
        $forage = Category::where('slug', 'forage')->first();

        $serviceResidentiel = Service::where('slug', 'construction-residentielle')->first();
        $serviceCommercial = Service::where('slug', 'construction-commerciale')->first();
        $serviceIndustriel = Service::where('slug', 'construction-industrielle')->first();
        $serviceForage = Service::where('slug', 'services-de-forage')->first();

        $projects = [
            [
                'title' => 'Résidence Les Palmiers',
                'slug' => 'residence-les-palmiers',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
                'description' => 'Complexe résidentiel haut de gamme de 120 appartements avec espaces verts et piscine commune.',
                'details' => 'La Résidence Les Palmiers représente l\'excellence de l\'architecture résidentielle moderne en Afrique de l\'Ouest. Ce complexe de standing exceptionnel de 120 appartements combine harmonieusement design contemporain et éléments culturels sénégalais, créant un cadre de vie unique au cœur de Dakar.',
                'location' => 'Dakar, Sénégal',
                'year' => '2024',
                'client_name' => 'Groupe Immobilier Dakar',
                'category_id' => $residentiel?->id,
                'service_id' => $serviceResidentiel?->id,
                'is_featured' => true,
                'is_published' => true,
                'metrics' => json_encode([
                    'area' => '25 000 m²',
                    'duration' => '18 mois',
                    'team_size' => '85 professionnels',
                    'units' => '120 unités',
                ]),
                'challenges' => json_encode([
                    ['title' => 'Terrain en zone meuble', 'description' => 'Sol sablonneux nécessitant une adaptation structurelle spécifique.', 'solution' => 'Conception de fondations profondes par pieux afin d\'assurer une stabilité structurelle pérenne.'],
                    ['title' => 'Délais serrés de livraison', 'description' => 'Planning de 18 mois imposé par le client.', 'solution' => 'Planification détaillée avec phases simultanées et équipes spécialisées en rotation.'],
                    ['title' => 'Climat tropical intense', 'description' => 'Températures élevées et humidité importante à gérer.', 'solution' => 'Orientation optimisée des bâtiments, ventilation naturelle croisée et matériaux isolants.'],
                    ['title' => 'Gestion des eaux pluviales', 'description' => 'Fortes pluies d\'hivernage nécessitant une gestion efficace.', 'solution' => 'Système de récupération et infiltration intégré par bassins versants avec bassins de rétention.'],
                ]),
                'technical_details' => json_encode([
                    'specifications' => ['Structure béton armé haute résistance', 'Fondations adaptées au sol sismique', 'Isolation thermique par l\'extérieur', 'Étanchéité multicouche des toitures'],
                    'materials' => ['Béton haute performance C30/37', 'Acier galvanisé à chaud', 'Menuiseries aluminium à rupture thermique', 'Revêtements pierre naturelle premium'],
                    'standards' => ['Normes parasismiques en vigueur', 'Réglementation thermique RT2020', 'Certification environnementale', 'Standards d\'accessibilité PMR'],
                    'innovations' => [
                        ['title' => 'Éclairage LED Intelligent', 'description' => 'Système d\'éclairage automatique des parties communes avec détection de présence.'],
                        ['title' => 'Récupération d\'eau de pluie', 'description' => 'Système de collecte et traitement pour l\'arrosage des espaces verts.'],
                    ],
                ]),
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600566753376-12c8ab7a5a0c?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=800&auto=format&fit=crop',
                ]),
            ],
            [
                'title' => 'Centre d\'Affaires Atlantique',
                'slug' => 'centre-affaires-atlantique',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
                'description' => 'Tour de bureaux de 25 étages avec certification HQE-Durable et technologies smart-building.',
                'details' => 'Le Centre d\'Affaires Atlantique est un symbole de modernité architecturale à Abidjan. Cette tour de 25 étages intègre les dernières technologies de smart-building et répond aux exigences de la certification HQE-Durable.',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'year' => '2023',
                'client_name' => 'Groupe Atlantique',
                'category_id' => $commercial?->id,
                'service_id' => $serviceCommercial?->id,
                'is_featured' => true,
                'is_published' => true,
                'metrics' => json_encode(['area' => '35 000 m²', 'duration' => '24 mois', 'floors' => '25 étages']),
            ],
            [
                'title' => 'Usine Textile Moderne',
                'slug' => 'usine-textile-moderne',
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
                'description' => 'Complexe industriel de 15 000 m² avec équipements de pointe et normes environnementales.',
                'location' => 'Lomé, Togo',
                'year' => '2022',
                'category_id' => $industriel?->id,
                'service_id' => $serviceIndustriel?->id,
                'is_featured' => false,
                'is_published' => true,
                'metrics' => json_encode(['area' => '15 000 m²']),
            ],
            [
                'title' => 'Hôtel Prestige Sahel',
                'slug' => 'hotel-prestige-sahel',
                'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
                'description' => 'Hôtel 5 étoiles de 200 chambres avec spa, centre de conférence et restaurants gastronomiques.',
                'location' => 'Ouagadougou, Burkina Faso',
                'year' => '2023',
                'client_name' => 'Hôtel Prestige',
                'category_id' => $commercial?->id,
                'service_id' => $serviceCommercial?->id,
                'is_featured' => true,
                'is_published' => true,
                'metrics' => json_encode(['rooms' => '200 chambres', 'stars' => '5 étoiles']),
            ],
            [
                'title' => 'Centre Commercial Baobab',
                'slug' => 'centre-commercial-baobab',
                'image' => 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop',
                'description' => 'Centre commercial de 50 boutiques avec cinéma, food-court et espace de divertissement familial.',
                'location' => 'Bamako, Mali',
                'year' => '2024',
                'category_id' => $commercial?->id,
                'service_id' => $serviceCommercial?->id,
                'is_published' => true,
                'metrics' => json_encode(['shops' => '50 boutiques']),
            ],
            [
                'title' => 'Campus Universitaire Innovation',
                'slug' => 'campus-universitaire-innovation',
                'image' => 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
                'description' => 'Campus de 10 hectares accueillant 5 000 étudiants avec laboratoires et bibliothèque numérique.',
                'location' => 'Cotonou, Bénin',
                'year' => '2021',
                'category_id' => $commercial?->id,
                'service_id' => $serviceCommercial?->id,
                'is_published' => true,
                'metrics' => json_encode(['area' => '10 hectares', 'capacity' => '5 000 étudiants']),
            ],
            [
                'title' => 'Projet Forage Communautaire',
                'slug' => 'projet-forage-communautaire',
                'image' => 'https://images.unsplash.com/photo-1533241242276-888998064956?q=80&w=800&auto=format&fit=crop',
                'description' => 'Installation de 25 puits d\'eau potable desservant 15 villages ruraux avec système solaire.',
                'location' => 'Région de Kayes, Mali',
                'year' => '2023',
                'category_id' => $forage?->id,
                'service_id' => $serviceForage?->id,
                'is_published' => true,
                'metrics' => json_encode(['wells' => '25 puits', 'villages' => '15 villages']),
            ],
            [
                'title' => 'Villa Moderne Plateau',
                'slug' => 'villa-moderne-plateau',
                'image' => 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
                'description' => 'Villa familiale de 450 m² avec piscine, jardin paysager et domotique intégrée.',
                'location' => 'Plateau, Abidjan',
                'year' => '2022',
                'category_id' => $residentiel?->id,
                'service_id' => $serviceResidentiel?->id,
                'is_published' => true,
                'metrics' => json_encode(['area' => '450 m²']),
            ],
            [
                'title' => 'Centre Médical Excellence',
                'slug' => 'centre-medical-excellence',
                'image' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop',
                'description' => 'Centre hospitalier de 100 lits avec bloc opératoire moderne et unité de soins intensifs.',
                'location' => 'Niamey, Niger',
                'year' => '2021',
                'category_id' => $commercial?->id,
                'service_id' => $serviceCommercial?->id,
                'is_published' => true,
                'metrics' => json_encode(['beds' => '100 lits']),
            ],
            [
                'title' => 'Usine Agroalimentaire Sahel',
                'slug' => 'usine-agroalimentaire-sahel',
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
                'description' => 'Complexe de transformation de 8 000 m² pour céréales locales avec technologies éco-responsables.',
                'location' => 'Bobo-Dioulasso, Burkina Faso',
                'year' => '2020',
                'category_id' => $industriel?->id,
                'service_id' => $serviceIndustriel?->id,
                'is_published' => true,
                'metrics' => json_encode(['area' => '8 000 m²']),
            ],
            [
                'title' => 'Cité des Jardins',
                'slug' => 'cite-des-jardins',
                'image' => 'https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=800&auto=format&fit=crop',
                'description' => 'Programme de logements sociaux de 300 appartements avec équipements communautaires.',
                'location' => 'Conakry, Guinée',
                'year' => '2020',
                'category_id' => $residentiel?->id,
                'service_id' => $serviceResidentiel?->id,
                'is_published' => true,
                'metrics' => json_encode(['units' => '300 appartements']),
            ],
            [
                'title' => 'Réseau Hydraulique Rural',
                'slug' => 'reseau-hydraulique-rural',
                'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
                'description' => 'Réseau de 18 forages équipés de pompes solaires desservant 12 000 habitants.',
                'location' => 'Région de Ségou, Mali',
                'year' => '2019',
                'category_id' => $forage?->id,
                'service_id' => $serviceForage?->id,
                'is_published' => true,
                'metrics' => json_encode(['wells' => '18 forages', 'population' => '12 000 habitants']),
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
