<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobApplicationsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_listing_id' => 'nullable|exists:job_listings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:255',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'cover_letter' => 'nullable|string|max:5000',
        ]);

        $resumePath = null;
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $fileName = Str::uuid().'.'.$file->getClientOriginalExtension();
            $resumePath = $file->storeAs('resumes', $fileName, 'local');
        }

        $application = JobApplication::create([
            'job_listing_id' => $validated['job_listing_id'] ?? null,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'position' => $validated['position'] ?? null,
            'resume_path' => $resumePath,
            'cover_letter' => $validated['cover_letter'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre candidature a été envoyée avec succès.',
        ], 201);
    }
}
