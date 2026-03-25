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
        'disk',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
