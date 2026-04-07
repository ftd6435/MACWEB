<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = ['name', 'code', 'description', 'type', 'image', 'is_active', 'order'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
