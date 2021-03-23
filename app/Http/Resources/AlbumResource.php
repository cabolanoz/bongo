<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'spectacle_thumbnail' => $this->spectacle_thumbnail,
            'spectacle_date' => $this->spectacle_date,
            'published' => $this->published,
            'photos_quantity' => $this->photos_quantity(),
        ];
    }
}
