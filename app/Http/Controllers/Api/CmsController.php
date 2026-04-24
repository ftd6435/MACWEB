<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Certification;
use App\Models\HeroSlide;
use App\Models\JobListing;
use App\Models\Office;
use App\Models\PageSection;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\SocialLink;
use App\Models\Stat;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TimelineMilestone;
use App\Models\Value;

class CmsController extends Controller
{
    public function getGlobalData()
    {
        return response()->json([
            'settings' => SiteSetting::all()->groupBy('group'),
            'services' => Service::where('is_active', true)->orderBy('order')->get(),
            'stats' => Stat::orderBy('order')->get()->groupBy('group'),
            'offices' => Office::where('is_active', true)->orderBy('order')->get(),
            'social_links' => SocialLink::where('is_active', true)->orderBy('order')->get(),
        ]);
    }

    public function getHomeData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('home')->get(),
            'sections' => PageSection::forPage('home')->get()->keyBy('section_key'),
            'services' => Service::where('is_active', true)->orderBy('order')->take(4)->get(),
            'testimonials' => Testimonial::where('is_active', true)->orderBy('order')->get(),
            'featured_projects' => Project::published()->where('is_featured', true)->with(['category', 'service'])->take(6)->get(),
            'recent_articles' => Article::where('is_published', true)->orderBy('published_at', 'desc')->with(['category', 'author'])->take(3)->get(),
            'stats' => Stat::where('group', 'home')->orderBy('order')->get(),
            'home_features' => Stat::where('group', 'home_features')->orderBy('order')->get(),
        ]);
    }

    public function getServicesData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('services')->get(),
            'sections' => PageSection::forPage('services')->get()->keyBy('section_key'),
            'services' => Service::where('is_active', true)->orderBy('order')->get(),
            'stats' => Stat::where('group', 'services')->orderBy('order')->get(),
        ]);
    }

    public function getProjectsData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('projects')->get(),
            'sections' => PageSection::forPage('projects')->get()->keyBy('section_key'),
            'categories' => Category::where('type', 'project')->withCount(['projects' => function ($q) {
                $q->where('is_published', true);
            }])->get(),
        ]);
    }

    public function getBlogData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('blog')->get(),
            'sections' => PageSection::forPage('blog')->get()->keyBy('section_key'),
            'categories' => Category::where('type', 'article')->withCount(['articles' => function ($q) {
                $q->where('is_published', true);
            }])->get(),
        ]);
    }

    public function getAboutData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('about')->get(),
            'sections' => PageSection::forPage('about')->get()->keyBy('section_key'),
            'team' => TeamMember::where('is_active', true)->orderBy('order')->get(),
            'timeline' => TimelineMilestone::orderBy('order')->get(),
            'values' => Value::where('is_active', true)->orderBy('order')->get(),
            'certifications' => Certification::where('is_active', true)->orderBy('order')->get(),
            'stats' => Stat::where('group', 'about')->orderBy('order')->get(),
        ]);
    }

    public function getContactData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('contact')->get(),
            'sections' => PageSection::forPage('contact')->get()->keyBy('section_key'),
            'offices' => Office::where('is_active', true)->orderBy('order')->get(),
        ]);
    }

    public function getCareersData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('careers')->get(),
            'sections' => PageSection::forPage('careers')->get()->keyBy('section_key'),
            'job_listings' => JobListing::where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
                })
                ->orderBy('published_at', 'desc')
                ->get(),
            'benefits' => Stat::where('group', 'careers_benefits')->orderBy('order')->get(),
        ]);
    }

    public function getPartnershipData()
    {
        return response()->json([
            'hero_slides' => HeroSlide::forPage('partnership')->get(),
            'sections' => PageSection::forPage('partnership')->get()->keyBy('section_key'),
            'why_partner_items' => Stat::where('group', 'partnership_advantages')->orderBy('order')->get(),
            'partners' => Stat::where('group', 'partners')->orderBy('order')->get(),
        ]);
    }
}
