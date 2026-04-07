<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'project_type',
        'project_location', 'message',
        'status', 'admin_notes', 'replied_at',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
    ];
}
