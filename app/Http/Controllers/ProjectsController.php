<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectsController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()->with(['category', 'service']);

        if (!Auth::check()) {
            $query->published();
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

        if ($request->has('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        $projects = $query->orderBy('created_at', 'desc')->paginate(12);

        return response()->json($projects);
    }

    public function show($slug)
    {
        $query = Project::with(['category', 'service', 'comments'])->where('slug', $slug);
        if (!Auth::check()) {
            $query->where('is_published', true);
        }
        $project = $query->firstOrFail();

        if (!Auth::check()) {
            $project->increment('views');
        }

        $related = Project::published()
            ->where('id', '!=', $project->id)
            ->where('category_id', $project->category_id)
            ->take(3)
            ->get();

        return response()->json([
            'project' => $project,
            'related' => $related,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string',
            'image' => 'nullable|string',
            'description' => 'required|string',
            'details' => 'nullable|string',
            'location' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'service_id' => 'required|exists:services,id',
            'year' => 'nullable|string',
            'client_name' => 'nullable|string',
            'metrics' => 'nullable|array',
            'challenges' => 'nullable|array',
            'technical_details' => 'nullable|array',
            'gallery' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $baseSlug = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['slug'] = $this->makeUniqueSlug($baseSlug);

        $project = Project::create($validated);

        return response()->json($project->load(['category', 'service']), 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'nullable|string',
            'image' => 'nullable|string',
            'description' => 'string',
            'details' => 'nullable|string',
            'location' => 'string',
            'category_id' => 'nullable|exists:categories,id',
            'service_id' => 'sometimes|required|exists:services,id',
            'year' => 'nullable|string',
            'client_name' => 'nullable|string',
            'metrics' => 'nullable|array',
            'challenges' => 'nullable|array',
            'technical_details' => 'nullable|array',
            'gallery' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        if (array_key_exists('title', $validated) || array_key_exists('slug', $validated)) {
            $baseSlug = $validated['slug'] ?? Str::slug($validated['title'] ?? $project->title);
            $validated['slug'] = $this->makeUniqueSlug($baseSlug, $project->id);
        }

        $project->update($validated);

        return response()->json($project->load(['category', 'service']));
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(null, 204);
    }

    private function makeUniqueSlug(string $baseSlug, ?int $ignoreId = null): string
    {
        $slug = $baseSlug !== '' ? $baseSlug : Str::random(8);
        $counter = 2;

        while (
            Project::query()
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->where('slug', $slug)
            ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
