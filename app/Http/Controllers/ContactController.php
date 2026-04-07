<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'project_type' => 'nullable|string|max:255',
            'project_location' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactSubmission::create($validated);

        Log::info('Contact form submitted', ['email' => $validated['email']]);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.',
        ]);
    }
}
