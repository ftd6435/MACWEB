<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\Api\CmsController;
use App\Http\Controllers\Api\CmsAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

// Auth routes
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// CMS Data routes
Route::get('/cms/global', [CmsController::class, 'getGlobalData']);
Route::get('/cms/home', [CmsController::class, 'getHomeData']);
Route::get('/cms/about', [CmsController::class, 'getAboutData']);

// Public routes
Route::post('/contact', [ContactController::class, 'submit']);

// Articles routes
Route::get('/articles', [ArticlesController::class, 'index']);
Route::get('/articles/{slug}', [ArticlesController::class, 'show']);

// Projects routes
Route::get('/projects', [ProjectsController::class, 'index']);
Route::get('/projects/{id}', [ProjectsController::class, 'show']);

// Categories routes
Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{category}', [CategoriesController::class, 'show']);

// Tags routes
Route::get('/tags', [TagsController::class, 'index']);
Route::get('/tags/{tag}', [TagsController::class, 'show']);

// Comments routes
Route::get('/comments', [CommentsController::class, 'index']);
Route::post('/comments', [CommentsController::class, 'store']);

// Media routes
Route::get('/media', [MediaController::class, 'index']);

// Protected routes (authenticated users)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Admin routes - Core
    Route::post('/articles', [ArticlesController::class, 'store']);
    Route::put('/articles/{article}', [ArticlesController::class, 'update']);
    Route::delete('/articles/{article}', [ArticlesController::class, 'destroy']);

    Route::post('/projects', [ProjectsController::class, 'store']);
    Route::put('/projects/{project}', [ProjectsController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectsController::class, 'destroy']);

    // Admin routes - CMS
    Route::get('/admin/services', [CmsAdminController::class, 'services']);
    Route::post('/admin/services', [CmsAdminController::class, 'storeService']);
    Route::put('/admin/services/{service}', [CmsAdminController::class, 'updateService']);
    Route::delete('/admin/services/{service}', [CmsAdminController::class, 'destroyService']);

    Route::get('/admin/team', [CmsAdminController::class, 'team']);
    Route::post('/admin/team', [CmsAdminController::class, 'storeTeamMember']);
    Route::put('/admin/team/{member}', [CmsAdminController::class, 'updateTeamMember']);
    Route::delete('/admin/team/{member}', [CmsAdminController::class, 'destroyTeamMember']);

    Route::get('/admin/testimonials', [CmsAdminController::class, 'testimonials']);
    Route::post('/admin/testimonials', [CmsAdminController::class, 'storeTestimonial']);
    Route::put('/admin/testimonials/{testimonial}', [CmsAdminController::class, 'updateTestimonial']);
    Route::delete('/admin/testimonials/{testimonial}', [CmsAdminController::class, 'destroyTestimonial']);

    Route::get('/admin/timeline', [CmsAdminController::class, 'timeline']);
    Route::post('/admin/timeline', [CmsAdminController::class, 'storeMilestone']);
    Route::put('/admin/timeline/{milestone}', [CmsAdminController::class, 'updateMilestone']);
    Route::delete('/admin/timeline/{milestone}', [CmsAdminController::class, 'destroyMilestone']);

    Route::get('/admin/stats', [CmsAdminController::class, 'stats']);
    Route::post('/admin/stats', [CmsAdminController::class, 'storeStat']);
    Route::put('/admin/stats/{stat}', [CmsAdminController::class, 'updateStat']);
    Route::delete('/admin/stats/{stat}', [CmsAdminController::class, 'destroyStat']);

    Route::get('/admin/settings', [CmsAdminController::class, 'settings']);
    Route::put('/admin/settings', [CmsAdminController::class, 'updateSettings']);

    Route::post('/categories', [CategoriesController::class, 'store']);
    Route::put('/categories/{category}', [CategoriesController::class, 'update']);
    Route::delete('/categories/{category}', [CategoriesController::class, 'destroy']);

    Route::post('/tags', [TagsController::class, 'store']);
    Route::put('/tags/{tag}', [TagsController::class, 'update']);
    Route::delete('/tags/{tag}', [TagsController::class, 'destroy']);

    Route::put('/comments/{comment}/approve', [CommentsController::class, 'approve']);
    Route::delete('/comments/{comment}', [CommentsController::class, 'destroy']);

    Route::post('/media', [MediaController::class, 'store']);
    Route::delete('/media/{media}', [MediaController::class, 'destroy']);
});
