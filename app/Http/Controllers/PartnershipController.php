<?php

namespace App\Http\Controllers;

use App\Mail\BrandedOutboundMessage;
use App\Models\PartnershipRequest;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PartnershipController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'partnership_type' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ], [
            'company_name.required' => "Le nom de l'entreprise est obligatoire.",
            'company_name.max' => "Le nom de l'entreprise ne doit pas dépasser :max caractères.",
            'contact_person.required' => 'La personne de contact est obligatoire.',
            'contact_person.max' => 'La personne de contact ne doit pas dépasser :max caractères.',
            'email.required' => "L'email est obligatoire.",
            'email.email' => "L'email doit être une adresse valide.",
            'email.max' => "L'email ne doit pas dépasser :max caractères.",
            'phone.required' => 'Le téléphone est obligatoire.',
            'phone.max' => 'Le téléphone ne doit pas dépasser :max caractères.',
            'partnership_type.max' => 'Le type de partenariat ne doit pas dépasser :max caractères.',
            'message.required' => 'Le message est obligatoire.',
            'message.max' => 'Le message ne doit pas dépasser :max caractères.',
        ]);

        $partnership = PartnershipRequest::create($validated);

        $companyName = SiteSetting::where('key', 'company_name')->value('value')
            ?: config('app.name', 'MAC');
        $hrEmail = SiteSetting::where('key', 'hr_email')->value('value')
            ?: SiteSetting::where('key', 'main_email')->value('value');

        $appUrl = rtrim((string) config('app.url', ''), '/');
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

        $typeLabel = $partnership->partnership_type ? (string) $partnership->partnership_type : 'Non précisé';
        $adminBody = implode("\n", array_filter([
            "Vous avez reçu une nouvelle demande de partenariat via le site.",
            "",
            "Entreprise : " . $partnership->company_name,
            "Personne de contact : " . $partnership->contact_person,
            "Email : " . $partnership->email,
            "Téléphone : " . ($partnership->phone ?: 'Non précisé'),
            "Type de partenariat : " . $typeLabel,
            "",
            "Message :",
            (string) $partnership->message,
        ]));

        if ($hrEmail) {
            Mail::to($hrEmail)->queue(new BrandedOutboundMessage(
                subjectLine: "Nouvelle demande de partenariat — " . $partnership->company_name,
                bodyText: $adminBody,
                companyName: $companyName,
                logoUrl: $logoUrl,
                heading: "Nouvelle demande de partenariat",
                replyToEmail: $partnership->email,
                replyToName: $partnership->contact_person,
            ));
        }

        $contactLine = $hrEmail ? "Si vous avez des questions, vous pouvez répondre à cet email ou nous écrire à : " . $hrEmail . "." : null;
        $partnerBody = implode("\n", array_filter([
            "Bonjour " . $partnership->contact_person . ",",
            "",
            "Merci pour votre proposition de partenariat. Votre demande a bien été reçue et notre équipe vous répondra dans les meilleurs délais.",
            "",
            "Récapitulatif :",
            "Entreprise : " . $partnership->company_name,
            "Type de partenariat : " . $typeLabel,
            "",
            $contactLine,
            "",
            "Cordialement,",
            $companyName,
        ]));

        $ack = new BrandedOutboundMessage(
            subjectLine: "Accusé de réception — Partenariat",
            bodyText: $partnerBody,
            companyName: $companyName,
            logoUrl: $logoUrl,
            heading: "Merci pour votre proposition",
            replyToEmail: $hrEmail,
            replyToName: $companyName,
        );
        Mail::to($partnership->email)->queue($ack->delay(now()->addSeconds(8)));

        return response()->json([
            'success' => true,
            'message' => 'Votre proposition de partenariat a été envoyée avec succès.',
        ], 201);
    }
}
