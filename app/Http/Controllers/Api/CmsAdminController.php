<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\BrandedOutboundMessage;
use App\Models\Article;
use App\Models\Certification;
use App\Models\Comment;
use App\Models\ContactSubmission;
use App\Models\HeroSlide;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Models\Media;
use App\Models\NewsletterSubscriber;
use App\Models\Office;
use App\Models\PageSection;
use App\Models\PartnershipRequest;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\SocialLink;
use App\Models\Stat;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TimelineMilestone;
use App\Models\User;
use App\Models\Value;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CmsAdminController extends Controller
{
    private function uniqueJobListingSlug(string $baseSlug, ?int $ignoreId = null): string
    {
        $baseSlug = trim($baseSlug);
        $slug = $baseSlug !== '' ? $baseSlug : Str::uuid()->toString();

        $i = 2;
        while (
            JobListing::where('slug', $slug)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = $baseSlug . '-' . $i;
            $i++;
        }

        return $slug;
    }

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
        return response()->json(Testimonial::with('project')->orderBy('order')->get());
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
            'project_id' => 'required|exists:projects,id',
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
            'project_id' => 'sometimes|required|exists:projects,id',
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
        // Define which keys belong to which group
        $groupMapping = [
            'general' => [
                'company_name',
                'company_tagline',
                'company_short_name',
                'founded_year',
                'footer_description',
                'copyright_text',
                'work_process',
                'team_size_note'
            ],
            'contact' => [
                'main_email',
                'main_phone',
                'main_address',
                'hr_email',
                'opening_hours',
                'response_time',
                'map_lat',
                'map_lng',
                'map_embed_url'
            ],
            'appearance' => [
                'header_logo',
                'footer_logo',
                'primary_color'
            ],
        ];

        foreach ($request->all() as $key => $value) {
            // Determine the group for this key
            $group = 'general'; // default group
            foreach ($groupMapping as $groupName => $keys) {
                if (in_array($key, $keys)) {
                    $group = $groupName;
                    break;
                }
            }

            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $group]
            );
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
            'slug' => 'nullable|string|unique:job_listings',
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

        $baseSlug = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['slug'] = $this->uniqueJobListingSlug($baseSlug);

        return response()->json(JobListing::create($validated), 201);
    }

    public function updateJobListing(Request $request, JobListing $jobListing)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'nullable|string|unique:job_listings,slug,' . $jobListing->id,
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

        if (array_key_exists('slug', $validated) && $validated['slug'] !== null) {
            $validated['slug'] = $this->uniqueJobListingSlug(
                $validated['slug'],
                $jobListing->id,
            );
        }
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
            'status' => 'required|string|in:new,reviewed,invited_interview,interviewed,rejected,rejected_after_interview,hired',
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

    public function downloadJobApplicationResume(JobApplication $jobApplication)
    {
        if (! $jobApplication->resume_path) {
            return response()->json(['message' => 'Aucun CV disponible'], 404);
        }

        $relativePath = (string) $jobApplication->resume_path;
        if (str_starts_with($relativePath, 'private/')) {
            $relativePath = substr($relativePath, strlen('private/'));
        }

        $disk = Storage::disk('local'); // storage/app/private
        if (! $disk->exists($relativePath)) {
            return response()->json(['message' => 'Fichier introuvable'], 404);
        }

        $fullPath = $disk->path($relativePath);
        $ext = pathinfo($fullPath, PATHINFO_EXTENSION);
        $safeName = 'cv-' . $jobApplication->id . ($ext ? '.' . $ext : '');

        return response()->download($fullPath, $safeName);
    }

    public function sendLeadEmail(Request $request)
    {
        $validated = $request->validate([
            'source' => 'required|string|in:contact,career,partnership',
            'id' => 'required|integer',
            'to' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'body' => 'required|string|max:10000',
        ], [
            'to.required' => "L'email destinataire est obligatoire.",
            'to.email' => "L'email destinataire doit être valide.",
            'subject.required' => "L'objet est obligatoire.",
            'body.required' => 'Le message est obligatoire.',
        ]);

        $hrEmail = SiteSetting::where('key', 'hr_email')->value('value')
            ?: SiteSetting::where('key', 'main_email')->value('value');
        $companyName = SiteSetting::where('key', 'company_name')->value('value')
            ?: config('app.name', 'MAC');

        $appUrl = rtrim((string) config('app.url', ''), '/');
        $logoPath = SiteSetting::where('key', 'header_logo')->value('value') ?: '/img/logo.png';
        $logoUrl = null;
        if ($appUrl) {
            if (is_string($logoPath) && preg_match('/^https?:\/\//i', $logoPath)) {
                $logoUrl = $logoPath;
            } elseif (is_string($logoPath)) {
                $logoUrl = str_starts_with($logoPath, '/')
                    ? $appUrl . $logoPath
                    : $appUrl . '/' . $logoPath;
            }
        }

        $leadName = null;
        if ($validated['source'] === 'career') {
            $leadName = JobApplication::where('id', $validated['id'])->value('name');
        } elseif ($validated['source'] === 'contact') {
            $leadName = ContactSubmission::where('id', $validated['id'])->value('name');
        } else {
            $leadName = PartnershipRequest::where('id', $validated['id'])->value('contact_person');
        }

        Mail::to($validated['to'])->queue(
            new BrandedOutboundMessage(
                $validated['subject'],
                $validated['body'],
                $companyName,
                $logoUrl,
                null,
                $hrEmail,
                $companyName,
            )
        );

        return response()->json(['success' => true]);
    }

    public function sendJobListingRejectionEmails(Request $request, JobListing $jobListing)
    {
        $validated = $request->validate([
            'include_after_interview' => 'nullable|boolean',
        ]);

        $includeAfterInterview = (bool) ($validated['include_after_interview'] ?? true);

        $companyName = SiteSetting::where('key', 'company_name')->value('value')
            ?: config('app.name', 'MAC');
        $hrEmail = SiteSetting::where('key', 'hr_email')->value('value')
            ?: SiteSetting::where('key', 'main_email')->value('value');

        $appUrl = rtrim((string) config('app.url', ''), '/');
        $logoPath = SiteSetting::where('key', 'header_logo')->value('value') ?: '/img/logo.png';
        $logoUrl = null;
        if ($appUrl) {
            if (is_string($logoPath) && preg_match('/^https?:\/\//i', $logoPath)) {
                $logoUrl = $logoPath;
            } elseif (is_string($logoPath)) {
                $logoUrl = str_starts_with($logoPath, '/')
                    ? $appUrl . $logoPath
                    : $appUrl . '/' . $logoPath;
            }
        }

        $statuses = ['rejected'];
        if ($includeAfterInterview) {
            $statuses[] = 'rejected_after_interview';
        }

        $query = JobApplication::where('job_listing_id', $jobListing->id)
            ->whereIn('status', $statuses)
            ->whereNull('rejection_emailed_at');

        $total = (clone $query)->count();
        if ($total === 0) {
            return response()->json([
                'success' => true,
                'queued' => 0,
                'message' => 'Aucune candidature rejetée à notifier pour cette offre.',
            ]);
        }

        $subject = "Suite à votre candidature — {$jobListing->title}";
        $heading = 'Suite à votre candidature';

        $queued = 0;
        $now = now();

        $query->orderBy('id')->chunkById(100, function ($apps) use (
            &$queued,
            $companyName,
            $logoUrl,
            $hrEmail,
            $subject,
            $heading,
            $jobListing,
            $now
        ) {
            foreach ($apps as $app) {
                $body =
                    "Bonjour {$app->name},\n\n"
                    . "Nous vous remercions d’avoir pris le temps de postuler au poste « {$jobListing->title} ».\n\n"
                    . "Après étude attentive de votre candidature, nous ne pouvons malheureusement pas y donner une suite favorable à ce stade.\n\n"
                    . "Nous vous remercions pour l’intérêt porté à {$companyName} et vous souhaitons pleine réussite dans vos démarches.\n\n"
                    . "Cordialement,\n"
                    . 'Équipe RH';

                Mail::to($app->email)->queue(
                    new BrandedOutboundMessage(
                        $subject,
                        $body,
                        $companyName,
                        $logoUrl,
                        $heading,
                        $hrEmail,
                        $companyName,
                    )
                );
                $app->rejection_emailed_at = $now;
                $app->save();
                $queued++;
            }
        });

        return response()->json([
            'success' => true,
            'queued' => $queued,
        ]);
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

    public function leadsUnreadCounts()
    {
        return response()->json([
            'contact' => ContactSubmission::where('status', 'new')->count(),
            'career' => JobApplication::where('status', 'new')->count(),
            'partnership' => PartnershipRequest::where('status', 'new')->count(),
        ]);
    }

    public function dashboardMetrics()
    {
        $startOfMonth = Carbon::now()->startOfMonth();

        return response()->json([
            'articles' => [
                'total' => Article::count(),
                'this_month' => Article::where('created_at', '>=', $startOfMonth)->count(),
            ],
            'projects' => [
                'total' => Project::count(),
                'published' => Project::where('is_published', true)->count(),
            ],
            'comments' => [
                'total' => Comment::count(),
                'pending' => Comment::where('approved', false)->count(),
            ],
            'media' => [
                'total' => Media::count(),
            ],
            'leads' => [
                'new' => [
                    'contact' => ContactSubmission::where('status', 'new')->count(),
                    'career' => JobApplication::where('status', 'new')->count(),
                    'partnership' => PartnershipRequest::where('status', 'new')->count(),
                ],
            ],
            'users' => [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
            ],
        ]);
    }
}
