<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'image',
        'description',
        'details',
        'location',
        'year',
        'client_name',
        'metrics',
        'challenges',
        'technical_details',
        'gallery',
        'is_featured',
        'category_id',
        'service_id',
        'is_published',
        'views',
    ];

    protected $casts = [
        'metrics' => 'array',
        'challenges' => 'array',
        'technical_details' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
