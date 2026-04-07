<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    protected $fillable = [
        'page', 'section_key', 'title', 'subtitle', 'content',
        'image', 'extra', 'is_active', 'order',
    ];

    protected $casts = [
        'extra' => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeForPage($query, string $page)
    {
        return $query->where('page', $page)->where('is_active', true)->orderBy('order');
    }

    public static function getSection(string $page, string $key)
    {
        return static::where('page', $page)->where('section_key', $key)->first();
    }
}
