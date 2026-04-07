<?php

namespace Database\Seeders;

use App\Models\Certification;
use Illuminate\Database\Seeder;

class CertificationsSeeder extends Seeder
{
    public function run(): void
    {
        $certifications = [
            [
                'name' => 'ISO 9001:2015',
                'code' => 'ISO-9001',
                'description' => 'Système de management de la qualité pour l\'excellence de nos processus.',
                'type' => 'certification',
                'order' => 0,
            ],
            [
                'name' => 'ISO 14001:2015',
                'code' => 'ISO-14001',
                'description' => 'Management environnemental pour une construction durable et responsable.',
                'type' => 'certification',
                'order' => 1,
            ],
            [
                'name' => 'OHSAS 18001',
                'code' => 'OHSAS-18001',
                'description' => 'Gestion de la santé et sécurité au travail sur tous nos chantiers.',
                'type' => 'certification',
                'order' => 2,
            ],
            // Professional affiliations
            [
                'name' => 'Ordre des Architectes et Urbanistes d\'Afrique de l\'Ouest',
                'code' => null,
                'description' => null,
                'type' => 'affiliation',
                'order' => 3,
            ],
            [
                'name' => 'Fédération Africaine des Entrepreneurs du BTP',
                'code' => null,
                'description' => null,
                'type' => 'affiliation',
                'order' => 4,
            ],
            [
                'name' => 'Green Building Council d\'Afrique',
                'code' => null,
                'description' => null,
                'type' => 'affiliation',
                'order' => 5,
            ],
            [
                'name' => 'Ordre des Ingénieurs du Sénégal',
                'code' => null,
                'description' => null,
                'type' => 'affiliation',
                'order' => 6,
            ],
        ];

        foreach ($certifications as $cert) {
            Certification::create($cert);
        }
    }
}
