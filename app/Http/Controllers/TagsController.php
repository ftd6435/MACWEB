<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

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
            'slug' => 'required|string|unique:tags',
        ]);

        $tag = Tag::create($validated);

        return response()->json($tag, 201);
    }

    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'string|unique:tags,name,'.$tag->id,
        ]);

        $tag->update($validated);

        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return response()->json(null, 204);
    }
}
