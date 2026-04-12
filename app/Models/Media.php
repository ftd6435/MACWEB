<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'name',
        'filename',
        'mime_type',
        'size',
        'path',
        'thumbnail_path',
        'width',
        'height',
        'disk',
        'user_id',
    ];

    protected $appends = ['url', 'thumbnail_url'];

    public function getUrlAttribute(): string
    {
        return asset('storage/'.$this->path);
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail_path ? asset('storage/'.$this->thumbnail_path) : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
