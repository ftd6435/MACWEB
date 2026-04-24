<?php

use App\Http\Controllers\Api\AdminUsersController;
use App\Http\Controllers\Api\CmsAdminController;
use App\Http\Controllers\Api\CmsController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JobApplicationsController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TagsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// ─── CMS Page Data routes (public) ──────────────────────────
Route::get('/cms/global', [CmsController::class, 'getGlobalData']);
Route::get('/cms/home', [CmsController::class, 'getHomeData']);
Route::get('/cms/services', [CmsController::class, 'getServicesData']);
Route::get('/cms/projects', [CmsController::class, 'getProjectsData']);
Route::get('/cms/blog', [CmsController::class, 'getBlogData']);
Route::get('/cms/about', [CmsController::class, 'getAboutData']);
Route::get('/cms/contact', [CmsController::class, 'getContactData']);
Route::get('/cms/careers', [CmsController::class, 'getCareersData']);
Route::get('/cms/partnership', [CmsController::class, 'getPartnershipData']);

// ─── Public form submissions ─────────────────────────────────
Route::post('/contact', [ContactController::class, 'submit']);
Route::post('/newsletter', [NewsletterController::class, 'subscribe']);
Route::post('/job-applications', [JobApplicationsController::class, 'store']);
Route::post('/partnership', [PartnershipController::class, 'store']);

// ─── Public content routes ───────────────────────────────────
Route::get('/articles', [ArticlesController::class, 'index']);
Route::get('/articles/{slug}', [ArticlesController::class, 'show']);

Route::get('/projects', [ProjectsController::class, 'index']);
Route::get('/projects/{slug}', [ProjectsController::class, 'show']);

Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{category}', [CategoriesController::class, 'show']);

Route::get('/tags', [TagsController::class, 'index']);
Route::get('/tags/{tag}', [TagsController::class, 'show']);

Route::get('/comments', [CommentsController::class, 'index']);
Route::post('/comments', [CommentsController::class, 'store']);

Route::get('/media', [MediaController::class, 'index']);

