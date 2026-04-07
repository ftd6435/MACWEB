<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::published()->with('category');

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
        $project = Project::with('category', 'comments')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $project->increment('views');

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
            'slug' => 'required|string|unique:projects',
            'image' => 'nullable|string',
            'description' => 'required|string',
            'details' => 'nullable|string',
            'location' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'nullable|string',
            'client_name' => 'nullable|string',
            'metrics' => 'nullable|array',
            'challenges' => 'nullable|array',
            'technical_details' => 'nullable|array',
            'gallery' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $project = Project::create($validated);

        return response()->json($project->load('category'), 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'string|unique:projects,slug,'.$project->id,
            'image' => 'nullable|string',
            'description' => 'string',
            'details' => 'nullable|string',
            'location' => 'string',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'nullable|string',
            'client_name' => 'nullable|string',
            'metrics' => 'nullable|array',
            'challenges' => 'nullable|array',
            'technical_details' => 'nullable|array',
            'gallery' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        $project->update($validated);

        return response()->json($project->load('category'));
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(null, 204);
    }
}
