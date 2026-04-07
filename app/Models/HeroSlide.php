<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'page', 'title', 'subtitle', 'description',
        'cta_text', 'cta_link', 'cta_secondary_text', 'cta_secondary_link',
        'image', 'overlay_opacity', 'is_active', 'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeForPage($query, string $page)
    {
        return $query->where('page', $page)->where('is_active', true)->orderBy('order');
    }
}
