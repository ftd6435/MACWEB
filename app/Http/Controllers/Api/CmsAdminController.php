<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\TeamMember;
use App\Models\TimelineMilestone;
use App\Models\Stat;
use Illuminate\Http\Request;

class CmsAdminController extends Controller
{
    // Services
    public function services() { return response()->json(Service::orderBy('order')->get()); }
    public function storeService(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);
        return response()->json(Service::create($validated), 201);
    }
    public function updateService(Request $request, Service $service) {
        $service->update($request->all());
        return response()->json($service);
    }
    public function destroyService(Service $service) {
        $service->delete();
        return response()->json(null, 204);
    }

    // Team
    public function team() { return response()->json(TeamMember::orderBy('order')->get()); }
    public function storeTeamMember(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'is_active' => 'boolean',
        ]);
        return response()->json(TeamMember::create($validated), 201);
    }
    public function updateTeamMember(Request $request, TeamMember $member) {
        $member->update($request->all());
        return response()->json($member);
    }
    public function destroyTeamMember(TeamMember $member) {
        $member->delete();
        return response()->json(null, 204);
    }

    // Testimonials
    public function testimonials() { return response()->json(Testimonial::orderBy('order')->get()); }
    public function storeTestimonial(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'content' => 'required|string',
            'is_active' => 'boolean',
        ]);
        return response()->json(Testimonial::create($validated), 201);
    }
    public function updateTestimonial(Request $request, Testimonial $testimonial) {
        $testimonial->update($request->all());
        return response()->json($testimonial);
    }
    public function destroyTestimonial(Testimonial $testimonial) {
        $testimonial->delete();
        return response()->json(null, 204);
    }

    // Timeline
    public function timeline() { return response()->json(TimelineMilestone::orderBy('order')->get()); }
    public function storeMilestone(Request $request) {
        $validated = $request->validate([
            'year' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);
        return response()->json(TimelineMilestone::create($validated), 201);
    }
    public function updateMilestone(Request $request, TimelineMilestone $milestone) {
        $milestone->update($request->all());
        return response()->json($milestone);
    }
    public function destroyMilestone(TimelineMilestone $milestone) {
        $milestone->delete();
        return response()->json(null, 204);
    }

    // Stats
    public function stats() { return response()->json(Stat::orderBy('order')->get()); }
    public function storeStat(Request $request) {
        $validated = $request->validate([
            'label' => 'required|string',
            'value' => 'required|string',
            'group' => 'required|string',
        ]);
        return response()->json(Stat::create($validated), 201);
    }
    public function updateStat(Request $request, Stat $stat) {
        $stat->update($request->all());
        return response()->json($stat);
    }
    public function destroyStat(Stat $stat) {
        $stat->delete();
        return response()->json(null, 204);
    }

    // Settings
    public function settings() { return response()->json(SiteSetting::all()->groupBy('group')); }
    public function updateSettings(Request $request) {
        foreach ($request->all() as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        return response()->json(['message' => 'Settings updated']);
    }
}
