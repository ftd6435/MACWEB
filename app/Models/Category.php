<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'type', 'description', 'image'];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
