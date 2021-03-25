<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'spectacle_thumbnail',
        'spectacle_date',
        'published',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function ($album) {
            $album->slug = \Str::slug($album->name, '-') . '-' . $album->id;
            $album->saveQuietly();
        });
    }

    /**
     * Scope a query to only include published albums.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('published', 1)->get();
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get all of the photos for the album.
     */
    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    /**
     * Get photos quantity for the album.
     */
    public function photos_quantity()
    {
        return $this->photos()->count();
    }
}
