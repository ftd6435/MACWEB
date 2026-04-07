<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinksSeeder extends Seeder
{
    public function run(): void
    {
        $links = [
            ['platform' => 'Facebook', 'url' => 'https://facebook.com/mac-construction', 'icon' => 'Facebook', 'order' => 0],
            ['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/company/mac-construction', 'icon' => 'Linkedin', 'order' => 1],
            ['platform' => 'Twitter', 'url' => 'https://twitter.com/mac_construction', 'icon' => 'Twitter', 'order' => 2],
            ['platform' => 'Instagram', 'url' => 'https://instagram.com/mac_construction', 'icon' => 'Instagram', 'order' => 3],
        ];

        foreach ($links as $link) {
            SocialLink::create($link);
        }
    }
}
