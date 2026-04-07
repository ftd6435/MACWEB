<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Mamadou Diop',
                'role' => 'Directeur Général',
                'bio' => 'Ingénieur civil avec 20 ans d\'expérience dans la construction en Afrique.',
                'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
                'is_active' => true,
                'order' => 0,
            ],
            [
                'name' => 'Aminata Kone',
                'role' => 'Directrice Architecture',
                'bio' => 'Architecte diplômée spécialisée en architecture contemporaine africaine.',
                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Ibrahim Traoré',
                'role' => 'Chef de Projets',
                'bio' => 'Expert en gestion de projets complexes et coordination d\'équipes.',
                'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Fatoumata Sy',
                'role' => 'Directrice Qualité',
                'bio' => 'Ingénieure qualité garante des normes et standards d\'excellence.',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
                'is_active' => true,
                'order' => 3,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create($member);
        }
    }
}
