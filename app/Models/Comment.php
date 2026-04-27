<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'name',
        'email',
        'content',
        'approved',
        'commentable_type',
        'commentable_id',
    ];

    protected $casts = [
        'approved' => 'boolean',
    ];

    public function commentable()
    {
        return $this->morphTo();
    }
}
