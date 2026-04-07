<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $palmiers = Project::where('slug', 'residence-les-palmiers')->first();

        $testimonials = [
            [
                'name' => 'Amadou Diallo',
                'role' => 'PDG, Groupe Atlantique',
                'company' => 'Groupe Atlantique',
                'content' => 'MAC a dépassé nos attentes sur notre projet de siège social. Professionnalisme remarquable et respect des délais.',
                'image' => 'https://i.pravatar.cc/150?u=amadou',
                'rating' => 5,
                'is_active' => true,
                'order' => 0,
            ],
            [
                'name' => 'Fatou Kone',
                'role' => 'Directrice, Hôtel Prestige',
                'company' => 'Hôtel Prestige',
                'content' => 'La qualité de construction et l\'attention aux détails de MAC ont fait de notre hôtel une référence dans la région.',
                'image' => 'https://i.pravatar.cc/150?u=fatou',
                'rating' => 5,
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Moussa Traoré',
                'role' => 'Investisseur Immobilier',
                'company' => null,
                'content' => 'Une équipe d\'experts à l\'écoute. Le suivi de chantier est transparent et rassurant.',
                'image' => 'https://i.pravatar.cc/150?u=moussa',
                'rating' => 5,
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Sarah Mendy',
                'role' => 'Propriétaire Résidentielle',
                'company' => null,
                'content' => 'Leur approche innovante et le respect des normes environnementales m\'ont convaincue. Une expérience sans faille.',
                'image' => 'https://i.pravatar.cc/150?u=sarah',
                'rating' => 5,
                'is_active' => true,
                'order' => 3,
            ],
            [
                'name' => 'Amadou Diallo',
                'role' => 'PDG, Groupe Immobilier Dakar',
                'company' => 'Groupe Immobilier Dakar',
                'content' => 'MAC a dépassé toutes nos attentes sur ce projet. Leur professionnalisme, leur respect des délais et la qualité exceptionnelle de leur travail font d\'eux votre partenaire de référence pour tous vos futurs projets immobiliers.',
                'image' => 'https://i.pravatar.cc/150?u=amadou',
                'rating' => 5,
                'project_id' => $palmiers?->id,
                'is_active' => true,
                'order' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
