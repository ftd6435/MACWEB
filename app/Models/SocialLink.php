<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    protected $fillable = ['platform', 'url', 'icon', 'is_active', 'order'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
