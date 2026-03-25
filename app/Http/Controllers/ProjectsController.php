<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('category', 'comments');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $projects = $query->orderBy('created_at', 'desc')->paginate(12);

        return response()->json($projects);
    }

    public function show($id)
    {
        $project = Project::with('category', 'comments')->findOrFail($id);
        $project->increment('views');

        return response()->json($project);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects',
            'description' => 'required|string',
            'details' => 'nullable|string',
            'location' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'nullable|integer',
            'duration' => 'nullable|string',
            'budget' => 'nullable|string',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'details' => 'nullable|string',
            'location' => 'string',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'nullable|integer',
            'duration' => 'nullable|string',
            'budget' => 'nullable|string',
        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(null, 204);
    }
}
