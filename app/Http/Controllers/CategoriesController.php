<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriesController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount('articles', 'projects')
            ->orderBy('name')
            ->when($request->query('type'), function ($q, $type) {
                $types = collect(explode(',', (string) $type))
                    ->map(fn($v) => trim($v))
                    ->filter()
                    ->values()
                    ->all();

                $types = array_values(
                    array_intersect($types, ['general', 'article', 'project']),
                );

                if (count($types) === 1) {
                    $q->where('type', $types[0]);
                } elseif (count($types) > 1) {
                    $q->whereIn('type', $types);
                }
            });

        $categories = $query->get();

        return response()->json($categories);
    }

    public function show(Category $category)
    {
        $category->loadCount('articles', 'projects');

        return response()->json($category);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:categories',
            'slug' => 'nullable|string',
            'description' => 'nullable|string',
            'type' => 'nullable|string|in:general,article,project',
            'image' => 'nullable|string',
        ]);

        $baseSlug = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['slug'] = $this->makeUniqueSlug($baseSlug);
        $validated['type'] = $validated['type'] ?? 'general';

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'string|unique:categories,name,' . $category->id,
            'slug' => 'nullable|string',
            'description' => 'nullable|string',
            'type' => 'nullable|string|in:general,article,project',
            'image' => 'nullable|string',
        ]);

        if (array_key_exists('name', $validated) || array_key_exists('slug', $validated)) {
            $baseSlug = $validated['slug'] ?? Str::slug($validated['name'] ?? $category->name);
            $validated['slug'] = $this->makeUniqueSlug($baseSlug, $category->id);
        }

        $category->update($validated);

        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }

    private function makeUniqueSlug(string $baseSlug, ?int $ignoreId = null): string
    {
        $slug = $baseSlug !== '' ? $baseSlug : Str::random(8);
        $counter = 2;

        while (
            Category::query()
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
