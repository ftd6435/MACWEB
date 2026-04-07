<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::factory()->create([
            'name' => 'Admin MAC',
            'email' => 'admin@mac-construction.com',
            'role' => 'admin',
        ]);

        $this->call([
            SiteSettingsSeeder::class,
            HeroSlidesSeeder::class,
            PageSectionsSeeder::class,
            ServicesSeeder::class,       // Creates project categories too
            ProjectsSeeder::class,       // Depends on categories
            ArticlesSeeder::class,       // Creates blog categories, tags, author users
            TeamSeeder::class,
            TestimonialsSeeder::class,   // Depends on projects
            TimelineSeeder::class,
            StatsSeeder::class,
            ValuesSeeder::class,
            CertificationsSeeder::class,
            OfficesSeeder::class,
            SocialLinksSeeder::class,
            JobListingsSeeder::class,
        ]);
    }
}
