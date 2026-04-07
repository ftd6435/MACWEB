<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticlesSeeder extends Seeder
{
    public function run(): void
    {
        // Create blog categories
        $categories = [
            ['name' => 'Conseils Construction', 'slug' => 'conseils-construction', 'type' => 'article'],
            ['name' => 'Innovations BTP', 'slug' => 'innovations-btp', 'type' => 'article'],
            ['name' => 'Actualités MAC', 'slug' => 'actualites-mac', 'type' => 'article'],
            ['name' => 'Réglementations', 'slug' => 'reglementations', 'type' => 'article'],
            ['name' => 'Études de Cas', 'slug' => 'etudes-de-cas', 'type' => 'article'],
            ['name' => 'Tendances du Secteur', 'slug' => 'tendances-du-secteur', 'type' => 'article'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
        }

        // Create tags
        $tagNames = ['Durable', 'Innovation', 'Afrique', 'BTP', 'Écologie', 'Planification', 'Gestion de Projet', 'IA', 'Technologie', 'Formation', 'Sismique', 'Normes'];
        $tags = [];
        foreach ($tagNames as $name) {
            $tags[$name] = Tag::firstOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($name)],
                ['name' => $name]
            );
        }

        // Create author users
        $amadou = User::firstOrCreate(
            ['email' => 'amadou.diallo@mac-construction.com'],
            ['name' => 'Amadou Diallo', 'password' => bcrypt('password'), 'role' => 'editor', 'bio' => 'Expert en construction durable avec plus de 15 ans d\'expérience dans les projets d\'infrastructure en Afrique de l\'Ouest.']
        );
        $fatou = User::firstOrCreate(
            ['email' => 'fatou.kone@mac-construction.com'],
            ['name' => 'Fatou Kone', 'password' => bcrypt('password'), 'role' => 'editor', 'bio' => 'Spécialiste en gestion de projets BTP et optimisation des processus de construction.']
        );
        $ibrahim = User::firstOrCreate(
            ['email' => 'ibrahim.traore@mac-construction.com'],
            ['name' => 'Ibrahim Traoré', 'password' => bcrypt('password'), 'role' => 'editor', 'bio' => 'Expert en technologies de construction et intelligence artificielle appliquée au BTP.']
        );
        $equipe = User::firstOrCreate(
            ['email' => 'equipe@mac-construction.com'],
            ['name' => 'Équipe MAC', 'password' => bcrypt('password'), 'role' => 'editor', 'bio' => 'L\'équipe de rédaction de MAC Construction.']
        );
        $moussa = User::firstOrCreate(
            ['email' => 'moussa.diop@mac-construction.com'],
            ['name' => 'Moussa Diop', 'password' => bcrypt('password'), 'role' => 'editor', 'bio' => 'Ingénieur structure et expert en réglementations de construction en Afrique de l\'Ouest.']
        );

        $innovationsBtp = Category::where('slug', 'innovations-btp')->first();
        $conseilsConstruction = Category::where('slug', 'conseils-construction')->first();
        $actualitesMac = Category::where('slug', 'actualites-mac')->first();
        $reglementations = Category::where('slug', 'reglementations')->first();

        // Article 1 — Featured
        $article1 = Article::create([
            'title' => 'L\'Avenir de la Construction Durable en Afrique : Technologies et Innovations',
            'slug' => 'avenir-construction-durable',
            'excerpt' => 'Découvrez comment les nouvelles technologies transforment l\'industrie du BTP en Afrique. De l\'utilisation de matériaux locaux innovants aux techniques de construction écologiques...',
            'content' => '<h2>Le Retour aux Matériaux Locaux</h2><p>L\'Afrique dispose d\'une richesse incroyable en matériaux de construction naturels. La latérite, le bambou, la terre crue compressée — ces matériaux ancestraux connaissent aujourd\'hui un renouveau remarquable grâce aux avancées technologiques.</p><h2>L\'Efficacité Énergétique Passive</h2><p>La conception bioclimatique adaptée au contexte africain permet de réduire considérablement les besoins en climatisation. L\'orientation des bâtiments, la ventilation naturelle croisée et les protections solaires comme les brise-soleil constituent des solutions passives efficaces.</p><h2>Les Innovations Technologiques</h2><p>L\'impression 3D de bâtiments, les drones pour le suivi de chantier, et le Building Information Modeling (BIM) transforment la manière dont nous construisons en Afrique. Ces technologies réduisent les coûts, les délais et l\'impact environnemental.</p><h2>Conclusion</h2><p>L\'avenir de la construction en Afrique est résolument tourné vers la durabilité. Les innovations technologiques, combinées à la sagesse des pratiques traditionnelles, ouvrent la voie à un développement urbain responsable et adapté au continent.</p>',
            'image' => 'https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=1200',
            'author_id' => $amadou->id,
            'category_id' => $innovationsBtp?->id,
            'read_time' => 8,
            'is_published' => true,
            'is_featured' => true,
            'published_at' => '2024-12-20',
            'toc' => json_encode(['Le Retour aux Matériaux Locaux', 'L\'Efficacité Énergétique Passive', 'Les Innovations Technologiques', 'Conclusion']),
        ]);
        $article1->tags()->sync([$tags['Durable']->id, $tags['Innovation']->id, $tags['Afrique']->id, $tags['BTP']->id, $tags['Écologie']->id]);

        // Article 2
        $article2 = Article::create([
            'title' => 'Optimiser la Planification de Votre Projet de Construction',
            'slug' => 'optimiser-planification-projet',
            'excerpt' => 'Les étapes essentielles pour assurer le succès de votre projet, de la conception initiale à la livraison finale. Découvrez nos méthodes éprouvées.',
            'content' => '<p>La planification est la clé du succès de tout projet de construction. Un bon plan anticipe les obstacles, optimise les ressources et garantit le respect des délais.</p><p>Chez MAC, nous avons développé une méthodologie en 5 phases qui a fait ses preuves sur plus de 200 projets livrés avec succès.</p>',
            'image' => 'https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=800',
            'author_id' => $fatou->id,
            'category_id' => $conseilsConstruction?->id,
            'read_time' => 6,
            'is_published' => true,
            'is_featured' => false,
            'published_at' => '2024-12-18',
        ]);
        $article2->tags()->sync([$tags['Planification']->id, $tags['Gestion de Projet']->id]);

        // Article 3
        $article3 = Article::create([
            'title' => 'L\'Intelligence Artificielle au Service du BTP',
            'slug' => 'intelligence-artificielle-btp',
            'excerpt' => 'Comment l\'IA révolutionne la gestion des chantiers et améliore l\'efficacité des projets de construction en Afrique.',
            'content' => '<p>L\'intelligence artificielle transforme profondément l\'industrie de la construction. Des algorithmes prédictifs aux systèmes de surveillance automatisés, les possibilités sont immenses.</p>',
            'image' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800',
            'author_id' => $ibrahim->id,
            'category_id' => $innovationsBtp?->id,
            'read_time' => 5,
            'is_published' => true,
            'published_at' => '2024-12-16',
        ]);
        $article3->tags()->sync([$tags['IA']->id, $tags['Technologie']->id, $tags['BTP']->id]);

        // Article 4
        $article4 = Article::create([
            'title' => 'MAC Inaugure son Nouveau Centre de Formation',
            'slug' => 'nouveau-centre-formation-mac',
            'excerpt' => 'Un investissement majeur dans la formation des jeunes talents du BTP pour répondre aux défis de construction de demain.',
            'content' => '<p>MAC est fier d\'annoncer l\'ouverture de son centre de formation dédié aux métiers de la construction. Cet investissement reflète notre engagement envers le développement des compétences locales.</p>',
            'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800',
            'author_id' => $equipe->id,
            'category_id' => $actualitesMac?->id,
            'read_time' => 4,
            'is_published' => true,
            'published_at' => '2024-12-14',
        ]);
        $article4->tags()->sync([$tags['Formation']->id, $tags['Afrique']->id]);

        // Article 5
        $article5 = Article::create([
            'title' => 'Nouvelles Réglementations Sismiques en Afrique de l\'Ouest',
            'slug' => 'reglementations-sismiques-afrique',
            'excerpt' => 'Comprendre les nouvelles normes parasismiques et leur impact sur vos projets de construction résidentielle et commerciale.',
            'content' => '<p>Les nouvelles réglementations sismiques en Afrique de l\'Ouest marquent un tournant important pour l\'industrie de la construction. Ces normes, inspirées des standards internationaux, visent à garantir la sécurité des occupants.</p>',
            'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
            'author_id' => $moussa->id,
            'category_id' => $reglementations?->id,
            'read_time' => 7,
            'is_published' => true,
            'published_at' => '2024-12-12',
        ]);
        $article5->tags()->sync([$tags['Sismique']->id, $tags['Normes']->id, $tags['BTP']->id]);
    }
}
