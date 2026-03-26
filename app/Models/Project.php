<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    protected $fillable = [ 
        'title', 
        'slug', 
        'description', 
        'details', 
        'location', 
        'year', 
        'metrics', 
        'challenges', 
        'technical_details', 
        'gallery', 
        'is_featured', 
        'category_id'
    ];

    protected $casts = [
        'metrics' => 'array',
        'challenges' => 'array',
        'technical_details' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