// ─── Protected routes (admin) ────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        if ($user && $user->is_active === false) {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Compte désactivé.'], 403);
        }

        return $user;
    });

    // Articles CRUD
    Route::post('/articles', [ArticlesController::class, 'store']);
    Route::put('/articles/{article}', [ArticlesController::class, 'update']);
    Route::delete('/articles/{article}', [ArticlesController::class, 'destroy']);

    // Projects CRUD
    Route::post('/projects', [ProjectsController::class, 'store']);
    Route::put('/projects/{project}', [ProjectsController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectsController::class, 'destroy']);

    // Categories CRUD
    Route::post('/categories', [CategoriesController::class, 'store']);
    Route::put('/categories/{category}', [CategoriesController::class, 'update']);
    Route::delete('/categories/{category}', [CategoriesController::class, 'destroy']);

    // Tags CRUD
    Route::post('/tags', [TagsController::class, 'store']);
    Route::put('/tags/{tag}', [TagsController::class, 'update']);
    Route::delete('/tags/{tag}', [TagsController::class, 'destroy']);

    // Comments moderation
    Route::put('/comments/{comment}/approve', [CommentsController::class, 'approve']);
    Route::delete('/comments/{comment}', [CommentsController::class, 'destroy']);

    // Media CRUD
    Route::post('/media', [MediaController::class, 'store']);
    Route::delete('/media/{media}', [MediaController::class, 'destroy']);

    // ─── CMS Admin: Content Management ───────────────────────

    // Hero Slides
    Route::get('/admin/hero-slides', [CmsAdminController::class, 'heroSlides']);
    Route::post('/admin/hero-slides', [CmsAdminController::class, 'storeHeroSlide']);
    Route::put('/admin/hero-slides/{heroSlide}', [CmsAdminController::class, 'updateHeroSlide']);
    Route::delete('/admin/hero-slides/{heroSlide}', [CmsAdminController::class, 'destroyHeroSlide']);

    // Page Sections
    Route::get('/admin/page-sections', [CmsAdminController::class, 'pageSections']);
    Route::post('/admin/page-sections', [CmsAdminController::class, 'storePageSection']);
    Route::put('/admin/page-sections/{pageSection}', [CmsAdminController::class, 'updatePageSection']);
    Route::delete('/admin/page-sections/{pageSection}', [CmsAdminController::class, 'destroyPageSection']);

    // Services
    Route::get('/admin/services', [CmsAdminController::class, 'services']);
    Route::post('/admin/services', [CmsAdminController::class, 'storeService']);
    Route::put('/admin/services/{service}', [CmsAdminController::class, 'updateService']);
    Route::delete('/admin/services/{service}', [CmsAdminController::class, 'destroyService']);

    // Team
    Route::get('/admin/team', [CmsAdminController::class, 'team']);
    Route::post('/admin/team', [CmsAdminController::class, 'storeTeamMember']);
    Route::put('/admin/team/{member}', [CmsAdminController::class, 'updateTeamMember']);
    Route::delete('/admin/team/{member}', [CmsAdminController::class, 'destroyTeamMember']);

    // Testimonials
    Route::get('/admin/testimonials', [CmsAdminController::class, 'testimonials']);
    Route::post('/admin/testimonials', [CmsAdminController::class, 'storeTestimonial']);
    Route::put('/admin/testimonials/{testimonial}', [CmsAdminController::class, 'updateTestimonial']);
    Route::delete('/admin/testimonials/{testimonial}', [CmsAdminController::class, 'destroyTestimonial']);

    // Timeline
    Route::get('/admin/timeline', [CmsAdminController::class, 'timeline']);
    Route::post('/admin/timeline', [CmsAdminController::class, 'storeMilestone']);
    Route::put('/admin/timeline/{milestone}', [CmsAdminController::class, 'updateMilestone']);
    Route::delete('/admin/timeline/{milestone}', [CmsAdminController::class, 'destroyMilestone']);

    // Stats
    Route::get('/admin/stats', [CmsAdminController::class, 'stats']);
    Route::post('/admin/stats', [CmsAdminController::class, 'storeStat']);
    Route::put('/admin/stats/{stat}', [CmsAdminController::class, 'updateStat']);
    Route::delete('/admin/stats/{stat}', [CmsAdminController::class, 'destroyStat']);

    // Offices
    Route::get('/admin/offices', [CmsAdminController::class, 'offices']);
    Route::post('/admin/offices', [CmsAdminController::class, 'storeOffice']);
    Route::put('/admin/offices/{office}', [CmsAdminController::class, 'updateOffice']);
    Route::delete('/admin/offices/{office}', [CmsAdminController::class, 'destroyOffice']);

    // Social Links
    Route::get('/admin/social-links', [CmsAdminController::class, 'socialLinks']);
    Route::post('/admin/social-links', [CmsAdminController::class, 'storeSocialLink']);
    Route::put('/admin/social-links/{socialLink}', [CmsAdminController::class, 'updateSocialLink']);
    Route::delete('/admin/social-links/{socialLink}', [CmsAdminController::class, 'destroySocialLink']);

    // Values
    Route::get('/admin/values', [CmsAdminController::class, 'values']);
    Route::post('/admin/values', [CmsAdminController::class, 'storeValue']);
    Route::put('/admin/values/{value}', [CmsAdminController::class, 'updateValue']);
    Route::delete('/admin/values/{value}', [CmsAdminController::class, 'destroyValue']);

    // Certifications
    Route::get('/admin/certifications', [CmsAdminController::class, 'certifications']);
    Route::post('/admin/certifications', [CmsAdminController::class, 'storeCertification']);
    Route::put('/admin/certifications/{certification}', [CmsAdminController::class, 'updateCertification']);
    Route::delete('/admin/certifications/{certification}', [CmsAdminController::class, 'destroyCertification']);

    // Job Listings
    Route::get('/admin/job-listings', [CmsAdminController::class, 'jobListings']);
    Route::post('/admin/job-listings', [CmsAdminController::class, 'storeJobListing']);
    Route::put('/admin/job-listings/{jobListing}', [CmsAdminController::class, 'updateJobListing']);
    Route::delete('/admin/job-listings/{jobListing}', [CmsAdminController::class, 'destroyJobListing']);

    // Settings
    Route::get('/admin/settings', [CmsAdminController::class, 'settings']);
    Route::put('/admin/settings', [CmsAdminController::class, 'updateSettings']);
    Route::get('/admin/leads/unread-counts', [CmsAdminController::class, 'leadsUnreadCounts']);
    Route::get('/admin/dashboard-metrics', [CmsAdminController::class, 'dashboardMetrics']);

    // Profile
    Route::get('/admin/profile', [ProfileController::class, 'show']);
    Route::put('/admin/profile', [ProfileController::class, 'update']);
    Route::put('/admin/profile/password', [ProfileController::class, 'updatePassword']);

    // Users (Admin)
    Route::get('/admin/users', [AdminUsersController::class, 'index']);
    Route::post('/admin/users', [AdminUsersController::class, 'store']);
    Route::put('/admin/users/{user}', [AdminUsersController::class, 'update']);
    Route::patch('/admin/users/{user}/toggle-active', [AdminUsersController::class, 'toggleActive']);

    // ─── CMS Admin: Visitor Submissions (read/manage) ────────

    // Contact Submissions
    Route::get('/admin/contacts', [CmsAdminController::class, 'contactSubmissions']);
    Route::put('/admin/contacts/{contactSubmission}', [CmsAdminController::class, 'updateContactSubmission']);
    Route::delete('/admin/contacts/{contactSubmission}', [CmsAdminController::class, 'destroyContactSubmission']);

    // Job Applications
    Route::get('/admin/job-applications', [CmsAdminController::class, 'jobApplications']);
    Route::get('/admin/job-applications/{jobApplication}/resume', [CmsAdminController::class, 'downloadJobApplicationResume']);
    Route::put('/admin/job-applications/{jobApplication}', [CmsAdminController::class, 'updateJobApplication']);
    Route::delete('/admin/job-applications/{jobApplication}', [CmsAdminController::class, 'destroyJobApplication']);
    Route::post('/admin/leads/send-email', [CmsAdminController::class, 'sendLeadEmail']);
    Route::post('/admin/job-listings/{jobListing}/send-rejection-emails', [CmsAdminController::class, 'sendJobListingRejectionEmails']);

    // Newsletter Subscribers
    Route::get('/admin/newsletter', [CmsAdminController::class, 'newsletterSubscribers']);
    Route::delete('/admin/newsletter/{subscriber}', [CmsAdminController::class, 'destroyNewsletterSubscriber']);

    // Partnership Requests
    Route::get('/admin/partnerships', [CmsAdminController::class, 'partnershipRequests']);
    Route::put('/admin/partnerships/{partnershipRequest}', [CmsAdminController::class, 'updatePartnershipRequest']);
    Route::delete('/admin/partnerships/{partnershipRequest}', [CmsAdminController::class, 'destroyPartnershipRequest']);
});
