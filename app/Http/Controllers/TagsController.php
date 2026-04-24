<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagsController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount('articles')
            ->orderBy('name')
            ->get();

        return response()->json($tags);
    }

    public function show(Tag $tag)
    {
        $tag->loadCount('articles');
        $articles = $tag->articles()
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return response()->json([
            'tag' => $tag,
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:tags',
            'slug' => 'nullable|string',
        ]);

        $baseSlug = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['slug'] = $this->makeUniqueSlug($baseSlug);

        $tag = Tag::create($validated);

        return response()->json($tag, 201);
    }

    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'string|unique:tags,name,' . $tag->id,
            'slug' => 'nullable|string',
        ]);

        if (array_key_exists('name', $validated) || array_key_exists('slug', $validated)) {
            $baseSlug = $validated['slug'] ?? Str::slug($validated['name'] ?? $tag->name);
            $validated['slug'] = $this->makeUniqueSlug($baseSlug, $tag->id);
        }

        $tag->update($validated);

        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return response()->json(null, 204);
    }

    private function makeUniqueSlug(string $baseSlug, ?int $ignoreId = null): string
    {
        $slug = $baseSlug !== '' ? $baseSlug : Str::random(8);
        $counter = 2;

        while (
            Tag::query()
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
