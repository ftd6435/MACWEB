<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    protected $fillable = [
        'title', 'slug', 'department', 'location', 'contract_type',
        'description', 'requirements', 'responsibilities',
        'is_active', 'is_featured', 'published_at', 'expires_at',
    ];

    protected $casts = [
        'requirements' => 'array',
        'responsibilities' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
