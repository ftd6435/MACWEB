<?php

namespace Database\Seeders;

use App\Models\JobListing;
use Illuminate\Database\Seeder;

class JobListingsSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Ingénieur Civil Sénior',
                'slug' => 'ingenieur-civil-senior',
                'department' => 'Ingénierie',
                'location' => 'Dakar, Sénégal',
                'contract_type' => 'CDI',
                'description' => 'Nous recherchons un ingénieur civil expérimenté pour superviser nos projets d\'infrastructure d\'envergure.',
                'requirements' => json_encode([
                    'Diplôme d\'ingénieur civil (Bac+5)',
                    'Minimum 8 ans d\'expérience dans la construction',
                    'Maîtrise des logiciels de calcul de structure',
                    'Connaissance des normes de construction africaines et internationales',
                    'Expérience en gestion d\'équipe',
                ]),
                'responsibilities' => json_encode([
                    'Superviser les projets d\'infrastructure de grande envergure',
                    'Assurer la conformité aux normes techniques et réglementaires',
                    'Encadrer et former les équipes techniques',
                    'Coordonner avec les architectes et les sous-traitants',
                ]),
                'is_active' => true,
                'is_featured' => true,
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Architecte de Conception',
                'slug' => 'architecte-de-conception',
                'department' => 'Architecture',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'contract_type' => 'CDI',
                'description' => 'Rejoignez notre équipe créative pour concevoir les bâtiments emblématiques de demain en Afrique.',
                'requirements' => json_encode([
                    'Diplôme d\'architecte (DPLG ou équivalent)',
                    'Minimum 5 ans d\'expérience professionnelle',
                    'Maîtrise d\'AutoCAD, Revit et SketchUp',
                    'Sensibilité à l\'architecture africaine contemporaine',
                ]),
                'responsibilities' => json_encode([
                    'Concevoir des projets architecturaux innovants',
                    'Produire les plans et documents techniques',
                    'Assurer le suivi architectural des chantiers',
                ]),
                'is_active' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Conducteur de Travaux Forage',
                'slug' => 'conducteur-travaux-forage',
                'department' => 'Terrain',
                'location' => 'Bamako, Mali',
                'contract_type' => 'CDI',
                'description' => 'Expert en forage d\'eau pour coordonner nos équipes techniques sur le terrain.',
                'requirements' => json_encode([
                    'Formation technique en hydrogéologie ou génie civil',
                    'Minimum 5 ans d\'expérience en forage',
                    'Connaissance des techniques de forage rotary et MFT',
                    'Permis de conduire valide',
                ]),
                'responsibilities' => json_encode([
                    'Coordonner les équipes techniques sur le terrain',
                    'Superviser les opérations de forage',
                    'Assurer le respect des normes de sécurité',
                    'Rédiger les rapports techniques',
                ]),
                'is_active' => true,
                'published_at' => now()->subWeek(),
            ],
            [
                'title' => 'Chef de Projet BTP',
                'slug' => 'chef-de-projet-btp',
                'department' => 'Gestion de Projet',
                'location' => 'Conakry, Guinée',
                'contract_type' => 'CDI',
                'description' => 'Garant de la tenue des délais et de la qualité sur nos chantiers complexes.',
                'requirements' => json_encode([
                    'Diplôme en génie civil ou gestion de projet (Bac+5)',
                    'Minimum 7 ans d\'expérience en gestion de projets BTP',
                    'Certification PMP ou équivalent souhaitée',
                    'Maîtrise de MS Project et Primavera',
                ]),
                'responsibilities' => json_encode([
                    'Planifier et coordonner l\'ensemble des phases du projet',
                    'Gérer les budgets et les délais',
                    'Assurer la communication avec les clients et partenaires',
                    'Garantir la qualité des livrables',
                ]),
                'is_active' => true,
                'published_at' => now()->subDays(3),
            ],
        ];

        foreach ($jobs as $job) {
            JobListing::create($job);
        }
    }
}
