<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'description', 'long_description',
        'icon', 'image', 'features', 'sub_services', 'process_steps',
        'is_active', 'order',
    ];

    protected $casts = [
        'features' => 'array',
        'sub_services' => 'array',
        'process_steps' => 'array',
        'is_active' => 'boolean',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
