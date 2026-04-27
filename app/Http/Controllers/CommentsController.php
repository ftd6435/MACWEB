<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');
        $id = $request->query('id');

        $query = Comment::where('approved', true);

        if ($type && $id) {
            $query->where('commentable_type', "App\\Models\\{$type}")
                ->where('commentable_id', $id);
        }

        $comments = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'content' => 'required|string|max:1000',
            'commentable_type' => 'required|string',
            'commentable_id' => 'required|integer',
        ]);

        // Approve comments by default; admins can disapprove later if needed
        $validated['approved'] = true;

        $comment = Comment::create($validated);

        return response()->json($comment, 201);
    }

    public function approve(Comment $comment)
    {
        $comment->update(['approved' => true]);

        return response()->json($comment);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json(null, 204);
    }
}
