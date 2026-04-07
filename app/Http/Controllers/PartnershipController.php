<?php

namespace App\Http\Controllers;

use App\Models\PartnershipRequest;
use Illuminate\Http\Request;

class PartnershipController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'partnership_type' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        PartnershipRequest::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Votre proposition de partenariat a été envoyée avec succès.',
        ], 201);
    }
}
