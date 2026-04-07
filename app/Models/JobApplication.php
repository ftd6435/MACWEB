<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    protected $fillable = [
        'job_listing_id', 'name', 'email', 'phone',
        'position', 'resume_path', 'cover_letter',
        'status', 'admin_notes',
    ];

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class);
    }
}
