<?php

namespace App\Http\Controllers;

use App\Mail\BrandedOutboundMessage;
use App\Models\ContactSubmission;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone' => 'nullable|string|max:20',
                'project_type' => 'nullable|string|max:255',
                'project_location' => 'nullable|string|max:255',
                'message' => 'required|string|max:5000',
            ],
            [
                'name.required' => 'Le nom est obligatoire.',
                'name.max' => 'Le nom ne doit pas dépasser 255 caractères.',
                'email.required' => "L'email est obligatoire.",
                'email.email' => "Veuillez saisir un email valide.",
                'phone.max' => 'Le numéro de téléphone ne doit pas dépasser 20 caractères.',
                'project_type.max' => 'Le type de projet ne doit pas dépasser 255 caractères.',
                'project_location.max' => 'La localisation ne doit pas dépasser 255 caractères.',
                'message.required' => 'Le message est obligatoire.',
                'message.max' => 'Le message ne doit pas dépasser 5000 caractères.',
            ],
        );

        $contact = ContactSubmission::create($validated);

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
                    ? $appUrl . $logoPath
                    : $appUrl . '/' . $logoPath;
            }
        }

        if ($hrEmail) {
            $subjectParts = array_filter([
                'Nouvelle demande de contact',
                $contact->project_type ?: null,
                $contact->project_location ?: null,
            ]);
            $subject = implode(' — ', $subjectParts);

            $body = implode("\n", array_filter([
                "Une nouvelle demande de contact a été soumise via le site.",
                "",
                "Nom : " . $contact->name,
                "Email : " . $contact->email,
                "Téléphone : " . ($contact->phone ?: 'Non précisé'),
                "Type de projet : " . ($contact->project_type ?: 'Non précisé'),
                "Localisation : " . ($contact->project_location ?: 'Non précisé'),
                "",
                "Message :",
                (string) $contact->message,
                "",
                $adminUrl ? ("Voir dans l’espace admin : " . $adminUrl) : null,
            ]));

            Mail::to($hrEmail)->queue(new BrandedOutboundMessage(
                subjectLine: $subject,
                bodyText: $body,
                companyName: $companyName,
                logoUrl: $logoUrl,
                heading: 'Nouvelle demande de contact',
                replyToEmail: (string) $contact->email,
                replyToName: (string) $contact->name,
            ));
        }

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.',
        ]);
    }
}
