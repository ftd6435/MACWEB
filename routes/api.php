<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TagsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

    // Admin routes
    Route::post('/articles', [ArticlesController::class, 'store']);
    Route::put('/articles/{article}', [ArticlesController::class, 'update']);
    Route::delete('/articles/{article}', [ArticlesController::class, 'destroy']);

    Route::post('/projects', [ProjectsController::class, 'store']);
    Route::put('/projects/{project}', [ProjectsController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectsController::class, 'destroy']);

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
