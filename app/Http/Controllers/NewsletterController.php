<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        NewsletterSubscriber::updateOrCreate(
            ['email' => $validated['email']],
            ['name' => $validated['name'] ?? null, 'is_active' => true, 'unsubscribed_at' => null]
        );

        return response()->json([
            'success' => true,
            'message' => 'Vous êtes maintenant inscrit à notre newsletter.',
        ]);
    }
}
