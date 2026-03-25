<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function index()
    {
        $articles = Article::with('category', 'tags')
            ->where('published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return response()->json($articles);
    }

    public function show($slug)
    {
        $article = Article::with('category', 'tags', 'comments')
            ->where('slug', $slug)
            ->where('published', true)
            ->firstOrFail();

        $article->increment('views');

        return response()->json($article);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:articles',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'author' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'published' => 'boolean',
        ]);

        $article = Article::create($validated);

        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return response()->json($article, 201);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'excerpt' => 'string',
            'content' => 'string',
            'author' => 'string',
            'category_id' => 'nullable|exists:categories,id',
            'published' => 'boolean',
        ]);

        $article->update($validated);

        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return response()->json($article);
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return response()->json(null, 204);
    }
}
