<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = [
        'name', 'city', 'country', 'address', 'phone', 'email',
        'image', 'is_headquarters', 'map_lat', 'map_lng', 'is_active', 'order',
    ];

    protected $casts = [
        'is_headquarters' => 'boolean',
        'is_active' => 'boolean',
        'map_lat' => 'decimal:7',
        'map_lng' => 'decimal:7',
    ];
}
