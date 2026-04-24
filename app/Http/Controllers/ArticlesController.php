<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ArticlesController extends Controller
{
    public function index()
    {
        $query = Article::with('category', 'tags', 'author');

        if (!Auth::check()) {
            $query->where('is_published', true)->orderBy('published_at', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $articles = $query->paginate(12);

        return response()->json($articles);
    }

    public function show($slug)
    {
        $query = Article::with('category', 'tags', 'comments', 'author')->where('slug', $slug);

        if (!Auth::check()) {
            $query->where('is_published', true);
        }

        $article = $query->firstOrFail();

        if (!Auth::check()) {
            $article->increment('views');
        }

        return response()->json($article);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'author_id' => 'nullable|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'read_time' => 'nullable|integer',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'toc' => 'nullable|array',
            'published_at' => 'nullable|date',
        ]);

        $validated['author_id'] = $validated['author_id'] ?? Auth::id();
        $baseSlug = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['slug'] = $this->makeUniqueSlug($baseSlug);

        $article = Article::create($validated);

        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return response()->json($article->load('category', 'tags', 'author'), 201);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'content' => 'string',
            'image' => 'nullable|string',
            'author_id' => 'exists:users,id',
            'category_id' => 'nullable|exists:categories,id',
            'read_time' => 'nullable|integer',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'toc' => 'nullable|array',
            'published_at' => 'nullable|date',
        ]);

        if (array_key_exists('title', $validated) || array_key_exists('slug', $validated)) {
            $baseSlug = $validated['slug'] ?? Str::slug($validated['title'] ?? $article->title);
            $validated['slug'] = $this->makeUniqueSlug($baseSlug, $article->id);
        }

        $article->update($validated);

        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return response()->json($article->load('category', 'tags', 'author'));
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return response()->json(null, 204);
    }

    private function makeUniqueSlug(string $baseSlug, ?int $ignoreId = null): string
    {
        $slug = $baseSlug !== '' ? $baseSlug : Str::random(8);
        $counter = 2;

        while (
            Article::query()
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
