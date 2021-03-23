<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'desktop_asset',
        'mobile_asset',
        'published',
        'album_id',
    ];

    /**
     * Get the photo's owner.
     */
    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
