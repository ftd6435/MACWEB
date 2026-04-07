<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function index()
    {
        $articles = Article::with('category', 'tags', 'author')
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return response()->json($articles);
    }

    public function show($slug)
    {
        $article = Article::with('category', 'tags', 'comments', 'author')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $article->increment('views');

        return response()->json($article);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'author_id' => 'required|exists:users,id',
            'category_id' => 'nullable|exists:categories,id',
            'read_time' => 'nullable|integer',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'toc' => 'nullable|array',
            'published_at' => 'nullable|date',
        ]);

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
            'slug' => 'string|unique:articles,slug,'.$article->id,
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
}
