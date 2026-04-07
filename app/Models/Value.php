<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    protected $fillable = ['title', 'description', 'icon', 'is_active', 'order'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
