<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\TeamMember;
use App\Models\TimelineMilestone;
use App\Models\Stat;
use App\Models\Article;
use App\Models\Project;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    public function getGlobalData()
    {
        return response()->json([
            'settings' => SiteSetting::all()->groupBy('group'),
            'services' => Service::where('is_active', true)->orderBy('order')->get(),
            'stats' => Stat::orderBy('order')->get()->groupBy('group'),
        ]);
    }

    public function getHomeData()
    {
        return response()->json([
            'testimonials' => Testimonial::where('is_active', true)->orderBy('order')->get(),
            'featured_projects' => Project::where('is_featured', true)->with('category')->take(6)->get(),
            'recent_articles' => Article::where('is_published', true)->orderBy('created_at', 'desc')->with(['category', 'author'])->take(3)->get(),
        ]);
    }

    public function getAboutData()
    {
        return response()->json([
            'team' => TeamMember::where('is_active', true)->orderBy('order')->get(),
            'timeline' => TimelineMilestone::orderBy('order')->get(),
        ]);
    }
}
