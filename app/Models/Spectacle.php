<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spectacle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'author',
        'desktop_asset',
        'mobile_asset',
        'start_date',
        'end_date',
        'type',
        'category_id',
        'prominent',
        'published',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::created(function ($spectacle) {
            $flag = $spectacle->type == 'promenade' ? 'j' : 't';

            $spectacle->slug = \Str::slug($spectacle->title, '-') . '-' . $flag . $spectacle->id;
            $spectacle->saveQuietly();
        });
    }

    /**
     * Scope a query to only include published spectacles.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('published', 1)->get();
    }

    /**
     * Scope a query to only include prominent spectacles.
     *
     * @param  \Illuminate\Databse\Eloquent\Builder  $query
     * @return \Illiminate\Database\Eloquent\Builder
     */
    public function scopeProminent($query)
    {
        return $query->where('prominent', 1)->published();
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
     * Get the category associated with the spectacle.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
