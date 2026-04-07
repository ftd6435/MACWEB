<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\ContactSubmission;
use App\Models\HeroSlide;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Models\NewsletterSubscriber;
use App\Models\Office;
use App\Models\PageSection;
use App\Models\PartnershipRequest;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\SocialLink;
use App\Models\Stat;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TimelineMilestone;
use App\Models\Value;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CmsAdminController extends Controller
{
    // ─── Services ────────────────────────────────────────────
    public function services()
    {
        return response()->json(Service::orderBy('order')->get());
    }

    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'sub_services' => 'nullable|array',
            'process_steps' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $validated['slug'] = Str::slug($validated['title']);

        return response()->json(Service::create($validated), 201);
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'long_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'sub_services' => 'nullable|array',
            'process_steps' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        $service->update($validated);

        return response()->json($service);
    }

    public function destroyService(Service $service)
    {
        $service->delete();

        return response()->json(null, 204);
    }

    // ─── Team ────────────────────────────────────────────────
    public function team()
    {
        return response()->json(TeamMember::orderBy('order')->get());
    }

    public function storeTeamMember(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'email' => 'nullable|email',
            'twitter' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(TeamMember::create($validated), 201);
    }

    public function updateTeamMember(Request $request, TeamMember $member)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'role' => 'string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'email' => 'nullable|email',
            'twitter' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $member->update($validated);

        return response()->json($member);
    }

    public function destroyTeamMember(TeamMember $member)
    {
        $member->delete();

        return response()->json(null, 204);
    }

    // ─── Testimonials ────────────────────────────────────────
    public function testimonials()
    {
        return response()->json(Testimonial::orderBy('order')->get());
    }

    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'project_id' => 'nullable|exists:projects,id',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(Testimonial::create($validated), 201);
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'role' => 'string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'string',
            'image' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'project_id' => 'nullable|exists:projects,id',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $testimonial->update($validated);

        return response()->json($testimonial);
    }

    public function destroyTestimonial(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json(null, 204);
    }

    // ─── Timeline ────────────────────────────────────────────
    public function timeline()
    {
        return response()->json(TimelineMilestone::orderBy('order')->get());
    }

    public function storeMilestone(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        return response()->json(TimelineMilestone::create($validated), 201);
    }

    public function updateMilestone(Request $request, TimelineMilestone $milestone)
    {
        $validated = $request->validate([
            'year' => 'string',
            'title' => 'string',
            'description' => 'string',
            'icon' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);
        $milestone->update($validated);

        return response()->json($milestone);
    }

    public function destroyMilestone(TimelineMilestone $milestone)
    {
        $milestone->delete();

        return response()->json(null, 204);
    }

    // ─── Stats ───────────────────────────────────────────────
    public function stats()
    {
        return response()->json(Stat::orderBy('order')->get());
    }

    public function storeStat(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string',
            'value' => 'required|string',
            'sub_label' => 'nullable|string',
            'icon' => 'nullable|string',
            'group' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        return response()->json(Stat::create($validated), 201);
    }

    public function updateStat(Request $request, Stat $stat)
    {
        $validated = $request->validate([
            'label' => 'string',
            'value' => 'string',
            'sub_label' => 'nullable|string',
            'icon' => 'nullable|string',
            'group' => 'string',
            'order' => 'nullable|integer',
        ]);
        $stat->update($validated);

        return response()->json($stat);
    }

    public function destroyStat(Stat $stat)
    {
        $stat->delete();

        return response()->json(null, 204);
    }

    // ─── Settings ────────────────────────────────────────────
    public function settings()
    {
        return response()->json(SiteSetting::all()->groupBy('group'));
    }

    public function updateSettings(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return response()->json(['message' => 'Settings updated']);
    }

    // ─── Hero Slides ─────────────────────────────────────────
    public function heroSlides(Request $request)
    {
        $query = HeroSlide::orderBy('page')->orderBy('order');
        if ($request->has('page')) {
            $query->where('page', $request->page);
        }

        return response()->json($query->get());
    }

    public function storeHeroSlide(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'cta_text' => 'nullable|string',
            'cta_link' => 'nullable|string',
            'cta_secondary_text' => 'nullable|string',
            'cta_secondary_link' => 'nullable|string',
            'image' => 'nullable|string',
            'overlay_opacity' => 'nullable|integer|min:0|max:100',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(HeroSlide::create($validated), 201);
    }

    public function updateHeroSlide(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'page' => 'string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'cta_text' => 'nullable|string',
            'cta_link' => 'nullable|string',
            'cta_secondary_text' => 'nullable|string',
            'cta_secondary_link' => 'nullable|string',
            'image' => 'nullable|string',
            'overlay_opacity' => 'nullable|integer|min:0|max:100',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $heroSlide->update($validated);

        return response()->json($heroSlide);
    }

    public function destroyHeroSlide(HeroSlide $heroSlide)
    {
        $heroSlide->delete();

        return response()->json(null, 204);
    }

    // ─── Page Sections ───────────────────────────────────────
    public function pageSections(Request $request)
    {
        $query = PageSection::orderBy('page')->orderBy('order');
        if ($request->has('page')) {
            $query->where('page', $request->page);
        }

        return response()->json($query->get());
    }

    public function storePageSection(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string',
            'section_key' => 'required|string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'extra' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(PageSection::create($validated), 201);
    }

    public function updatePageSection(Request $request, PageSection $pageSection)
    {
        $validated = $request->validate([
            'page' => 'string',
            'section_key' => 'string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'extra' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $pageSection->update($validated);

        return response()->json($pageSection);
    }

    public function destroyPageSection(PageSection $pageSection)
    {
        $pageSection->delete();

        return response()->json(null, 204);
    }

    // ─── Offices ─────────────────────────────────────────────
    public function offices()
    {
        return response()->json(Office::orderBy('order')->get());
    }

    public function storeOffice(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'image' => 'nullable|string',
            'is_headquarters' => 'boolean',
            'map_lat' => 'nullable|numeric',
            'map_lng' => 'nullable|numeric',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(Office::create($validated), 201);
    }

    public function updateOffice(Request $request, Office $office)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'city' => 'string|max:255',
            'country' => 'string|max:255',
            'address' => 'string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'image' => 'nullable|string',
            'is_headquarters' => 'boolean',
            'map_lat' => 'nullable|numeric',
            'map_lng' => 'nullable|numeric',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $office->update($validated);

        return response()->json($office);
    }

    public function destroyOffice(Office $office)
    {
        $office->delete();

        return response()->json(null, 204);
    }

    // ─── Social Links ────────────────────────────────────────
    public function socialLinks()
    {
        return response()->json(SocialLink::orderBy('order')->get());
    }

    public function storeSocialLink(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(SocialLink::create($validated), 201);
    }

    public function updateSocialLink(Request $request, SocialLink $socialLink)
    {
        $validated = $request->validate([
            'platform' => 'string|max:255',
            'url' => 'url',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $socialLink->update($validated);

        return response()->json($socialLink);
    }

    public function destroySocialLink(SocialLink $socialLink)
    {
        $socialLink->delete();

        return response()->json(null, 204);
    }

    // ─── Values ──────────────────────────────────────────────
    public function values()
    {
        return response()->json(Value::orderBy('order')->get());
    }

    public function storeValue(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(Value::create($validated), 201);
    }

    public function updateValue(Request $request, Value $value)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $value->update($validated);

        return response()->json($value);
    }

    public function destroyValue(Value $value)
    {
        $value->delete();

        return response()->json(null, 204);
    }

    // ─── Certifications ──────────────────────────────────────
    public function certifications()
    {
        return response()->json(Certification::orderBy('order')->get());
    }

    public function storeCertification(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        return response()->json(Certification::create($validated), 201);
    }

    public function updateCertification(Request $request, Certification $certification)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'code' => 'nullable|string',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);
        $certification->update($validated);

        return response()->json($certification);
    }

    public function destroyCertification(Certification $certification)
    {
        $certification->delete();

        return response()->json(null, 204);
    }

    // ─── Job Listings ────────────────────────────────────────
    public function jobListings()
    {
        return response()->json(JobListing::withCount('applications')->orderBy('created_at', 'desc')->get());
    }

    public function storeJobListing(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:job_listings',
            'department' => 'nullable|string',
            'location' => 'nullable|string',
            'contract_type' => 'nullable|string',
            'description' => 'required|string',
            'requirements' => 'nullable|array',
            'responsibilities' => 'nullable|array',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date',
        ]);

        return response()->json(JobListing::create($validated), 201);
    }

    public function updateJobListing(Request $request, JobListing $jobListing)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'string|unique:job_listings,slug,'.$jobListing->id,
            'department' => 'nullable|string',
            'location' => 'nullable|string',
            'contract_type' => 'nullable|string',
            'description' => 'string',
            'requirements' => 'nullable|array',
            'responsibilities' => 'nullable|array',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date',
        ]);
        $jobListing->update($validated);

        return response()->json($jobListing);
    }

    public function destroyJobListing(JobListing $jobListing)
    {
        $jobListing->delete();

        return response()->json(null, 204);
    }

    // ─── Job Applications (Admin read-only + status) ─────────
    public function jobApplications(Request $request)
    {
        $query = JobApplication::with('jobListing')->orderBy('created_at', 'desc');
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(20));
    }

    public function updateJobApplication(Request $request, JobApplication $jobApplication)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,reviewed,shortlisted,rejected,hired',
            'admin_notes' => 'nullable|string',
        ]);
        $jobApplication->update($validated);

        return response()->json($jobApplication);
    }

    public function destroyJobApplication(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return response()->json(null, 204);
    }

    // ─── Contact Submissions (Admin read-only + status) ──────
    public function contactSubmissions(Request $request)
    {
        $query = ContactSubmission::orderBy('created_at', 'desc');
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(20));
    }

    public function updateContactSubmission(Request $request, ContactSubmission $contactSubmission)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,read,replied,archived',
            'admin_notes' => 'nullable|string',
            'replied_at' => 'nullable|date',
        ]);
        $contactSubmission->update($validated);

        return response()->json($contactSubmission);
    }

    public function destroyContactSubmission(ContactSubmission $contactSubmission)
    {
        $contactSubmission->delete();

        return response()->json(null, 204);
    }

    // ─── Newsletter Subscribers (Admin) ──────────────────────
    public function newsletterSubscribers()
    {
        return response()->json(NewsletterSubscriber::orderBy('created_at', 'desc')->paginate(20));
    }

    public function destroyNewsletterSubscriber(NewsletterSubscriber $subscriber)
    {
        $subscriber->delete();

        return response()->json(null, 204);
    }

    // ─── Partnership Requests (Admin) ────────────────────────
    public function partnershipRequests(Request $request)
    {
        $query = PartnershipRequest::orderBy('created_at', 'desc');
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(20));
    }

    public function updatePartnershipRequest(Request $request, PartnershipRequest $partnershipRequest)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,reviewed,accepted,rejected',
            'admin_notes' => 'nullable|string',
        ]);
        $partnershipRequest->update($validated);

        return response()->json($partnershipRequest);
    }

    public function destroyPartnershipRequest(PartnershipRequest $partnershipRequest)
    {
        $partnershipRequest->delete();

        return response()->json(null, 204);
    }
}
