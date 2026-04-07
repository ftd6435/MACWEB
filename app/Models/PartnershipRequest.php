<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnershipRequest extends Model
{
    protected $fillable = [
        'company_name', 'contact_person', 'email', 'phone',
        'partnership_type', 'message', 'status', 'admin_notes',
    ];
}
