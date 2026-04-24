<?php

namespace App\Http\Controllers;

use App\Mail\JobApplicationReceivedApplicant;
use App\Mail\JobApplicationSubmitted;
use App\Models\JobApplication;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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
        ], [
            'job_listing_id.exists' => "L'offre sélectionnée est invalide.",
            'name.required' => 'Le nom est obligatoire.',
            'name.max' => 'Le nom ne doit pas dépasser :max caractères.',
            'email.required' => "L'email est obligatoire.",
            'email.email' => "L'email doit être une adresse valide.",
            'email.max' => "L'email ne doit pas dépasser :max caractères.",
            'phone.max' => 'Le téléphone ne doit pas dépasser :max caractères.',
            'position.max' => 'Le poste ne doit pas dépasser :max caractères.',
            'resume.file' => 'Le CV doit être un fichier.',
            'resume.mimes' => 'Le CV doit être un fichier PDF, DOC ou DOCX.',
            'resume.max' => 'Le CV ne doit pas dépasser 5 Mo.',
            'cover_letter.max' =>
            'La lettre de motivation ne doit pas dépasser :max caractères.',
        ]);

        $resumePath = null;
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
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

        $hrEmail = SiteSetting::where('key', 'hr_email')->value('value')
            ?: SiteSetting::where('key', 'main_email')->value('value');
        $companyName = SiteSetting::where('key', 'company_name')->value('value')
            ?: config('app.name', 'MAC');

        $appUrl = rtrim((string) config('app.url', ''), '/');
        $adminUrl = $appUrl ? $appUrl . '/admin/leads' : null;
        $logoPath = SiteSetting::where('key', 'header_logo')->value('value') ?: '/img/logo.png';
        $logoUrl = null;
        if ($appUrl) {
            if (is_string($logoPath) && preg_match('/^https?:\/\//i', $logoPath)) {
                $logoUrl = $logoPath;
            } elseif (is_string($logoPath)) {
                $logoUrl = str_starts_with($logoPath, '/')
                    ? $appUrl.$logoPath
                    : $appUrl.'/'.$logoPath;
            }
        }

        if ($hrEmail) {
            Mail::to($hrEmail)->queue(
                new JobApplicationSubmitted($application, $adminUrl, $logoUrl, $companyName)
            );
        }

        Mail::to($application->email)->queue(
            (new JobApplicationReceivedApplicant(
                $application,
                $companyName,
                $hrEmail,
                $logoUrl
            ))->delay(now()->addSeconds(8))
        );

        return response()->json([
            'success' => true,
            'message' => 'Votre candidature a été envoyée avec succès.',
        ], 201);
    }
}
