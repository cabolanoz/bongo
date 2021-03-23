<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commercial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'desktop_picture',
        'mobile_picture',
        'picture_url',
        'start_date',
        'end_date',
    ];

    /**
     * Scope a query to only include available commercials.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        $currentTime = \Carbon\Carbon::now();

        return $query->whereDate('start_date', '<=', $currentTime)
                     ->where(function($query1) use ($currentTime) {
                         $query1->whereDate('end_date', '>=', $currentTime)
                                ->orWhereNull('end_date');
                     })
                     ->get();
    }
}
